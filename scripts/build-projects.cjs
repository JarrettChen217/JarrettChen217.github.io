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
      result.process={heading:bi(value.heading,`${field}.heading`),intro:bi(value.intro,`${field}.intro`),stages:value.stages.map((stage,index)=>{
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
    if(p.boundary) result.boundary=bi(p.boundary,`${p.id}.boundary`);
    if(p.keywords) { if(!Array.isArray(p.keywords)||p.keywords.some(x=>typeof x!=='string')) fail(`${p.id}: keywords must be strings`); result.keywords=p.keywords; }
    if(p.links) { if(!Array.isArray(p.links)) fail(`${p.id}: links must be a list`);result.links=p.links.map(link=>{const url=new URL(link.url);if(url.protocol!=='https:')fail(`${p.id}: links must use HTTPS`);return {label:bi(link.label,`${p.id}.link`),url:url.href};}); }
    if(p.members!==undefined){
      if(!Array.isArray(p.members)||!p.members.length)fail(`${p.id}.members: must be a non-empty list`);
      result.members=p.members.map((member,i)=>{
        const field=`${p.id}.members[${i}]`;
        if(!member||typeof member!=='object'||Array.isArray(member))fail(`${field}: must be an object`);
        const compiled={name:bi(member.name,`${field}.name`)};
        if(member.url!==undefined){
          let url;try{url=new URL(member.url);}catch{fail(`${field}.url: invalid URL`);}
          if(url.protocol!=='https:'||url.hostname!=='github.com')fail(`${field}.url: must be a GitHub HTTPS URL`);
          compiled.url=url.href;
        }
        return compiled;
      });
    }
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
