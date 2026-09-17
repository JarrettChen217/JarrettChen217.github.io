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
