// Mechanical web-image conversion. Originals are never modified.
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const [source,stem,quality='82']=process.argv.slice(2);
if(!source||!stem||!/^\d+$/.test(quality)||+quality>100)throw new Error('Usage: node scripts/prepare-image.cjs SOURCE OUTPUT_STEM [QUALITY]');
const info=execFileSync('sips',['-g','pixelWidth','-g','pixelHeight',source],{encoding:'utf8'});
const width=Number(info.match(/pixelWidth:\s*(\d+)/)?.[1]);
const height=Number(info.match(/pixelHeight:\s*(\d+)/)?.[1]);
if(!width||!height)throw new Error('Cannot read image dimensions');
fs.mkdirSync(path.dirname(stem),{recursive:true});
const outputs=[];
for(const limit of [800,1600]){
  const scale=Math.min(1,limit/Math.max(width,height));
  const w=Math.round(width*scale),h=Math.round(height*scale);
  const output=`${stem}-${limit}.webp`;
  if(path.resolve(source)===path.resolve(output))throw new Error('Refusing to overwrite original');
  execFileSync('cwebp',['-quiet','-q',quality,'-m','6','-metadata','none','-resize',String(w),String(h),source,'-o',output]);
  outputs.push({file:output,width:w,height:h,bytes:fs.statSync(output).size});
}
console.log(JSON.stringify({source,originalBytes:fs.statSync(source).size,outputs}));
