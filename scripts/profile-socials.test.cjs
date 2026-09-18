const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const createContext=()=>{
 let profileHtml='';
 const inserted=[];
 const node={addEventListener(){},scrollIntoView(){}};
 const wechat={};
 const socials={querySelector(selector){assert.equal(selector,'.wechat');return wechat;},insertBefore(element,before){inserted.push({element,before});}};
 const profile={set innerHTML(value){profileHtml=value;},addEventListener(){}};
 const context=vm.createContext({document:{querySelectorAll(){return []},addEventListener(){},querySelector(selector){if(selector==='#profile')return profile;if(selector==='#profile .socials')return socials;return node;},createElement(tag){assert.equal(tag,'a');return {attributes:{},set href(value){this.attributes.href=value;},setAttribute(name,value){this.attributes[name]=value;},set innerHTML(value){this.svg=value;}};}},window:{addEventListener(){},scrollTo(){}},localStorage:{getItem:()=> 'en'},navigator:{language:'en'},setInterval(){},requestAnimationFrame(){}});
 const root=path.join(__dirname,'..');
 vm.runInContext(fs.readFileSync(path.join(root,'projects-data.js'),'utf8'),context);
 vm.runInContext(fs.readFileSync(path.join(root,'content.js'),'utf8'),context);
 vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8').replace(/\nrender\(\);\s*$/,''),context);
 return {context,inserted,profileHtml:()=>profileHtml,wechat};
};

test('profile renders configured Instagram between GitHub and WeChat',()=>{
 const {context,inserted,profileHtml,wechat}=createContext();
 vm.runInContext('profile()',context);
 assert.match(profileHtml(),/aria-label="LinkedIn"/);
 assert.match(profileHtml(),/aria-label="GitHub"/);
 assert.match(profileHtml(),/aria-label="WeChat"/);
 assert.equal(inserted.length,1);
 const instagram=inserted[0].element;
 assert.equal(inserted[0].before,wechat);
 assert.deepEqual(instagram.attributes,{href:'https://www.instagram.com/jarrettchen7/','aria-label':'Instagram',target:'_blank',rel:'noopener'});
 assert.match(instagram.svg,/<svg/);
});

test('contact page shows the configured Instagram handle as a public link',()=>{
 const {context}=createContext();
 const html=vm.runInContext('contact()',context);
 assert.ok(html.includes('<strong>Instagram</strong>'));
 assert.ok(html.includes('href="https://www.instagram.com/jarrettchen7/" target="_blank" rel="noopener">@jarrettchen7</a>'));
});
