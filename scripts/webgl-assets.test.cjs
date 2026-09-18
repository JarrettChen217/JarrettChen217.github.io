const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const playRoot=path.join(root,'play/midas-curse');

test('Midas Curse play page references one complete deduplicated Unity build',()=>{
  const html=fs.readFileSync(path.join(playRoot,'index.html'),'utf8');
  const expected=[
    'Build/midas-curse.loader.js',
    'Build/midas-curse.data.unityweb',
    'Build/midas-curse.framework.js.unityweb',
    'Build/midas-curse.wasm.unityweb'
  ];
  for(const relative of expected){
    assert.match(html,new RegExp(relative.replaceAll('.','\\.')));
    const file=path.join(playRoot,relative);
    assert.ok(fs.statSync(file).isFile(),`${relative} must be a file`);
    assert.ok(fs.statSync(file).size>0,`${relative} must not be empty`);
  }
  assert.deepEqual(fs.readdirSync(path.join(playRoot,'Build')).sort(),expected.map(file=>path.basename(file)).sort());
  assert.ok(!fs.existsSync(path.join(playRoot,'Build/Build')));
});

test('Midas Curse play page defers the large Unity download until requested',()=>{
  const html=fs.readFileSync(path.join(playRoot,'index.html'),'utf8');
  assert.match(html,/id="start-game"/);
  assert.match(html,/addEventListener\('click',startGame/);
  assert.doesNotMatch(html,/window\.addEventListener\('load',startGame/);
  assert.match(html,/href="\.\.\/\.\.\/#project\/midas-curse-unity"/);
  assert.match(html,/data-en="Back to case study" data-zh="返回项目详情"/);
});
