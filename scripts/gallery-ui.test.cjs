const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
function context(){const c=vm.createContext({localStorage:{getItem:()=> 'en'},navigator:{language:'en'},document:{querySelectorAll:()=>[],querySelector:()=>({addEventListener(){}}),addEventListener(){}},window:{addEventListener(){}},setInterval(){}});vm.runInContext(fs.readFileSync(path.join(__dirname,'../app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),c);return c;}
test('gallery opens an accessible in-page preview rather than a new tab',()=>{
 const c=context();c.project={gallery:[{group:'team',src:'assets/a.webp',thumbnail:'assets/a-small.webp',width:1600,height:1000,thumbnailWidth:800,alt:['Photo','照片'],caption:['A <team>','团队']}]};
 const html=vm.runInContext("gallery(project,'team')",c);
 assert.match(html,/data-gallery-preview/);assert.match(html,/aria-haspopup="dialog"/);assert.ok(!html.includes('target="_blank"'));assert.match(html,/A &lt;team&gt;/);
});
test('masonry sizes each row span from its own photo and caption height',()=>{
 const c=context();assert.equal(vm.runInContext('galleryRowSpan(280, 24)',c),13);assert.equal(vm.runInContext('galleryRowSpan(630, 24)',c),27);
});
test('video demo offers a bilingual in-page enlarge action',()=>{
 const c=context();c.project={demo:{src:'demo.mp4',poster:'poster.webp',width:1440,height:1022,caption:['Demo','演示']}};
 let html=vm.runInContext('demoVideo(project)',c);assert.match(html,/data-video-preview/);assert.match(html,/aria-haspopup="dialog"/);assert.match(html,/Enlarge video/);
 html=vm.runInContext("language='zh';demoVideo(project)",c);assert.match(html,/放大观看/);assert.ok(!html.includes('target="_blank"'));
});
test('Tetress UML diagrams use the full engineering-gallery row for legibility',()=>{
 const styles=fs.readFileSync(path.join(__dirname,'../styles.css'),'utf8');
 for(const diagram of ['tetress-astar-search-flow-700','tetress-mcts-class-model-700','tetress-mcts-turn-sequence-700']) assert.match(styles,new RegExp(`\\.gallery-engineering figure:has\\(img\\[src\\*="${diagram}"\\]\\)\\{grid-column:1/-1\\}`));
});
test('Tetress UML diagrams keep feedback paths and side labels readable',()=>{
 const root=path.join(__dirname,'../assets/projects/tetress');
 const astar=fs.readFileSync(path.join(root,'tetress-astar-search-flow.svg'),'utf8');
 const classes=fs.readFileSync(path.join(root,'tetress-mcts-class-model.svg'),'utf8');
 const sequence=fs.readFileSync(path.join(root,'tetress-mcts-turn-sequence.svg'),'utf8');
 assert.match(astar,/Legal movement<\/text><text class="label" x="438" y="246">generator/);
 assert.match(astar,/M1220 305 V360 H1165 V410/);
 assert.match(astar,/text-anchor="middle" x="1165" y="490"/);
 assert.match(astar,/M1045 495 V620 H735 V355 H914 V305/);
 assert.match(classes,/\.sidehead\{font:700 19px/);
 assert.match(classes,/M940 615 H970 V470 H1155 V515/);
 assert.match(classes,/x="984" y="458">generates legal moves/);
 for(const message of ['M210 275 H580','M580 326 H952','M952 670 H580','M580 734 H210']) assert.match(sequence,new RegExp(message));
 assert.match(sequence,/M1250 490 H952/);
 assert.match(sequence,/M210 770 H1250/);
 assert.match(sequence,/M1250 810 H210/);
 assert.ok(!sequence.includes('M952 444 H1000 V444 H952'));
});
