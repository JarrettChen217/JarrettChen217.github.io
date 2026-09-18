const test=require('node:test');const assert=require('node:assert/strict');const yaml=require('js-yaml');const fs=require('node:fs');const path=require('node:path');const {compile}=require('./build-projects.cjs');
const fixture=()=>yaml.load(fs.readFileSync(path.join(__dirname,'../projects.yml'),'utf8'));
const run=doc=>compile(yaml.dump(doc));
const demo=()=>({src:'assets/projects/avl-visualisation/avl-insertion-demo.mp4',poster:'assets/projects/avl-visualisation/avl-insertion-poster.webp',width:1440,height:1022,caption:{en:'Insertion and rotation',zh:'插入与旋转'}});
const logo=()=>({src:'assets/projects/avl-visualisation/avl-interface-800.webp',width:800,height:397,alt:{en:'Algorithms in Action project mark',zh:'Algorithms in Action 项目标识'}});
const backgroundLink=()=>({label:{en:'Learn about the <TIPE> approach',zh:'了解 TIPE 教育方法'},url:'https://pursuit.unimelb.edu.au/articles/Trauma-follows-children-into-the-classroom.-A-new-teaching-model-is-changing-that'});
const process=()=>({
 heading:{en:'From discovery to validation',zh:'从需求发现到验证'},
 intro:{en:'A client-led design process.',zh:'以客户为中心的设计过程。'},
 source:'/private/process-notes.md',
 stages:[
  {id:'discover',label:{en:'Discover',zh:'探索'},title:{en:'Understand the need',zh:'理解需求'},body:{en:'Start with the classroom context.',zh:'从课堂场景出发。'},contribution:{en:'Structured interview questions.',zh:'整理访谈问题。'},findings:[{en:'Private check-ins matter.',zh:'私密签到很重要。'}],gallery:[{...media(),source:'/private/original.png'}]},
  {id:'validate',label:{en:'Validate',zh:'验证'},title:{en:'Review with the client',zh:'与客户验证'},body:{en:'Test the revised flow.',zh:'测试改进后的流程。'},demo:{...demo(),original:'/private/original.mov'}}
 ]
});
test('process chapters compile ordered bilingual evidence without leaking research metadata',()=>{
 const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');p.process=process();
 const compiled=run(doc).projects.find(p=>p.id==='avl-visualisation');
 assert.deepEqual(compiled.process.heading,['From discovery to validation','从需求发现到验证']);
 assert.deepEqual(compiled.process.intro,['A client-led design process.','以客户为中心的设计过程。']);
 assert.deepEqual(compiled.process.stages.map(stage=>stage.id),['discover','validate']);
 assert.deepEqual(compiled.process.stages[0].findings,[['Private check-ins matter.','私密签到很重要。']]);
 assert.equal(compiled.process.stages[0].gallery[0].src,media().src);
 assert.equal(compiled.process.stages[1].demo.src,demo().src);
 assert.ok(!JSON.stringify(compiled.process).includes('/private/'));
});
test('process chapters reject duplicate or unsafe stages and incomplete translations',()=>{
 const changes=[
  value=>{value.stages[1].id='discover'},
  value=>{value.stages[0].id='Discover now'},
  value=>{delete value.stages[0].body.zh},
  value=>{value.stages[0].findings=[{en:'English only'}]},
  value=>{value.stages[0].gallery[0].src='../private.webp'},
  value=>{value.stages[1].demo.width=0},
 ];
 for(const change of changes){const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');p.process=process();change(p.process);assert.throws(()=>run(doc),/process/);}
});
test('process chapters render as the primary bilingual case-study narrative',()=>{
 const vm=require('node:vm');const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');p.process=process();p.work=[{en:'Legacy contribution',zh:'旧贡献'}];p.journey=[{title:{en:'Legacy journey',zh:'旧过程'},body:{en:'Duplicated copy.',zh:'重复内容。'}}];p.gallery=[media()];p.demo=demo();
 const context=vm.createContext({CONTENT:{projects:run(doc).projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('avl-visualisation')",context);
 assert.match(html,/class="project-process"/);assert.ok(html.indexOf('Understand the need')<html.indexOf('Review with the client'));assert.match(html,/Structured interview questions/);assert.match(html,/Private check-ins matter/);assert.match(html,/loading="lazy"/);assert.match(html,/<video[^>]*controls[^>]*preload="none"/);assert.ok(!html.includes('Legacy contribution'));assert.ok(!html.includes('Legacy journey'));assert.equal((html.match(/<video/g)||[]).length,1);
 html=vm.runInContext("language='zh';detail('avl-visualisation')",context);assert.match(html,/从需求发现到验证/);assert.match(html,/理解需求/);assert.match(html,/整理访谈问题/);assert.match(html,/私密签到很重要/);assert.ok(!html.includes('Understand the need'));
});
test('background source link compiles safely and renders within the bilingual background section',()=>{
 const vm=require('node:vm');const doc=fixture();const p=doc.projects.find(p=>p.id==='berry-street');p.backgroundLink={...backgroundLink(),source:'/private/research-notes.pdf'};
 const result=run(doc);const compiled=result.projects.find(p=>p.id==='berry-street');assert.deepEqual(compiled.backgroundLink,{label:['Learn about the <TIPE> approach','了解 TIPE 教育方法'],url:backgroundLink().url});assert.ok(!JSON.stringify(compiled).includes('/private/research-notes.pdf'));
 const context=vm.createContext({CONTENT:{projects:result.projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('berry-street')",context);assert.match(html,/<div class="detail-section"><h3>Background<\/h3><p>.*?<\/p><a class="background-link"/);assert.match(html,/Learn about the &lt;TIPE&gt; approach/);assert.match(html,/href="https:\/\/pursuit\.unimelb\.edu\.au\/articles\//);
 html=vm.runInContext("language='zh';detail('berry-street')",context);assert.match(html,/了解 TIPE 教育方法/);assert.ok(!vm.runInContext("detail('online-ordering')",context).includes('background-link'));
});
test('background source link rejects insecure, malformed and untranslated values',()=>{
 for(const backgroundLinkValue of [{...backgroundLink(),url:'http://example.com'},{...backgroundLink(),url:'not a url'},{...backgroundLink(),label:{en:'English only'}}]){const doc=fixture();doc.projects.find(p=>p.id==='berry-street').backgroundLink=backgroundLinkValue;assert.throws(()=>run(doc),/backgroundLink|Invalid URL/);}
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
