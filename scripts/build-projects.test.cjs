const test=require('node:test');const assert=require('node:assert/strict');const yaml=require('js-yaml');const fs=require('node:fs');const path=require('node:path');const {compile}=require('./build-projects.cjs');
const fixture=()=>yaml.load(fs.readFileSync(path.join(__dirname,'../projects.yml'),'utf8'));
const run=doc=>compile(yaml.dump(doc));
const demo=()=>({src:'assets/projects/avl-visualisation/avl-insertion-demo.mp4',poster:'assets/projects/avl-visualisation/avl-insertion-poster.webp',width:1440,height:1022,caption:{en:'Insertion and rotation',zh:'插入与旋转'}});
const youtubeDemo=()=>({videoId:'eip1ze0U0Ns',embedUrl:'https://www.youtube.com/embed/eip1ze0U0Ns?si=-dlLqAk-GLLG2Q_H',url:'https://youtu.be/eip1ze0U0Ns',title:{en:'Dance XR five-minute demo',zh:'Dance XR 五分钟演示'},linkLabel:{en:'Watch on YouTube',zh:'在 YouTube 观看'}});
const logo=()=>({src:'assets/projects/avl-visualisation/avl-interface-800.webp',width:800,height:397,alt:{en:'Algorithms in Action project mark',zh:'Algorithms in Action 项目标识'}});
const midasExtras=()=>({
 team:{en:'Cosmic Creators',zh:'Cosmic Creators'},
 members:[
  {name:'Hao Chen',github:'https://github.com/JarrettChen217'},
  {name:'Chao Ma',github:'https://github.com/cmcbrm'},
  {name:'Gaoyongle Zhang',github:'https://github.com/XinMoZ'},
  {name:'Jiayi Sun',github:'https://github.com/JiayiSun666'}
 ],
 featuredVideo:{youtubeId:'_KGzpyql4ps',watchUrl:'https://www.youtube.com/watch?v=_KGzpyql4ps',embedUrl:'https://www.youtube.com/embed/_KGzpyql4ps?si=UOvL9itUuzPHptUr',poster:'assets/projects/avl-visualisation/avl-interface-800.webp',width:800,height:397,caption:{en:'Midas Curse gameplay demo',zh:'Midas Curse 游戏演示'}},
 play:{url:'play/midas-curse/index.html',label:{en:'Play Game',zh:'在线试玩'}},
 sectionOrder:['video','background','product','contributions','journey','engineering','team','credits','resources','scope'],
 credits:[{title:{en:'Models and environments',zh:'模型与场景'},body:{en:'Third-party assets remain credited to their creators.',zh:'第三方素材版权归各自创作者所有。'},url:'https://assetstore.unity.com/'}]
});
const mechanics=()=>({
 heading:{en:'How the game works',zh:'游戏机制'},
 intro:{en:'The golden path is both a weapon and a risk.',zh:'黄金路径既是武器，也是风险。'},
 source:'/private/game-design-notes.md',
 steps:[
  {id:'create',title:{en:'Leave a golden path',zh:'留下黄金路径'},body:{en:'Movement transforms the ground.',zh:'移动会转化脚下的地面。'},source:'/private/prototype.mov'},
  {id:'survive',title:{en:'Manage the curse',zh:'控制黄金化'},body:{en:'Standing on gold raises the Goldenate meter.',zh:'站在黄金地面上会提高黄金化数值。'}}
 ]
});
test('gameplay mechanics compile ordered bilingual public data and section placement',()=>{
 const doc=fixture();const p=doc.projects.find(project=>project.id==='avl-visualisation');p.mechanics=mechanics();p.sectionOrder=['background','mechanics','process'];
 const project=run(doc).projects.find(project=>project.id==='avl-visualisation');
 assert.deepEqual(project.mechanics,{heading:['How the game works','游戏机制'],intro:['The golden path is both a weapon and a risk.','黄金路径既是武器，也是风险。'],steps:[{id:'create',title:['Leave a golden path','留下黄金路径'],body:['Movement transforms the ground.','移动会转化脚下的地面。']},{id:'survive',title:['Manage the curse','控制黄金化'],body:['Standing on gold raises the Goldenate meter.','站在黄金地面上会提高黄金化数值。']}]});
 assert.deepEqual(project.sectionOrder,['background','mechanics','process']);
 assert.ok(!JSON.stringify(project.mechanics).includes('/private/'));
});
test('gameplay mechanics reject unsafe or duplicate steps and incomplete translations',()=>{
 const changes=[
  value=>{value.steps[1].id='create'},
  value=>{value.steps[0].id='Create now'},
  value=>{delete value.heading.zh},
  value=>{delete value.intro.en},
  value=>{delete value.steps[0].title.zh},
  value=>{delete value.steps[0].body.en},
  value=>{value.steps=[]}
 ];
 for(const change of changes){const doc=fixture();const p=doc.projects.find(project=>project.id==='avl-visualisation');p.mechanics=mechanics();change(p.mechanics);assert.throws(()=>run(doc),/mechanics/);}
});
test('gameplay mechanics render safely in bilingual section order and remain optional',()=>{
 const vm=require('node:vm');const doc=fixture();const p=doc.projects.find(project=>project.id==='avl-visualisation');p.mechanics=mechanics();p.mechanics.steps[0].body.en='Movement creates <gold> tiles.';p.process=process();p.sectionOrder=['background','mechanics','process'];
 const context=vm.createContext({CONTENT:{projects:run(doc).projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('avl-visualisation')",context);
 assert.match(html,/class="project-mechanics"/);assert.match(html,/class="mechanics-flow"/);assert.match(html,/id="mechanic-create"/);assert.match(html,/Movement creates &lt;gold&gt; tiles\./);assert.ok(html.indexOf('Background')<html.indexOf('project-mechanics'));assert.ok(html.indexOf('project-mechanics')<html.indexOf('project-process'));
 html=vm.runInContext("language='zh';detail('avl-visualisation')",context);assert.match(html,/游戏机制/);assert.match(html,/留下黄金路径/);assert.match(html,/移动会转化脚下的地面。/);assert.ok(!html.includes('Leave a golden path'));
 assert.ok(!vm.runInContext("detail('online-ordering')",context).includes('project-mechanics'));
});
test('project experience fields compile bilingual public data and strip research metadata',()=>{
 const doc=fixture();const source=doc.projects.find(project=>project.id==='avl-visualisation');Object.assign(source,midasExtras(),{researchNotes:'/private/report.pdf'});
 const project=run(doc).projects.find(item=>item.id==='avl-visualisation');
 assert.deepEqual(project.team,['Cosmic Creators','Cosmic Creators']);
 assert.deepEqual(project.members,midasExtras().members);
 assert.deepEqual(project.featuredVideo,{youtubeId:'_KGzpyql4ps',watchUrl:'https://www.youtube.com/watch?v=_KGzpyql4ps',embedUrl:'https://www.youtube.com/embed/_KGzpyql4ps?si=UOvL9itUuzPHptUr',poster:'assets/projects/avl-visualisation/avl-interface-800.webp',width:800,height:397,caption:['Midas Curse gameplay demo','Midas Curse 游戏演示']});
 assert.deepEqual(project.play,{url:'play/midas-curse/index.html',label:['Play Game','在线试玩']});
 assert.deepEqual(project.sectionOrder,midasExtras().sectionOrder);
 assert.deepEqual(project.credits,[{title:['Models and environments','模型与场景'],body:['Third-party assets remain credited to their creators.','第三方素材版权归各自创作者所有。'],url:'https://assetstore.unity.com/'}]);
 assert.ok(!JSON.stringify(project).includes('/private/report.pdf'));
});
test('team members reject private contact data and render as a bilingual project byline',()=>{
 const vm=require('node:vm');const doc=fixture();const p=doc.projects.find(project=>project.id==='avl-visualisation');Object.assign(p,midasExtras());
 const result=run(doc);const compiled=result.projects.find(project=>project.id==='avl-visualisation');assert.deepEqual(compiled.members,midasExtras().members);
 const context=vm.createContext({CONTENT:{projects:result.projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('avl-visualisation')",context);assert.match(html,/Members: <span class="team-members"><a class="team-member-link" href="https:\/\/github\.com\/JarrettChen217" target="_blank" rel="noopener">Hao Chen<\/a> · .*Gaoyongle Zhang.*<\/span>/);
 html=vm.runInContext("language='zh';detail('avl-visualisation')",context);assert.match(html,/成员：<span class="team-members">.*href="https:\/\/github\.com\/XinMoZ".*Gaoyongle Zhang.*<\/span>/);
 for(const members of [[],[{name:'',github:'https://github.com/example'}],[{name:'Hao Chen',github:'mailto:hc4@student.unimelb.edu.au'}],[{name:'Hao Chen',github:'https://example.com/Hao'}],[{name:'Hao Chen',github:'https://github.com/Hao/repos'}],[{name:'1234567',github:'https://github.com/example'}]]){const invalid=fixture();invalid.projects.find(project=>project.id==='avl-visualisation').members=members;assert.throws(()=>run(invalid),/members/);}
});
test('project experience fields reject unsafe video, play, order and credit values',()=>{
 const changes=[
  {featuredVideo:{...midasExtras().featuredVideo,youtubeId:'not a youtube id'}},
  {featuredVideo:{...midasExtras().featuredVideo,watchUrl:'http://www.youtube.com/watch?v=_KGzpyql4ps'}},
  {featuredVideo:{...midasExtras().featuredVideo,embedUrl:'http://www.youtube.com/embed/_KGzpyql4ps'}},
  {featuredVideo:{...midasExtras().featuredVideo,embedUrl:'https://example.com/embed/_KGzpyql4ps'}},
  {featuredVideo:{...midasExtras().featuredVideo,embedUrl:'https://www.youtube.com/embed/aaaaaaaaaaa'}},
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
 const vm=require('node:vm');const doc=fixture();const p=doc.projects.find(project=>project.id==='avl-visualisation');Object.assign(p,midasExtras());p.process={...process(),badge:{src:'assets/projects/avl-visualisation/avl-interface-800.webp',width:800,height:397,alt:{en:'Built by hand in 2023',zh:'2023 年手工构建'}}};p.sectionOrder=['background','process','video','demo','product','contributions','journey','engineering','team','credits'];p.journey=[{title:{en:'Iteration',zh:'设计迭代'},body:{en:'Refined through playtesting.',zh:'通过试玩反馈完善。'}}];
 const context=vm.createContext({CONTENT:{projects:run(doc).projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext(`detail(${JSON.stringify(p.id)})`,context);
 assert.match(html,/Cosmic Creators/);assert.match(html,/class="process-badge"/);assert.match(html,/src="https:\/\/www\.youtube\.com\/embed\/_KGzpyql4ps\?si=UOvL9itUuzPHptUr"/);assert.match(html,/loading="lazy"/);assert.match(html,/referrerpolicy="strict-origin-when-cross-origin"/);assert.match(html,/allowfullscreen/);assert.match(html,/Watch Demo/);assert.match(html,/href="play\/midas-curse\/index\.html"/);assert.match(html,/Play Game/);
 assert.ok(html.indexOf('Background')<html.indexOf('project-process'));assert.ok(html.indexOf('project-process')<html.indexOf('project-featured-video'));assert.ok(html.indexOf('Project in action')<html.indexOf('Work &amp; contribution'));assert.ok(html.indexOf('Work &amp; contribution')<html.indexOf('Iteration'));assert.ok(html.indexOf('Iteration')<html.indexOf('Credits &amp; sources'));
 html=vm.runInContext("language='zh';detail("+JSON.stringify(p.id)+")",context);assert.match(html,/Midas Curse 游戏演示/);assert.match(html,/观看演示/);assert.match(html,/在线试玩/);assert.match(html,/设计迭代/);assert.match(html,/素材来源与署名/);
});
test('Midas uses the poster fallback when YouTube embedding is disabled',()=>{
 const vm=require('node:vm');const result=run(fixture());const midas=result.projects.find(project=>project.id==='midas-curse-unity');
 assert.equal(midas.featuredVideo.embedUrl,undefined);
 const context=vm.createContext({CONTENT:{projects:result.projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 const html=vm.runInContext("detail('midas-curse-unity')",context);
 assert.match(html,/class="video-poster"/);
 assert.match(html,/src="assets\/projects\/midas-curse-unity\/demo-poster-1280\.webp"/);
 assert.ok(!html.includes('class="video-embed"'));
 assert.match(html,/Watch Demo/);
 assert.match(html,/Play Game/);
});
test('Midas publishes the approved bilingual gameplay loop before its engineering process',()=>{
 const result=run(fixture());const midas=result.projects.find(project=>project.id==='midas-curse-unity');
 assert.deepEqual(midas.mechanics.steps.map(step=>step.id),['create-path','manage-curse','turn-danger','reshape-field']);
 assert.deepEqual(midas.sectionOrder.slice(0,3),['background','mechanics','process']);
 assert.match(midas.mechanics.steps[1].body[0],/Goldenate/);assert.match(midas.mechanics.steps[1].body[1],/黄金化/);assert.match(midas.mechanics.steps[2].body[0],/coins/);assert.match(midas.mechanics.steps[3].body[1],/终极技能/);
 const vm=require('node:vm');const context=vm.createContext({CONTENT:{projects:result.projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('midas-curse-unity')",context);assert.match(html,/How the game works/);assert.match(html,/Leave a golden path/);assert.ok(html.indexOf('project-mechanics')<html.indexOf('project-process'));
 html=vm.runInContext("language='zh';detail('midas-curse-unity')",context);assert.match(html,/游戏机制/);assert.match(html,/用神器重塑战场/);
});
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
test('process badge and process section order compile as safe public data',()=>{
 const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');p.process={...process(),badge:{src:'assets/projects/avl-visualisation/avl-interface-800.webp',width:800,height:397,alt:{en:'Built by hand in 2023',zh:'2023 年手工构建'}}};p.sectionOrder=['background','process','video'];
 const compiled=run(doc).projects.find(p=>p.id==='avl-visualisation');
 assert.deepEqual(compiled.process.badge,{src:'assets/projects/avl-visualisation/avl-interface-800.webp',width:800,height:397,alt:['Built by hand in 2023','2023 年手工构建']});
 assert.deepEqual(compiled.sectionOrder,['background','process','video']);
});
test('process badge rejects unsafe paths, missing files, invalid dimensions and untranslated alt text',()=>{
 const changes=[{src:'../secret.webp'},{src:'assets/projects/avl-visualisation/missing.webp'},{width:0},{height:1.5},{alt:{en:'English only'}}];
 for(const change of changes){const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');p.process={...process(),badge:{src:'assets/projects/avl-visualisation/avl-interface-800.webp',width:800,height:397,alt:{en:'Built by hand in 2023',zh:'2023 年手工构建'},...change}};assert.throws(()=>run(doc),/process.*badge/);}
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
test('Berry Street keeps its declared process order without a project badge',()=>{
 const vm=require('node:vm');const result=run(fixture());const berry=result.projects.find(p=>p.id==='berry-street');const context=vm.createContext({CONTENT:{projects:result.projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 const html=vm.runInContext("detail('berry-street')",context);let previous=-1;for(const stage of berry.process.stages){const current=html.indexOf(`id="process-${stage.id}"`);assert.ok(current>previous,`${stage.id} should follow the previous stage`);previous=current;}assert.ok(!html.includes('process-badge'));
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
test('members compile public bilingual names and share the Midas title metadata format',()=>{
 const vm=require('node:vm');const doc=fixture();const p=doc.projects.find(p=>p.id==='berry-street');p.members=[
  {name:{en:'Ziyu Wang',zh:'Ziyu Wang'}},
  {name:{en:'Hao Chen',zh:'Hao Chen'},url:'https://github.com/JarrettChen217',source:'/private/readme.md'},
  {name:{en:'Zikun Qiu',zh:'Zikun Qiu'}},
  {name:{en:'Gaoyongle Zhang',zh:'Gaoyongle Zhang'},url:'https://github.com/XinMoZ'},
  {name:{en:'Junhao Zhu',zh:'Junhao Zhu'},url:'https://github.com/junhaozhu1'}
 ];
 const result=run(doc);const compiled=result.projects.find(p=>p.id==='berry-street');assert.equal(JSON.stringify(compiled).includes('/private/'),false);
 const context=vm.createContext({CONTENT:{projects:result.projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('berry-street')",context);assert.match(html,/Members: <span class="team-members">Ziyu Wang · <a class="team-member-link" href="https:\/\/github\.com\/JarrettChen217" target="_blank" rel="noopener">Hao Chen<\/a> · Zikun Qiu ·/);assert.ok(!html.includes('class="project-members"'));assert.equal((html.match(/target="_blank" rel="noopener"/g)||[]).length,4);assert.ok(!html.includes('student.unimelb.edu.au'));
 html=vm.runInContext("language='zh';detail('berry-street')",context);assert.match(html,/成员：<span class="team-members">Ziyu Wang/);assert.ok(!html.includes('项目成员'));
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
test('youtube demo compiles the approved public metadata only',()=>{
 const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');p.youtubeDemo={...youtubeDemo(),internal:'/private/final.mov'};
 const value=run(doc).projects.find(p=>p.id==='avl-visualisation').youtubeDemo;
 assert.deepEqual(value,{videoId:'eip1ze0U0Ns',embedUrl:'https://www.youtube.com/embed/eip1ze0U0Ns?si=-dlLqAk-GLLG2Q_H',url:'https://youtu.be/eip1ze0U0Ns',title:['Dance XR five-minute demo','Dance XR 五分钟演示'],linkLabel:['Watch on YouTube','在 YouTube 观看']});
 assert.ok(!JSON.stringify(value).includes('/private/'));
});
test('youtube demo accepts a clean official embed URL',()=>{
 const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');p.youtubeDemo={...youtubeDemo(),embedUrl:'https://www.youtube.com/embed/eip1ze0U0Ns'};
 const value=run(doc).projects.find(p=>p.id==='avl-visualisation').youtubeDemo;
 assert.equal(value.embedUrl,'https://www.youtube.com/embed/eip1ze0U0Ns');
});
test('section order accepts the YouTube demo section',()=>{
 const doc=fixture();const source=doc.projects.find(p=>p.id==='vitalguard');source.sectionOrder=['youtube'];
 const vitalguard=run(doc).projects.find(p=>p.id==='vitalguard');
 assert.deepEqual(vitalguard.sectionOrder,['youtube']);
});
test('VitalGuard publishes the proposal-to-prototype journey with verified media',()=>{
 const vitalguard=run(fixture()).projects.find(p=>p.id==='vitalguard');
 assert.deepEqual(vitalguard.sectionOrder,['background','contributions','architecture','process','youtube','resources','scope']);
 assert.equal(vitalguard.architecture.length,5);
 assert.equal(vitalguard.process.stages.length,4);
 assert.equal(vitalguard.process.stages.flatMap(stage=>stage.gallery||[]).length,7);
 assert.match(vitalguard.process.stages[0].body[0],/proposal|initial/i);
 assert.match(vitalguard.boundary[0],/prototype/i);
});
test('youtube demo rejects untrusted URLs, mismatched IDs and incomplete translations',()=>{
 for(const change of [{videoId:'bad id'},{embedUrl:'https://evil.example/embed/eip1ze0U0Ns'},{embedUrl:'https://www.youtube.com/embed/_Nbhr87wm8I'},{url:'http://youtu.be/eip1ze0U0Ns'},{url:'https://youtu.be/_Nbhr87wm8I'},{title:{en:'English only'}},{linkLabel:{zh:'仅中文'}}]){
  const doc=fixture();doc.projects.find(p=>p.id==='avl-visualisation').youtubeDemo={...youtubeDemo(),...change};assert.throws(()=>run(doc),/youtubeDemo/);
 }
});
test('team metadata rejects freeform credits and omits Team when no team name exists',()=>{
 const doc=fixture();doc.projects.find(project=>project.id==='avl-visualisation').teamCredit={en:'Four-person team',zh:'四人团队'};
 assert.throws(()=>run(doc),/teamCredit/);
 const java=run(fixture()).projects.find(project=>project.id==='java-concurrency');
 assert.equal(java.team,undefined);
 assert.equal(java.members.length,2);
});
test('custom work headings compile from bilingual data',()=>{
 const doc=fixture();doc.projects.find(project=>project.id==='avl-visualisation').workHeading={en:'My contribution',zh:'我的贡献'};
 assert.deepEqual(run(doc).projects.find(project=>project.id==='avl-visualisation').workHeading,['My contribution','我的贡献']);
});
test.skip('legacy team credit metadata test',()=>{
 const vm=require('node:vm');const doc=fixture();const p=doc.projects.find(p=>p.id==='avl-visualisation');
 p.workHeading={en:'My contribution',zh:'我的贡献'};
 const result=run(doc);const compiled=result.projects.find(p=>p.id==='avl-visualisation');
 assert.deepEqual(compiled.workHeading,['My contribution','我的贡献']);
 const context=vm.createContext({CONTENT:{projects:result.projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('avl-visualisation')",context);assert.match(html,/class="team-credit"/);assert.match(html,/<h3>My contribution<\/h3>/);assert.ok(html.indexOf('Four-person team:')<html.indexOf('Visualising AVL insertion'));
 html=vm.runInContext("language='zh';detail('avl-visualisation')",context);assert.match(html,/四人团队：/);assert.match(html,/<h3>我的贡献<\/h3>/);
 for(const change of [value=>{delete value.teamCredit.zh},value=>{value.workHeading={en:'My contribution'}}]){const invalid=fixture();const project=invalid.projects.find(p=>p.id==='avl-visualisation');project.teamCredit=p.teamCredit;project.workHeading=p.workHeading;change(project);assert.throws(()=>run(invalid),/teamCredit|workHeading/);}
});
test('detail renders controllable bilingual demo without autoplay and a clear back link',()=>{
 const vm=require('node:vm');const doc=fixture();doc.projects.find(p=>p.id==='avl-visualisation').demo=demo();
 const context=vm.createContext({CONTENT:{projects:run(doc).projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('avl-visualisation')",context);assert.match(html,/<video[^>]*controls[^>]*preload="none"/);assert.ok(!html.includes('autoplay'));assert.match(html,/Insertion and rotation/);assert.match(html,/<a class="back" href="#projects"><svg/);
 html=vm.runInContext("language='zh';detail('avl-visualisation')",context);assert.match(html,/插入与旋转/);assert.ok(!vm.runInContext("detail('online-ordering')",context).includes('<video'));
});
test('detail renders a responsive five-minute YouTube demo with a link fallback',()=>{
 const vm=require('node:vm');const doc=fixture();doc.projects.find(p=>p.id==='avl-visualisation').youtubeDemo=youtubeDemo();
 const context=vm.createContext({CONTENT:{projects:run(doc).projects},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll(){return []},addEventListener(){},querySelector(){return {addEventListener(){}};}},window:{addEventListener(){}},setInterval(){}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 let html=vm.runInContext("detail('avl-visualisation')",context);
 assert.match(html,/class="[^\"]*project-youtube-demo/);assert.match(html,/src="https:\/\/www\.youtube\.com\/embed\/eip1ze0U0Ns\?si=-dlLqAk-GLLG2Q_H"/);assert.match(html,/title="Dance XR five-minute demo"/);assert.match(html,/allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"/);assert.match(html,/referrerpolicy="strict-origin-when-cross-origin"/);assert.match(html,/allowfullscreen/);assert.match(html,/href="https:\/\/youtu\.be\/eip1ze0U0Ns"/);assert.ok(!/\sautoplay(?:\s|=|>)/.test(html));
 html=vm.runInContext("language='zh';detail('avl-visualisation')",context);assert.match(html,/Dance XR 五分钟演示/);assert.match(html,/在 YouTube 观看/);
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
test('draft projects and editor metadata are excluded',()=>{const doc=fixture();const source=doc.projects.find(p=>p.id==='agent-ai');doc.projects.push({...source,id:'private-draft',published:false});source.editor_notes='PRIVATE_SENTINEL';const result=run(doc);assert.ok(!result.projects.some(x=>x.id==='private-draft'));assert.ok(!JSON.stringify(result).includes('PRIVATE_SENTINEL'));});
test('broken selections, duplicates, and missing translations fail',()=>{let doc=fixture();doc.selected.push({id:'missing'});assert.throws(()=>run(doc),/missing or unpublished/);doc=fixture();doc.projects.push(doc.projects[0]);assert.throws(()=>run(doc),/duplicate/);doc=fixture();delete doc.projects[0].summary.zh;assert.throws(()=>run(doc),/en and zh/);doc=fixture();doc.projects.find(p=>p.id===doc.selected[0].id).published=false;assert.throws(()=>run(doc),/unpublished/);});
test('DaisyWorld publishes a verified bilingual course case study with a local native-window demo',()=>{
 const doc=fixture();
 const source=doc.projects.find(project=>project.id==='daisyworld');
 const project=run(doc).projects.find(project=>project.id==='daisyworld');
 assert.ok(project);
 assert.deepEqual(project.name,['DaisyWorld — Exploring Emergence','DaisyWorld（探索涌现与环境反馈）']);
 assert.deepEqual(project.date,['May 2025','2025年5月']);
 assert.equal(project.region,'au');
 assert.equal(project.type,'academic');
 assert.deepEqual(project.summary,[
  "A two-person Python reimplementation and extension of NetLogo's DaisyWorld for SWEN90004 Modelling Complex Software Systems, exploring how simple local rules can accumulate into system-level environmental feedback.",
  '墨尔本大学 SWEN90004“复杂软件系统建模”课程中的两人合作项目：用 Python 复现并扩展 NetLogo 的 DaisyWorld，探索简单的局部规则如何累积为系统层面的环境反馈。',
 ]);
 assert.deepEqual(project.members,[
  {name:['Hao Chen','Hao Chen'],url:'https://github.com/JarrettChen217'},
  {name:['Junhao Zhu','Junhao Zhu'],url:'https://github.com/junhaozhu1'},
 ]);
 assert.deepEqual(project.work,[
  ['Built and refined core Python model infrastructure, including parameter configuration, the grid-patch abstraction, toroidal-neighbour handling, and temperature diffusion.','搭建并完善 Python 模型的核心基础，包括参数配置、网格单元抽象、环形邻域处理和温度扩散。'],
  ['Added the notebook-based data-inspection workflow and implemented substantial parts of the pollution/Lucky Clover extension, including pollution zones and spread, visual overlays, and pollution-dependent mutation and ageing behaviour.','加入基于 notebook 的数据检查流程，并实现污染/Lucky Clover 扩展的重要部分，包括污染区域与传播、可视化覆盖层，以及受污染程度影响的变异和衰老逻辑。'],
 ]);
 assert.ok(project.tech.includes('Python'));
 assert.ok(project.tech.includes('Pygame'));
 assert.ok(project.tech.includes('Jupyter Notebook'));
 assert.ok(project.tech.includes('pandas'));
 assert.ok(project.keywords.includes('agent-based modelling'));
 assert.ok(project.keywords.includes('complex systems'));
 assert.ok(!doc.selected.some(item=>item.id==='daisyworld'));
 assert.deepEqual(project.demo,{
  src:'assets/projects/daisyworld/daisyworld-extension-local-demo.mp4',
  poster:'assets/projects/daisyworld/daisyworld-extension-local-poster.webp',
  width:720,
  height:760,
  caption:[
   "A fixed-seed local macOS/Pygame capture of the extension model's grid renderer. It is a functional demonstration, not an experimental result.",
   '使用固定随机种子录制的扩展模型本机 macOS/Pygame 网格渲染画面。该画面仅用于功能演示，不代表实验结果。',
  ],
 });
 assert.match(project.summary[0],/SWEN90004/);
 assert.match(project.summary[1],/SWEN90004/);
 assert.match(project.background[0],/Ant-colony shortest-path/);
 assert.match(project.background[0],/does not simulate ants or route finding/);
 assert.match(project.background[1],/蚂蚁群体寻找最短路径/);
 assert.match(project.background[1],/不模拟蚂蚁或路径寻优/);
 assert.match(project.background[0],/pollution zones/);
 assert.match(project.background[1],/污染区域/);
 for(const field of ['logo','gallery','links','process','journey','architecture']) assert.equal(source[field],undefined);
});
