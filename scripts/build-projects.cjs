const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
const ROOT = path.resolve(__dirname, '..');

function compile(source) {
  const doc = yaml.load(source, { schema: yaml.JSON_SCHEMA });
  const fail = message => { throw new Error(message); };
  const bi = (value, field) => {
    if (!value || typeof value.en !== 'string' || !value.en.trim() || typeof value.zh !== 'string' || !value.zh.trim()) fail(`${field}: both en and zh are required`);
    return [value.en, value.zh];
  };
  if (!doc || !Array.isArray(doc.projects) || !Array.isArray(doc.selected)) fail('projects and selected must be lists');
  const ids = new Set();
  const projects = doc.projects.map(p => {
    if (!p || typeof p.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id) || ids.has(p.id)) fail(`Invalid or duplicate project ID: ${p?.id}`);
    ids.add(p.id);
    if (typeof p.published !== 'boolean') fail(`${p.id}: published must be true or false`);
    if (!['ny','au','us','cn','remote'].includes(p.region)) fail(`${p.id}: invalid region`);
    if (!['personal','academic','team','industrial'].includes(p.type)) fail(`${p.id}: invalid type`);
    if (typeof p.tech !== 'string' || !p.tech.trim()) fail(`${p.id}: tech is required`);
    if (!Array.isArray(p.work)) fail(`${p.id}: work must be a list`);
    const result = {id:p.id, name:bi(p.name,`${p.id}.name`), date:bi(p.date,`${p.id}.date`), region:p.region, type:p.type, tech:p.tech, summary:bi(p.summary,`${p.id}.summary`), background:bi(p.background,`${p.id}.background`), work:p.work.map((w,i)=>bi(w,`${p.id}.work[${i}]`))};
    if(p.teamCredit!==undefined)result.teamCredit=bi(p.teamCredit,`${p.id}.teamCredit`);
    if(p.workHeading!==undefined)result.workHeading=bi(p.workHeading,`${p.id}.workHeading`);
    if(p.logo !== undefined){
      const field=`${p.id}.logo`;const value=p.logo;
      if(!value||typeof value!=='object'||Array.isArray(value))fail(`${field}: must be an object`);
      if(typeof value.src!=='string'||!new RegExp(`^assets/projects/${p.id}/[a-z0-9-]+\\.webp$`).test(value.src))fail(`${field}: invalid asset path`);
      const file=path.join(ROOT,value.src);
      if(!fs.existsSync(file)||!fs.statSync(file).isFile()||!fs.realpathSync(file).startsWith(fs.realpathSync(ROOT)+path.sep))fail(`${field}: asset missing or outside repository`);
      if(![value.width,value.height].every(n=>Number.isInteger(n)&&n>0))fail(`${field}: invalid dimensions`);
      result.logo={src:value.src,width:value.width,height:value.height,alt:bi(value.alt,`${field}.alt`)};
    }
    if(p.backgroundLink !== undefined){
      const field=`${p.id}.backgroundLink`;const value=p.backgroundLink;
      if(!value||typeof value!=='object'||Array.isArray(value))fail(`${field}: must be an object`);
      let url;try{url=new URL(value.url);}catch{fail(`${field}: invalid URL`);}
      if(url.protocol!=='https:')fail(`${field}: URL must use HTTPS`);
      result.backgroundLink={label:bi(value.label,`${field}.label`),url:url.href};
    }
    if(p.mechanics !== undefined){
      const field=`${p.id}.mechanics`;const value=p.mechanics;
      if(!value||typeof value!=='object'||Array.isArray(value))fail(`${field}: must be an object`);
      if(!Array.isArray(value.steps)||!value.steps.length)fail(`${field}.steps: must be a non-empty list`);
      const stepIds=new Set();
      result.mechanics={heading:bi(value.heading,`${field}.heading`),intro:bi(value.intro,`${field}.intro`),steps:value.steps.map((step,index)=>{
        const stepField=`${field}.steps[${index}]`;
        if(!step||typeof step!=='object'||Array.isArray(step)||typeof step.id!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(step.id)||stepIds.has(step.id))fail(`${stepField}: invalid or duplicate step ID`);
        stepIds.add(step.id);
        return {id:step.id,title:bi(step.title,`${stepField}.title`),body:bi(step.body,`${stepField}.body`)};
      })};
    }
    if(p.process !== undefined){
      const field=`${p.id}.process`;const value=p.process;
      if(!value||typeof value!=='object'||Array.isArray(value))fail(`${field}: must be an object`);
      if(!Array.isArray(value.stages)||!value.stages.length)fail(`${field}.stages: must be a non-empty list`);
      const stageIds=new Set();
      const localAsset=(assetPath,extension,assetField)=>{
        if(typeof assetPath!=='string'||!new RegExp(`^assets/projects/${p.id}/[a-z0-9-]+\.${extension}$`).test(assetPath))fail(`${assetField}: invalid asset path`);
        const file=path.join(ROOT,assetPath);
        if(!fs.existsSync(file)||!fs.statSync(file).isFile()||!fs.realpathSync(file).startsWith(fs.realpathSync(ROOT)+path.sep))fail(`${assetField}: asset missing or outside repository`);
        return assetPath;
      };
      const processImage=(item,imageField)=>{
        if(!item||typeof item!=='object'||Array.isArray(item))fail(`${imageField}: must be an object`);
        if(![item.width,item.height,item.thumbnailWidth].every(n=>Number.isInteger(n)&&n>0)||item.thumbnailWidth>item.width)fail(`${imageField}: invalid dimensions`);
        return {src:localAsset(item.src,'webp',imageField),thumbnail:localAsset(item.thumbnail,'webp',imageField),width:item.width,height:item.height,thumbnailWidth:item.thumbnailWidth,alt:bi(item.alt,`${imageField}.alt`),caption:bi(item.caption,`${imageField}.caption`)};
      };
      const processDemo=(demo,demoField)=>{
        if(!demo||typeof demo!=='object'||Array.isArray(demo)||![demo.width,demo.height].every(n=>Number.isInteger(n)&&n>0))fail(`${demoField}: invalid dimensions`);
        return {src:localAsset(demo.src,'mp4',demoField),poster:localAsset(demo.poster,'webp',demoField),width:demo.width,height:demo.height,caption:bi(demo.caption,`${demoField}.caption`)};
      };
      const compiledProcess={heading:bi(value.heading,`${field}.heading`),intro:bi(value.intro,`${field}.intro`),stages:value.stages.map((stage,index)=>{
        const stageField=`${field}.stages[${index}]`;
        if(!stage||typeof stage!=='object'||Array.isArray(stage)||typeof stage.id!=='string'||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(stage.id)||stageIds.has(stage.id))fail(`${stageField}: invalid or duplicate stage ID`);
        stageIds.add(stage.id);
        const compiled={id:stage.id,label:bi(stage.label,`${stageField}.label`),title:bi(stage.title,`${stageField}.title`),body:bi(stage.body,`${stageField}.body`)};
        if(stage.contribution!==undefined)compiled.contribution=bi(stage.contribution,`${stageField}.contribution`);
        if(stage.findings!==undefined){if(!Array.isArray(stage.findings))fail(`${stageField}.findings: must be a list`);compiled.findings=stage.findings.map((finding,i)=>bi(finding,`${stageField}.findings[${i}]`));}
        if(stage.gallery!==undefined){if(!Array.isArray(stage.gallery))fail(`${stageField}.gallery: must be a list`);compiled.gallery=stage.gallery.map((item,i)=>processImage(item,`${stageField}.gallery[${i}]`));}
        if(stage.demo!==undefined)compiled.demo=processDemo(stage.demo,`${stageField}.demo`);
        return compiled;
      })};
      if(value.badge!==undefined){
        const badgeField=`${field}.badge`;const badge=value.badge;
        if(!badge||typeof badge!=='object'||Array.isArray(badge))fail(`${badgeField}: must be an object`);
        if(![badge.width,badge.height].every(n=>Number.isInteger(n)&&n>0))fail(`${badgeField}: invalid dimensions`);
        compiledProcess.badge={src:localAsset(badge.src,'webp',badgeField),width:badge.width,height:badge.height,alt:bi(badge.alt,`${badgeField}.alt`)};
      }
      result.process=compiledProcess;
    }
    if(p.journey !== undefined) {
      if(!Array.isArray(p.journey)) fail(`${p.id}.journey: must be a list`);
      result.journey=p.journey.map((entry,i)=>{
        const field=`${p.id}.journey[${i}]`;
        if(!entry || typeof entry!=='object' || Array.isArray(entry)) fail(`${field}: must be an object`);
        return {title:bi(entry.title,`${field}.title`),body:bi(entry.body,`${field}.body`)};
      });
    }
    if(p.architecture !== undefined){
      if(!Array.isArray(p.architecture))fail(`${p.id}.architecture: must be a list`);
      result.architecture=p.architecture.map((item,i)=>({title:bi(item?.title,`${p.id}.architecture[${i}].title`),body:bi(item?.body,`${p.id}.architecture[${i}].body`)}));
    }
    if(p.gallery !== undefined){
      if(!Array.isArray(p.gallery))fail(`${p.id}.gallery: must be a list`);
      result.gallery=p.gallery.map((item,i)=>{
        const field=`${p.id}.gallery[${i}]`;
        const asset=value=>{
          if(typeof value!=='string'||!new RegExp(`^assets/projects/${p.id}/[a-z0-9-]+\\.webp$`).test(value))fail(`${field}: invalid asset path`);
          const file=path.join(ROOT,value);
          if(!fs.existsSync(file)||!fs.statSync(file).isFile()||!fs.realpathSync(file).startsWith(fs.realpathSync(ROOT)+path.sep))fail(`${field}: asset missing or outside repository`);
          return value;
        };
        if(!item||!['product','engineering','team'].includes(item.group))fail(`${field}: invalid group`);
        if(![item.width,item.height,item.thumbnailWidth].every(n=>Number.isInteger(n)&&n>0)||item.thumbnailWidth>item.width)fail(`${field}: invalid dimensions`);
        return {src:asset(item.src),thumbnail:asset(item.thumbnail),width:item.width,height:item.height,thumbnailWidth:item.thumbnailWidth,group:item.group,alt:bi(item.alt,`${field}.alt`),caption:bi(item.caption,`${field}.caption`)};
      });
    }
    if(p.demo !== undefined){
      const d=p.demo;const field=`${p.id}.demo`;
      const asset=(value,extension)=>{
        if(typeof value!=='string'||!new RegExp(`^assets/projects/${p.id}/[a-z0-9-]+\\.${extension}$`).test(value))fail(`${field}: invalid asset path`);
        const file=path.join(ROOT,value);
        if(!fs.existsSync(file)||!fs.statSync(file).isFile()||!fs.realpathSync(file).startsWith(fs.realpathSync(ROOT)+path.sep))fail(`${field}: asset missing or outside repository`);
        return value;
      };
      if(!d||![d.width,d.height].every(n=>Number.isInteger(n)&&n>0))fail(`${field}: invalid dimensions`);
      result.demo={src:asset(d.src,'mp4'),poster:asset(d.poster,'webp'),width:d.width,height:d.height,caption:bi(d.caption,`${field}.caption`)};
    }
    if(p.youtubeDemo !== undefined){
      const value=p.youtubeDemo;const field=`${p.id}.youtubeDemo`;
      if(!value||typeof value!=='object'||Array.isArray(value)||typeof value.videoId!=='string'||!/^[A-Za-z0-9_-]{11}$/.test(value.videoId))fail(`${field}: invalid video ID`);
      const expectedEmbed=`https://www.youtube.com/embed/${value.videoId}?si=-dlLqAk-GLLG2Q_H`;
      const expectedUrl=`https://youtu.be/${value.videoId}`;
      if(value.embedUrl!==expectedEmbed||value.url!==expectedUrl)fail(`${field}: untrusted or mismatched YouTube URL`);
      result.youtubeDemo={videoId:value.videoId,embedUrl:value.embedUrl,url:value.url,title:bi(value.title,`${field}.title`),linkLabel:bi(value.linkLabel,`${field}.linkLabel`)};
    }
    if(p.boundary) result.boundary=bi(p.boundary,`${p.id}.boundary`);
    if(p.team !== undefined) result.team=bi(p.team,`${p.id}.team`);
    if(p.members !== undefined){
      const field=`${p.id}.members`;
      if(!Array.isArray(p.members)||!p.members.length)fail(`${field}: must be a non-empty list`);
      const seenNames=new Set();const seenProfiles=new Set();
      result.members=p.members.map((member,index)=>{
        if(!member||typeof member!=='object'||Array.isArray(member))fail(`${field}[${index}]: must contain a name and GitHub profile`);
        const name=typeof member.name==='string'?member.name.trim():'';
        if(!name||name.length>80||name.includes('@')||/\d{5,}/.test(name))fail(`${field}[${index}]: must contain a public name only`);
        if(typeof member.github!=='string'||!/^https:\/\/github\.com\/[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(member.github))fail(`${field}[${index}]: invalid GitHub profile`);
        if(seenNames.has(name)||seenProfiles.has(member.github))fail(`${field}: duplicate member`);
        seenNames.add(name);seenProfiles.add(member.github);
        return {name,github:member.github};
      });
    }
    if(p.featuredVideo !== undefined){
      const field=`${p.id}.featuredVideo`;const value=p.featuredVideo;
      if(!value||typeof value!=='object'||Array.isArray(value)||typeof value.youtubeId!=='string'||!/^[A-Za-z0-9_-]{11}$/.test(value.youtubeId))fail(`${field}: invalid YouTube ID`);
      let watch;try{watch=new URL(value.watchUrl);}catch{fail(`${field}: invalid watch URL`);}
      if(watch.protocol!=='https:'||!['youtube.com','www.youtube.com'].includes(watch.hostname)||watch.pathname!=='/watch'||watch.searchParams.get('v')!==value.youtubeId)fail(`${field}: watch URL must match the YouTube ID`);
      let embed;
      if(value.embedUrl!==undefined){
        try{embed=new URL(value.embedUrl);}catch{fail(`${field}: invalid embed URL`);}
        if(embed.protocol!=='https:'||!['youtube.com','www.youtube.com','youtube-nocookie.com','www.youtube-nocookie.com'].includes(embed.hostname)||embed.pathname!==`/embed/${value.youtubeId}`)fail(`${field}: embed URL must match the YouTube ID`);
      }
      if(typeof value.poster!=='string'||!new RegExp(`^assets/projects/${p.id}/[a-z0-9-]+\\.webp$`).test(value.poster))fail(`${field}: invalid poster path`);
      const poster=path.join(ROOT,value.poster);
      if(!fs.existsSync(poster)||!fs.statSync(poster).isFile()||!fs.realpathSync(poster).startsWith(fs.realpathSync(ROOT)+path.sep))fail(`${field}: poster missing or outside repository`);
      if(![value.width,value.height].every(n=>Number.isInteger(n)&&n>0))fail(`${field}: invalid poster dimensions`);
      result.featuredVideo={youtubeId:value.youtubeId,watchUrl:watch.href,...(embed?{embedUrl:embed.href}:{}),poster:value.poster,width:value.width,height:value.height,caption:bi(value.caption,`${field}.caption`)};
    }
    if(p.play !== undefined){
      const field=`${p.id}.play`;const value=p.play;
      if(!value||typeof value!=='object'||Array.isArray(value)||typeof value.url!=='string'||!/^play\/[a-z0-9]+(?:-[a-z0-9]+)*\/index\.html$/.test(value.url))fail(`${field}: invalid repository-relative play URL`);
      result.play={url:value.url,label:bi(value.label,`${field}.label`)};
    }
    if(p.sectionOrder !== undefined){
      const field=`${p.id}.sectionOrder`;const allowed=new Set(['video','background','mechanics','process','product','contributions','demo','journey','architecture','engineering','team','credits','resources','scope']);
      if(!Array.isArray(p.sectionOrder)||p.sectionOrder.some(key=>typeof key!=='string'||!allowed.has(key))||new Set(p.sectionOrder).size!==p.sectionOrder.length)fail(`${field}: invalid or duplicate section key`);
      result.sectionOrder=[...p.sectionOrder];
    }
    if(p.credits !== undefined){
      const field=`${p.id}.credits`;
      if(!Array.isArray(p.credits))fail(`${field}: must be a list`);
      result.credits=p.credits.map((item,i)=>{
        const itemField=`${field}[${i}]`;
        if(!item||typeof item!=='object'||Array.isArray(item))fail(`${itemField}: must be an object`);
        const credit={title:bi(item.title,`${itemField}.title`),body:bi(item.body,`${itemField}.body`)};
        if(item.url!==undefined){let url;try{url=new URL(item.url);}catch{fail(`${itemField}: invalid URL`);}if(url.protocol!=='https:')fail(`${itemField}: URL must use HTTPS`);credit.url=url.href;}
        return credit;
      });
    }
    if(p.keywords) { if(!Array.isArray(p.keywords)||p.keywords.some(x=>typeof x!=='string')) fail(`${p.id}: keywords must be strings`); result.keywords=p.keywords; }
    if(p.links) { if(!Array.isArray(p.links)) fail(`${p.id}: links must be a list`);result.links=p.links.map(link=>{const url=new URL(link.url);if(url.protocol!=='https:')fail(`${p.id}: links must use HTTPS`);return {label:bi(link.label,`${p.id}.link`),url:url.href};}); }
    return {published:p.published,data:result};
  });
  const live = projects.filter(p=>p.published).map(p=>p.data);
  const selectedIds = new Set();
  const selected = doc.selected.map(s=>{
    if (!s || typeof s.id!=='string' || selectedIds.has(s.id)) fail('Invalid or duplicate selected ID');
    if (!live.some(p=>p.id===s.id)) fail(`Selected project is missing or unpublished: ${s.id}`);
    selectedIds.add(s.id);
    return {id:s.id,...(s.description?{description:bi(s.description,`selected.${s.id}.description`)}:{})};
  });
  return {selected,projects:live};
}
function generate(source){return '// Generated from projects.yml. Do not edit; run npm run build.\nconst PROJECTS = '+JSON.stringify(compile(source),null,2)+';\n';}
if(require.main===module){try{const output=generate(fs.readFileSync(path.join(ROOT,'projects.yml'),'utf8'));const target=path.join(ROOT,'projects-data.js');if(process.argv.includes('--check')){if(!fs.existsSync(target)||fs.readFileSync(target,'utf8')!==output)throw new Error('projects-data.js is stale; run npm run build');console.log('Project schema and generated output are current.');}else{fs.writeFileSync(target,output);console.log('Generated projects-data.js from projects.yml');}}catch(error){console.error(error.message);process.exitCode=1;}}
module.exports={compile,generate};
