const test=require('node:test');const assert=require('node:assert/strict');const yaml=require('js-yaml');const fs=require('node:fs');const path=require('node:path');const {compile}=require('./build-projects.cjs');
const fixture=()=>yaml.load(fs.readFileSync(path.join(__dirname,'../projects.yml'),'utf8'));
const run=doc=>compile(yaml.dump(doc));
const demo=()=>({src:'assets/projects/avl-visualisation/avl-insertion-demo.mp4',poster:'assets/projects/avl-visualisation/avl-insertion-poster.webp',width:1440,height:1022,caption:{en:'Insertion and rotation',zh:'插入与旋转'}});
const logo=()=>({src:'assets/projects/avl-visualisation/avl-interface-800.webp',width:800,height:397,alt:{en:'Algorithms in Action project mark',zh:'Algorithms in Action 项目标识'}});
const midasExtras=()=>({
 team:{en:'Cosmic Creators',zh:'Cosmic Creators'},
 featuredVideo:{youtubeId:'_KGzpyql4ps',watchUrl:'https://www.youtube.com/watch?v=_KGzpyql4ps',poster:'assets/projects/avl-visualisation/avl-interface-800.webp',width:800,height:397,caption:{en:'Midas Curse gameplay demo',zh:'Midas Curse 游戏演示'}},
 play:{url:'play/midas-curse/index.html',label:{en:'Play Game',zh:'在线试玩'}},
 sectionOrder:['video','background','product','contributions','journey','engineering','team','credits','resources','scope'],
 credits:[{title:{en:'Models and environments',zh:'模型与场景'},body:{en:'Third-party assets remain credited to their creators.',zh:'第三方素材版权归各自创作者所有。'},url:'https://assetstore.unity.com/'}]
});
test('project experience fields compile bilingual public data and strip research metadata',()=>{
 const doc=fixture();const source=doc.projects.find(project=>project.id==='avl-visualisation');Object.assign(source,midasExtras(),{researchNotes:'/private/report.pdf'});
 const project=run(doc).projects.find(item=>item.id==='avl-visualisation');
 assert.deepEqual(project.team,['Cosmic Creators','Cosmic Creators']);
 assert.deepEqual(project.featuredVideo,{youtubeId:'_KGzpyql4ps',watchUrl:'https://www.youtube.com/watch?v=_KGzpyql4ps',poster:'assets/projects/avl-visualisation/avl-interface-800.webp',width:800,height:397,caption:['Midas Curse gameplay demo','Midas Curse 游戏演示']});
 assert.deepEqual(project.play,{url:'play/midas-curse/index.html',label:['Play Game','在线试玩']});
 assert.deepEqual(project.sectionOrder,midasExtras().sectionOrder);
 assert.deepEqual(project.credits,[{title:['Models and environments','模型与场景'],body:['Third-party assets remain credited to their creators.','第三方素材版权归各自创作者所有。'],url:'https://assetstore.unity.com/'}]);
 assert.ok(!JSON.stringify(project).includes('/private/report.pdf'));
});
test('project experience fields reject unsafe video, play, order and credit values',()=>{
 const changes=[
  {featuredVideo:{...midasExtras().featuredVideo,youtubeId:'not a youtube id'}},
  {featuredVideo:{...midasExtras().featuredVideo,watchUrl:'http://www.youtube.com/watch?v=_KGzpyql4ps'}},
  {featuredVideo:{...midasExtras().featuredVideo,caption:{en:'English only'}}},
  {featuredVideo:{...midasExtras().featuredVideo,poster:'../secret.webp'}},
  {featuredVideo:{...midasExtras().featuredVideo,width:0}},
  {play:{...midasExtras().play,url:'../secret.html'}},
  {play:{...midasExtras().play,url:'https://example.com/play'}},
  {sectionOrder:['video','unknown']},
  {sectionOrder:['video','video']},
  {credits:[{...midasExtras().credits[0],url:'http://example.com'}]},
  {credits:[{title:{en:'Only English'},body:midasExtras().credits[0].body}]}
 ];
 for(const change of changes){const doc=fixture();Object.assign(doc.projects.find(project=>project.id==='avl-visualisation'),midasExtras(),change);assert.throws(()=>run(doc),/featuredVideo|play|sectionOrder|credits/);}
});
test('detail renders the configured bilingual Midas sequence and demo actions',()=>{
 const vm=require('node:vm');const doc=fixture();const p=doc.projects.find(project=>project.id==='avl-visualisation');Object.assign(p,midasExtras());p.journey=[{title:{en:'Iteration',zh:'设计迭代'},body:{en:'Refined through playtesting.',zh:'通过试玩反馈完善。'}}];
 const context=vm.createContext({CONTENT:{projects:run(doc).projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext(`detail(${JSON.stringify(p.id)})`,context);
 assert.match(html,/Cosmic Creators/);assert.match(html,/class="video-poster"/);assert.match(html,/src="assets\/projects\/avl-visualisation\/avl-interface-800\.webp"/);assert.ok(!html.includes('youtube-nocookie.com'));assert.match(html,/Watch Demo/);assert.match(html,/href="play\/midas-curse\/index\.html"/);assert.match(html,/Play Game/);
 assert.ok(html.indexOf('project-featured-video')<html.indexOf('Background'));assert.ok(html.indexOf('Project in action')<html.indexOf('Work &amp; contribution'));assert.ok(html.indexOf('Work &amp; contribution')<html.indexOf('Iteration'));assert.ok(html.indexOf('Iteration')<html.indexOf('Credits &amp; sources'));
 html=vm.runInContext("language='zh';detail("+JSON.stringify(p.id)+")",context);assert.match(html,/Midas Curse 游戏演示/);assert.match(html,/观看演示/);assert.match(html,/在线试玩/);assert.match(html,/设计迭代/);assert.match(html,/素材来源与署名/);
});
test('project logo compiles validated local media and renders beside the bilingual detail title',()=>{
 const vm=require('node:vm');const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');p.logo={...logo(),source:'/private/original-logo.png'};
 const result=run(doc);const compiled=result.projects.find(p=>p.id==='avl-visualisation');assert.deepEqual(compiled.logo,{src:logo().src,width:800,height:397,alt:['Algorithms in Action project mark','Algorithms in Action 项目标识']});assert.ok(!JSON.stringify(compiled).includes('/private/original-logo.png'));
 const context=vm.createContext({CONTENT:{projects:result.projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('avl-visualisation')",context);assert.match(html,/class="detail-title-row"/);assert.match(html,/class="project-logo"/);assert.match(html,/alt="Algorithms in Action project mark"/);assert.match(html,/width="800" height="397"/);
 html=vm.runInContext("language='zh';detail('avl-visualisation')",context);assert.match(html,/alt="Algorithms in Action 项目标识"/);assert.ok(!vm.runInContext("detail('online-ordering')",context).includes('project-logo'));
});
test('project logo rejects unsafe paths, missing files, bad dimensions and untranslated alt text',()=>{
 for(const change of [{src:'../secret.webp'},{src:'https://example.com/logo.webp'},{src:'assets/projects/avl-visualisation/missing.webp'},{src:'assets/projects/berry-street/visual-palette-800.webp'},{width:0},{height:1.5},{alt:{en:'Only English'}}]){const doc=fixture();doc.projects.find(p=>p.id==='avl-visualisation').logo={...logo(),...change};assert.throws(()=>run(doc),/logo/);}
});
test('demo compiles public fields and rejects unsafe or incomplete media',()=>{
 const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');p.demo={...demo(),original:'/private/original.mov'};
 const result=run(doc).projects.find(p=>p.id==='avl-visualisation');assert.equal(result.demo.src,demo().src);assert.ok(!JSON.stringify(result).includes('/private/original.mov'));
 for(const change of [{src:'../secret.mp4'},{src:'https://example.com/a.mp4'},{src:'assets/projects/avl-visualisation/missing.mp4'},{poster:'../secret.webp'},{width:0},{height:1.5},{caption:{en:'Only English'}}]){p.demo={...demo(),...change};assert.throws(()=>run(doc),/demo/);}
});
test('detail renders controllable bilingual demo without autoplay and a clear back link',()=>{
 const vm=require('node:vm');const doc=fixture();doc.projects.find(p=>p.id==='avl-visualisation').demo=demo();
 const context=vm.createContext({CONTENT:{projects:run(doc).projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('avl-visualisation')",context);assert.match(html,/<video[^>]*controls[^>]*preload="none"/);assert.ok(!html.includes('autoplay'));assert.match(html,/Insertion and rotation/);assert.match(html,/<a class="back" href="#projects"><svg/);
 html=vm.runInContext("language='zh';detail('avl-visualisation')",context);assert.match(html,/插入与旋转/);assert.ok(!vm.runInContext("detail('online-ordering')",context).includes('<video'));
});
const media=()=>({src:'assets/projects/avl-visualisation/avl-interface-1600.webp',thumbnail:'assets/projects/avl-visualisation/avl-interface-800.webp',width:1600,height:793,thumbnailWidth:800,group:'product',alt:{en:'AVL interface',zh:'AVL 界面'},caption:{en:'Synchronized tree and pseudocode.',zh:'同步呈现树图与伪代码。'}});
test('media renderer provides responsive lazy images, bilingual captions and architecture',()=>{
 const vm=require('node:vm');const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');p.gallery=[media()];p.architecture=[{title:{en:'Controller',zh:'控制器'},body:{en:'<script>unsafe</script>',zh:'组织步骤'}}];
 const context=vm.createContext({CONTENT:{projects:run(doc).projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('avl-visualisation')",context);assert.match(html,/loading="lazy"/);assert.match(html,/srcset="[^"]+800w[^\"]+1600w/);assert.match(html,/width="1600" height="793"/);assert.match(html,/Synchronized tree and pseudocode/);assert.match(html,/&lt;script&gt;/);assert.ok(!html.includes('<script>unsafe'));
 html=vm.runInContext("language='zh';detail('avl-visualisation')",context);assert.match(html,/同步呈现树图与伪代码/);assert.match(html,/控制器/);assert.ok(!vm.runInContext("detail('online-ordering')",context).includes('project-gallery'));
});
test('gallery compiles only validated local media and bilingual captions',()=>{const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');p.gallery=[{...media(),original:'/private/photo.jpg'}];const result=run(doc).projects.find(item=>item.id==='avl-visualisation');assert.equal(result.gallery[0].src,media().src);assert.deepEqual(result.gallery[0].caption,['Synchronized tree and pseudocode.','同步呈现树图与伪代码。']);assert.ok(!JSON.stringify(result).includes('/private/photo.jpg'));});
test('gallery rejects unsafe paths, missing files, bad dimensions and untranslated text',()=>{for(const change of [{src:'../secret.jpg'},{src:'https://example.com/a.webp'},{src:'assets/projects/avl-visualisation/missing.webp'},{src:'assets/projects/avl-visualisation/../avl-interface.webp'},{width:0},{thumbnailWidth:0},{group:'secret'},{caption:{en:'Only English'}}]){const doc=fixture();doc.projects.find(p=>p.id==='avl-visualisation').gallery=[{...media(),...change}];assert.throws(()=>run(doc),/gallery/);}});
test('architecture retains translated steps and rejects incomplete entries',()=>{const doc=fixture();doc.projects[0].architecture=[{title:{en:'Controller',zh:'控制器'},body:{en:'Schedules steps',zh:'组织执行步骤'}}];assert.deepEqual(run(doc).projects[0].architecture,[{title:['Controller','控制器'],body:['Schedules steps','组织执行步骤']}]);delete doc.projects[0].architecture[0].body.zh;assert.throws(()=>run(doc),/architecture/);});
test('details render bilingual case studies safely and omit empty sections',()=>{const vm=require('node:vm');const doc=fixture();doc.projects[0].journey=[{title:{en:'Visible result',zh:'成果展示'},body:{en:'<img src=x onerror=alert(1)>',zh:'经过反馈完善。'}}];const data=run(doc);const context=vm.createContext({CONTENT:{projects:data.projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});const source=fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,'');vm.runInContext(source,context);const id=data.projects[0].id;let html=vm.runInContext(`detail(${JSON.stringify(id)})`,context);assert.match(html,/Visible result/);assert.match(html,/&lt;img/);assert.ok(!html.includes('<img src=x'));html=vm.runInContext(`language='zh';detail(${JSON.stringify(id)})`,context);assert.match(html,/成果展示/);assert.match(html,/经过反馈完善/);assert.ok(!html.includes('Visible result'));const other=data.projects.find(p=>!p.journey?.length);assert.ok(!vm.runInContext(`detail(${JSON.stringify(other.id)})`,context).includes('project-journey'));});
test('journey preserves bilingual order without leaking research metadata',()=>{const doc=fixture();doc.projects[0].journey=[{title:{en:'Clearer charts',zh:'更清晰的图表'},body:{en:'Refined through feedback.',zh:'根据反馈完善。'},source:'/private/research.pdf'},{title:{en:'Handover',zh:'交接'},body:{en:'Prepared design artifacts.',zh:'整理设计成果。'}}];const result=run(doc);assert.deepEqual(result.projects[0].journey,[{title:['Clearer charts','更清晰的图表'],body:['Refined through feedback.','根据反馈完善。']},{title:['Handover','交接'],body:['Prepared design artifacts.','整理设计成果。']}]);assert.ok(!JSON.stringify(result).includes('/private/research.pdf'));});
test('journey rejects malformed entries and missing translations',()=>{for(const journey of [null,{},[null],[{title:{en:'Title',zh:'标题'},body:{en:'English only'}}]]){const doc=fixture();doc.projects[0].journey=journey;assert.throws(()=>run(doc),/journey/);}});
test('journey is optional and can be empty',()=>{const doc=fixture();delete doc.projects[0].journey;assert.equal(run(doc).projects[0].journey,undefined);doc.projects[0].journey=[];assert.deepEqual(run(doc).projects[0].journey,[]);});
test('selected order and overrides do not mutate canonical summaries',()=>{const doc=fixture();const result=run(doc);assert.deepEqual(result.selected.map(x=>x.id),doc.selected.map(x=>x.id));const item=result.selected.find(x=>x.description);assert.ok(item);assert.deepEqual(result.projects.find(x=>x.id===item.id).summary,[doc.projects.find(x=>x.id===item.id).summary.en,doc.projects.find(x=>x.id===item.id).summary.zh]);});
test('draft projects and editor metadata are excluded',()=>{const doc=fixture();doc.projects.push({...doc.projects[0],id:'private-draft',published:false});doc.projects[0].editor_notes='PRIVATE_SENTINEL';const result=run(doc);assert.ok(!result.projects.some(x=>x.id==='private-draft'));assert.ok(!JSON.stringify(result).includes('PRIVATE_SENTINEL'));});
test('broken selections, duplicates, and missing translations fail',()=>{let doc=fixture();doc.selected.push({id:'missing'});assert.throws(()=>run(doc),/missing or unpublished/);doc=fixture();doc.projects.push(doc.projects[0]);assert.throws(()=>run(doc),/duplicate/);doc=fixture();delete doc.projects[0].summary.zh;assert.throws(()=>run(doc),/en and zh/);doc=fixture();doc.projects.find(p=>p.id===doc.selected[0].id).published=false;assert.throws(()=>run(doc),/unpublished/);});
