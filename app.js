/* No backend required: navigation, filtering, locale, and calendar progress run locally. */
let language;try{language=localStorage.getItem('hao-language')}catch{}
if(!['en','zh'].includes(language))language=navigator.language.toLowerCase().startsWith('zh')?'zh':'en';
const filters={query:'',region:'all',type:'all'};
const t=value=>Array.isArray(value)?value[language==='zh'?1:0]:value;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const places={ny:['New York, United States','纽约，美国'],au:['Melbourne, Australia','墨尔本，澳大利亚'],us:['Charleston, SC, United States','查尔斯顿，南卡罗来纳州，美国'],cn:['Beijing, China','北京，中国'],remote:['Remote','远程']};
const types={personal:['Personal / learning','个人 / 学习'],academic:['Coursework','课程项目'],team:['Team / client collaboration','团队 / 客户合作'],industrial:['Industrial','工业项目']};
const icons={linkedin:'M20 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM8 19H5V9h3ZM6.5 7.7a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4ZM19 19h-3v-5.1c0-1.2-.3-2-1.4-2-1.3 0-1.6 1-1.6 2V19h-3V9h2.9v1.4c.5-.9 1.4-1.6 2.8-1.6 2.5 0 3.3 1.6 3.3 4Z',github:'M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.4-4-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.2 1.2a11.1 11.1 0 0 1 5.8 0C17 4.7 18 5 18 5c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.4 5.8.4.4.8 1.1.8 2.2v3.1c0 .3.2.6.8.5A11.4 11.4 0 0 0 12 .8Z',wechat:'M9 3C4.6 3 1 5.8 1 9.2c0 2 1.2 3.8 3.1 4.9l-.8 2.6 2.8-1.4 1.9.2c-.2-.6-.3-1.2-.3-1.8 0-3.6 3.4-6.4 7.6-6.4h1.1C15.8 4.8 12.7 3 9 3ZM6 8.1a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM23 14c0-2.9-3.1-5.3-6.9-5.3S9.2 11.1 9.2 14s3.1 5.3 6.9 5.3l1.8-.2 2.5 1.3-.7-2.2C21.7 17.3 23 15.7 23 14Zm-9.2-.8a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Zm4.7 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z'};
const icon=name=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name]}"/></svg>`;
const label=(en,zh)=>esc(t([en,zh]));
const bilingual=(en,zh)=>esc(en)+(language==='zh'?` <span class="annotation">（${esc(zh)}）</span>`:'');
function route(){const [page='overview',id]=location.hash.slice(1).split('/');return {page:['overview','projects','project','contact'].includes(page)?page:'overview',id};}
function profile(){document.querySelector('#profile').innerHTML=`<div class="avatar"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="21" r="11"/><path d="M12 55c0-14 8-21 20-21s20 7 20 21"/></svg><small>${label('Portrait to be added','待添加个人照片')}</small></div><h1>Hao Chen</h1><div class="pronouns">he / him</div><div class="identity">${label('M.S. student','理学硕士在读')}<br>${bilingual('Computer Engineering','计算机工程')}<br>${bilingual('Columbia University','哥伦比亚大学')}</div><div class="contact-line">${label('New York, United States','纽约，美国')}${CONTENT.email?`<br><a href="mailto:${esc(CONTENT.email)}">${esc(CONTENT.email)}</a>`:''}</div><div class="socials">${CONTENT.linkedin?`<a href="${esc(CONTENT.linkedin)}" aria-label="LinkedIn" target="_blank" rel="noopener">${icon('linkedin')}</a>`:''}<a href="${esc(CONTENT.github)}" aria-label="GitHub" target="_blank" rel="noopener">${icon('github')}</a><div class="wechat"><button id="wechat-toggle" aria-label="WeChat" aria-controls="wechat-info" aria-expanded="false">${icon('wechat')}</button><div class="popover" id="wechat-info"><strong>WeChat</strong><br>${CONTENT.wechat?`${esc(CONTENT.wechat)} <button class="copy" data-copy="wechat">${label('Copy','复制')}</button>`:label('ID to be confirmed','微信号待确认')}</div></div></div><nav class="section-nav" aria-label="Overview sections">${[['about','About me','关于我'],['education','Education','教育经历'],['internships','Internship experience','实习经历'],['selected','Selected projects','精选项目']].map(([id,en,zh])=>`<a href="#overview/${id}">${label(en,zh)}</a>`).join('')}</nav>`;
document.querySelector('#wechat-toggle').addEventListener('click',e=>{const open=e.currentTarget.parentElement.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open));});}
function progress(){const now=new Date();const day=Date.UTC(now.getFullYear(),now.getMonth(),now.getDate());return Math.max(0,Math.min(100,100*(day-Date.UTC(2025,6,1))/(Date.UTC(2027,0,1)-Date.UTC(2025,6,1))));}
function education(){const pct=progress().toFixed(1);return `<section id="education"><h2>${label('Education','教育经历')}</h2><div class="degree"><div class="row"><h3>${bilingual('Columbia University','哥伦比亚大学')}</h3><span class="meta">${label('New York, United States','纽约，美国')}</span></div><div class="degree-title">${bilingual('Master of Science in Computer Engineering','计算机工程理学硕士')}</div><div class="progress-labels"><span>${label('Jul 2025','2025年7月')}</span><span>${label('Dec 2026 · Expected','2026年12月 · 预计毕业')}</span></div><div class="track" role="progressbar" aria-label="${label('Master’s program timeline','硕士学习时间进度')}" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div id="ms-fill" class="fill" style="width:${pct}%"></div></div><div class="progress-labels"><span>${label('Program timeline','学习时间进度')}</span><span id="ms-pct">${pct}%</span></div></div><div class="degree"><div class="row"><h3>${bilingual('The University of Melbourne','墨尔本大学')}</h3><span class="meta">${label('Melbourne, Australia','墨尔本，澳大利亚')}</span></div><div class="degree-title">${bilingual('Bachelor of Science','理学学士')}<br>${bilingual('Major in Computing and Software Systems','计算与软件系统专业')}</div><div class="progress-labels"><span>${label('Feb 2022','2022年2月')}</span><span>${label('Dec 2024','2024年12月')}</span></div><div class="track" role="progressbar" aria-label="${label('Bachelor’s program timeline','本科学习时间进度')}" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"><div class="fill" style="width:100%;background:#a9bcc8"></div></div><div class="progress-labels"><span>${label('Completed','已完成')}</span><span>100%</span></div></div></section>`;}
function entry(p, description=p.summary){return `<article class="entry"><div class="row"><h3><a href="#project/${esc(p.id)}">${esc(t(p.name))}</a></h3><span class="meta">${esc(t(p.date))}</span></div><div class="meta">${esc(t(places[p.region]))} · ${esc(t(types[p.type]))}</div><p>${esc(t(description))}</p><div class="tech">${esc(p.tech)}</div><a class="entry-link" href="#project/${esc(p.id)}">${label('Project overview','项目详情')}</a></article>`;}
function overview(){return `<section id="about" class="intro"><h2>${label('About me','关于我')}</h2><p>${label("I am a master's student in Computer Engineering at Columbia University. My interests include AI applications, full-stack software development, and data systems.",'我目前在 Columbia University（哥伦比亚大学）攻读 Computer Engineering（计算机工程）硕士，关注 AI 应用、全栈软件开发与数据系统。')}</p><p>${label('Before Columbia, I studied Computing and Software Systems at the University of Melbourne. My experience spans university projects and internships across China, Australia, and the United States.','此前，我在 The University of Melbourne（墨尔本大学）学习 Computing and Software Systems（计算与软件系统）。我的经历涵盖大学项目与实习，学习和工作足迹跨越中国、澳大利亚与美国。')}</p><p>${label('Here I share the projects I have worked on, my contributions, and what I learned along the way.','这里记录我参与的项目、具体贡献，以及一路积累的思考与经验。')}</p></section>${education()}<section id="internships"><h2>${label('Internship experience','实习经历')}</h2>${CONTENT.internships.map(i=>`<article class="entry"><div class="row"><h3>${esc(t(i.company))}</h3><span class="meta">${esc(t(i.date))}</span></div><div class="role">${esc(t(i.role))}</div><div class="meta">${esc(t(i.place))}</div><p>${esc(t(i.body))}</p></article>`).join('')||`<p class="meta">${label('Details being prepared.','详细内容正在整理。')}</p>`}</section><section id="selected"><div class="row"><h2>${label('Selected projects','精选项目')}</h2><a class="entry-link" href="#projects">${label('View all projects','查看所有项目')}</a></div>${CONTENT.selected.map(s=>{const p=CONTENT.projects.find(p=>p.id===s.id);return entry(p,s.description||p.summary)}).join('')}</section>`;}
function projects(){const options=(values,current)=>`<option value="all">${label('All','全部')}</option>`+Object.entries(values).map(([k,v])=>`<option value="${k}" ${current===k?'selected':''}>${esc(t(v))}</option>`).join('');return `<section><h2>${label('Projects','项目作品')}</h2><p class="page-intro">${label('Explore projects by location, context, or technology.','按地点、项目类型或技术关键词浏览项目。')}</p><div class="search-field"><label for="project-search">${label('Search projects','搜索项目')}</label><input id="project-search" type="search" value="${esc(filters.query)}" placeholder="${label('Name, technology, or keyword…','名称、技术栈或关键词…')}" autocomplete="off"></div><div class="filters"><label>${label('Location','地点')}<select id="region">${options(places,filters.region)}</select></label><label>${label('Project type','项目类型')}<select id="type">${options(types,filters.type)}</select></label></div><div class="filter-status"><div id="result-count" class="results" role="status" aria-live="polite"></div><button id="reset-filters">${label('Clear filters','清除筛选')}</button></div><div id="project-results"></div></section>`;}
function matches(p){const tokens=filters.query.normalize('NFKC').toLowerCase().trim().split(/\s+/).filter(Boolean);const processText=(p.process?.stages||[]).flatMap(stage=>[...stage.label,...stage.title,...stage.body,...(stage.contribution||[]),...(stage.findings||[]).flat()]);const text=[...p.name,...p.summary,...(p.keywords||[]),p.tech,...(p.background||[]),...(p.work||[]).flat(),...processText,...places[p.region],...types[p.type],...p.date].join(' ').normalize('NFKC').toLowerCase();return (filters.region==='all'||filters.region===p.region)&&(filters.type==='all'||filters.type===p.type)&&tokens.every(token=>text.includes(token));}
function updateResults(){const found=CONTENT.projects.filter(matches);document.querySelector('#result-count').textContent=t([`${found.length} of ${CONTENT.projects.length} projects`,`${found.length} / ${CONTENT.projects.length} 个项目`]);document.querySelector('#project-results').innerHTML=found.map(p=>entry(p)).join('')||`<p class="empty">${label('No matching projects. Try another keyword or clear the filters.','没有匹配的项目，请更换关键词或清除筛选。')}</p>`;}
function journey(p){if(!p.journey?.length)return '';return `<section class="detail-section project-journey"><h3>${label('Highlights & development','成果与实现')}</h3>${p.journey.map(item=>`<article class="journey-entry"><h4>${esc(t(item.title))}</h4><p>${esc(t(item.body))}</p></article>`).join('')}</section>`;}
function members(p){if(!p.members?.length)return '';return `<section class="detail-section project-members"><h3>${label('Members','项目成员')}</h3><ul class="project-members-list">${p.members.map(member=>`<li>${member.url?`<a href="${esc(member.url)}" target="_blank" rel="noopener">${esc(t(member.name))}</a>`:esc(t(member.name))}</li>`).join('')}</ul></section>`;}
function architecture(p){if(!p.architecture?.length)return '';return `<section class="detail-section project-architecture"><h3>${label('Architecture','系统架构')}</h3><ol class="architecture-flow">${p.architecture.map(item=>`<li><h4>${esc(t(item.title))}</h4><p>${esc(t(item.body))}</p></li>`).join('')}</ol></section>`;}
function gallery(p,group){const items=(p.gallery||[]).filter(item=>item.group===group);if(!items.length)return '';const titles={product:['Project in action','作品展示'],engineering:['Design & delivery','设计与交付'],team:['Team & moments','团队与记录']};return `<section class="detail-section project-gallery"><h3>${esc(t(titles[group]))}</h3><div class="gallery-grid gallery-${group}">${items.map(item=>`<figure><a href="${esc(item.src)}" data-gallery-preview aria-haspopup="dialog" aria-label="${label('Open larger image: ','查看大图：')}${esc(t(item.alt))}"><img src="${esc(item.thumbnail)}" srcset="${esc(item.thumbnail)} ${item.thumbnailWidth}w, ${esc(item.src)} ${item.width}w" sizes="${group==='team'?'(max-width: 640px) calc(100vw - 44px), (max-width: 900px) 40vw, 360px':'(max-width: 640px) calc(100vw - 44px), (max-width: 900px) 65vw, 800px'}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async" alt="${esc(t(item.alt))}"></a><figcaption>${esc(t(item.caption))}</figcaption></figure>`).join('')}</div></section>`;}
function demoVideo(value){const d=value?.demo||value;if(!d?.src)return '';return `<figure class="project-demo"><video controls playsinline preload="none" poster="${esc(d.poster)}" width="${d.width}" height="${d.height}" aria-label="${esc(t(d.caption))}"><source src="${esc(d.src)}" type="video/mp4"><a href="${esc(d.src)}">${label('Watch the demo','观看演示')}</a></video><button type="button" class="video-enlarge" data-video-preview aria-haspopup="dialog"><span aria-hidden="true">⛶</span> ${label('Enlarge video','放大观看')}</button><figcaption>${esc(t(d.caption))}</figcaption></figure>`;}
function processMedia(item){return `<figure><a href="${esc(item.src)}" data-gallery-preview aria-haspopup="dialog" aria-label="${label('Open larger image: ','查看大图：')}${esc(t(item.alt))}"><img src="${esc(item.thumbnail)}" srcset="${esc(item.thumbnail)} ${item.thumbnailWidth}w, ${esc(item.src)} ${item.width}w" sizes="(max-width: 640px) calc(100vw - 44px), (max-width: 900px) 65vw, 800px" width="${item.width}" height="${item.height}" loading="lazy" decoding="async" alt="${esc(t(item.alt))}"></a><figcaption>${esc(t(item.caption))}</figcaption></figure>`;}
function projectProcess(p){if(!p.process?.stages?.length)return '';return `<section class="project-process"><div class="process-header"><p class="process-kicker">${label('Design process','设计过程')}</p><h3>${esc(t(p.process.heading))}</h3><p>${esc(t(p.process.intro))}</p></div><div class="process-stages">${p.process.stages.map((stage,index)=>`<article class="process-stage" id="process-${esc(stage.id)}"><div class="process-stage-marker" aria-hidden="true"><span>${String(index+1).padStart(2,'0')}</span></div><div class="process-stage-content"><p class="process-stage-label">${esc(t(stage.label))}</p><h4>${esc(t(stage.title))}</h4><p>${esc(t(stage.body))}</p>${stage.contribution?`<p class="process-contribution"><strong>${label('My contribution','我的贡献')}</strong><span>${esc(t(stage.contribution))}</span></p>`:''}${stage.findings?.length?`<ul class="process-findings">${stage.findings.map(finding=>`<li>${esc(t(finding))}</li>`).join('')}</ul>`:''}${stage.gallery?.length?`<div class="process-gallery">${stage.gallery.map(processMedia).join('')}</div>`:''}${demoVideo(stage.demo)}</div></article>`).join('')}</div></section>`;}
function detail(id){const p=CONTENT.projects.find(x=>x.id===id);if(!p)return `<h2>${label('Project not found','未找到项目')}</h2><a href="#projects">${label('Back to projects','返回项目列表')}</a>`;const legacy=p.process?'':`${p.work.length?`<div class="detail-section"><h3>${label('Work & contribution','工作与贡献')}</h3><ul>${p.work.map(w=>`<li>${esc(t(w))}</li>`).join('')}</ul></div>`:''}${gallery(p,'product')}${demoVideo(p)}${journey(p)}${architecture(p)}${gallery(p,'engineering')}${gallery(p,'team')}`;return `<a class="back" href="#projects"><svg aria-hidden="true" viewBox="0 0 24 24" focusable="false"><path d="M19 12H5m7-7-7 7 7 7"/></svg>${label('Back to all projects','返回所有项目')}</a><div class="detail-title-row"><h2 class="detail-heading">${esc(t(p.name))}</h2>${p.logo?`<img class="project-logo" src="${esc(p.logo.src)}" width="${p.logo.width}" height="${p.logo.height}" alt="${esc(t(p.logo.alt))}" decoding="async">`:''}</div><div class="detail-meta">${esc(t(p.date))}<br>${esc(t(places[p.region]))} · ${esc(t(types[p.type]))}<br>${esc(p.tech)}</div><p>${esc(t(p.summary))}</p><div class="detail-section"><h3>${label('Background','项目背景')}</h3><p>${esc(t(p.background))}</p>${p.backgroundLink?`<a class="background-link" href="${esc(p.backgroundLink.url)}" target="_blank" rel="noopener">${esc(t(p.backgroundLink.label))}<span aria-hidden="true"> ↗</span></a>`:''}</div>${members(p)}${projectProcess(p)}${legacy}${p.links?.length?`<div class="detail-section"><h3>${label('Resources','项目资源')}</h3>${p.links.map(link=>`<a href="${esc(link.url)}" target="_blank" rel="noopener">${esc(t(link.label))}</a>`).join(' · ')}</div>`:''}${p.boundary?`<div class="detail-section"><h3>${label('Scope','展示范围')}</h3><p>${esc(t(p.boundary))}</p></div>`:''}`;}
function contact(){const items=[['Email',CONTENT.email,CONTENT.email?'mailto:'+CONTENT.email:''],['LinkedIn',CONTENT.linkedin,CONTENT.linkedin],['GitHub',CONTENT.github,CONTENT.github],['WeChat',CONTENT.wechat,'']];return `<section><h2>${label('Contact','联系我')}</h2><p>${label('Feel free to get in touch about software engineering, AI applications, or opportunities to collaborate.','欢迎就软件工程、AI 应用或合作机会与我联系。')}</p><div class="contact-list">${items.map(([name,value,url])=>`<div class="contact-item"><strong>${name}</strong><div>${value?(url?`<a href="${esc(url)}">${esc(value.replace('https://www.','').replace('https://',''))}</a>`:`${esc(value)}<button class="copy" data-copy="wechat">${label('Copy','复制')}</button>`):label('To be added','待补充')}</div></div>`).join('')}</div></section>`;}
function render(){const {page,id}=route();document.documentElement.lang=language;document.title=`${page==='project'?t(CONTENT.projects.find(p=>p.id===id)?.name||['Project','项目']):t({overview:['Overview','个人概览'],projects:['Projects','项目作品'],contact:['Contact','联系我']}[page])} | Hao Chen`;document.querySelector('#topnav').innerHTML=[['overview','Overview','个人概览'],['projects','Projects','项目作品'],['contact','Contact','联系我']].map(([key,en,zh])=>`<a href="#${key}" ${page===key||(key==='projects'&&page==='project')?'aria-current="page"':''}>${label(en,zh)}</a>`).join('');document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===language)));document.querySelector('.skip').textContent=t(['Skip to content','跳至正文']);profile();document.querySelector('#main').innerHTML=page==='projects'?projects():page==='project'?detail(id):page==='contact'?contact():overview();document.querySelector('#footer').textContent=t(['Hao Chen · Personal website preview','Hao Chen · 个人网站预览']);if(page==='projects'){updateResults();document.querySelector('#project-search').addEventListener('input',e=>{filters.query=e.target.value;updateResults()});for(const key of ['region','type'])document.querySelector('#'+key).addEventListener('change',e=>{filters[key]=e.target.value;updateResults()});document.querySelector('#reset-filters').addEventListener('click',()=>{Object.assign(filters,{query:'',region:'all',type:'all'});render();document.querySelector('#project-search').focus()});}if(page==='overview'&&id)requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView());}
document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{language=b.dataset.lang;try{localStorage.setItem('hao-language',language)}catch{}render()}));
document.addEventListener('click',async e=>{const copy=e.target.closest('[data-copy]');if(copy&&CONTENT.wechat){try{await navigator.clipboard.writeText(CONTENT.wechat);copy.textContent=t(['Copied','已复制'])}catch{copy.textContent=t(['Select and copy the ID','请选中微信号复制'])}}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const wc=document.querySelector('.wechat');wc?.classList.remove('open');document.querySelector('#wechat-toggle')?.setAttribute('aria-expanded','false');if(wc?.contains(document.activeElement))document.activeElement.blur()}});
document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();document.querySelector('#main').focus();document.querySelector('#main').scrollIntoView()});
window.addEventListener('hashchange',()=>{render();if(!route().id||route().page!=='overview')window.scrollTo(0,0)});
setInterval(()=>{const bar=document.querySelector('#ms-fill');if(bar){const pct=progress().toFixed(1);bar.style.width=pct+'%';bar.parentElement.setAttribute('aria-valuenow',pct);document.querySelector('#ms-pct').textContent=pct+'%'}},60000);
// Keep source order while allowing the next photo to occupy the shorter column.
function galleryRowSpan(height,gap){return Math.ceil((height+gap)/(1+gap));}
let galleryResizeObserver;
function layoutGalleries(){
  galleryResizeObserver?.disconnect();
  const grids=document.querySelectorAll('.gallery-team');
  const update=()=>{
    grids.forEach(grid=>{
      const gap=parseFloat(getComputedStyle(grid).rowGap)||24;
      grid.classList.add('masonry-ready');
      grid.querySelectorAll('figure').forEach(figure=>{
        figure.style.gridRowEnd='span '+galleryRowSpan(figure.getBoundingClientRect().height,gap);
      });
    });
  };
  update();
  if(typeof ResizeObserver!=='undefined'){
    galleryResizeObserver=new ResizeObserver(update);
    grids.forEach(grid=>{galleryResizeObserver.observe(grid);grid.querySelectorAll('figure').forEach(f=>galleryResizeObserver.observe(f));});
  }
}
function openGalleryPreview(link){
  const photo=link.querySelector('img');
  const caption=link.closest('figure').querySelector('figcaption')?.textContent||photo.alt;
  const dialog=document.createElement('dialog');
  dialog.className='photo-preview';
  dialog.setAttribute('aria-label',t(['Image preview','图片预览']));
  dialog.innerHTML=`<button type="button" class="photo-preview-close" autofocus aria-label="${label('Close preview','关闭预览')}">×</button><figure><img src="${esc(link.getAttribute('href'))}" alt="${esc(photo.alt)}"><figcaption>${esc(caption)}</figcaption></figure>`;
  const previousOverflow=document.documentElement.style.overflow;
  const close=()=>dialog.close();
  dialog.querySelector('button').addEventListener('click',close);
  dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
  dialog.addEventListener('close',()=>{
    document.documentElement.style.overflow=previousOverflow;
    dialog.remove();
    window.removeEventListener('hashchange',close);
    if(link.isConnected)link.focus({preventScroll:true});
  },{once:true});
  document.body.append(dialog);
  dialog.showModal();
  document.documentElement.style.overflow='hidden';
  window.addEventListener('hashchange',close);
}
function openVideoPreview(button){
  const figure=button.closest('.project-demo');
  const original=figure.querySelector('video');
  const startTime=original.currentTime;
  const wasPlaying=!original.paused&&!original.ended;
  original.pause();
  const dialog=document.createElement('dialog');
  dialog.className='photo-preview video-preview';
  dialog.setAttribute('aria-label',t(['Video preview','视频预览']));
  dialog.innerHTML=`<button type="button" class="photo-preview-close" autofocus aria-label="${label('Close preview','关闭预览')}">×</button><figure></figure>`;
  const player=original.cloneNode(true);
  player.removeAttribute('autoplay');
  player.preload='auto';
  player.volume=original.volume;
  player.muted=original.muted;
  player.playbackRate=original.playbackRate;
  const caption=document.createElement('figcaption');
  caption.textContent=figure.querySelector('figcaption').textContent;
  const enlargedFigure=dialog.querySelector('figure');
  enlargedFigure.append(player,caption);
  player.addEventListener('loadedmetadata',()=>{
    if(!dialog.open)return;
    player.currentTime=startTime;
    if(wasPlaying)player.play().catch(()=>{});
  },{once:true});
  const overflow=document.documentElement.style.overflow;
  const close=()=>dialog.close();
  dialog.querySelector('button').addEventListener('click',close);
  dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
  dialog.addEventListener('close',()=>{
    const resume=player.readyState>0?!player.paused&&!player.ended:wasPlaying;
    const time=player.readyState>0?player.currentTime:startTime;
    player.pause();
    if(original.isConnected){
      if(original.readyState>0)original.currentTime=time;
      else original.addEventListener('loadedmetadata',()=>{original.currentTime=time;},{once:true});
      original.volume=player.volume;
      original.muted=player.muted;
      original.playbackRate=player.playbackRate;
      if(resume)original.play().catch(()=>{});
    }
    dialog.remove();
    document.documentElement.style.overflow=overflow;
    window.removeEventListener('hashchange',close);
    if(button.isConnected)button.focus({preventScroll:true});
  },{once:true});
  document.body.append(dialog);
  dialog.showModal();
  document.documentElement.style.overflow='hidden';
  window.addEventListener('hashchange',close);
}
document.addEventListener('click',event=>{
  const videoButton=event.target.closest('[data-video-preview]');
  if(videoButton){openVideoPreview(videoButton);return;}
  const link=event.target.closest('[data-gallery-preview]');
  if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();
  openGalleryPreview(link);
});
// Observe only route content replacement; gallery sizing does not modify children.
if(typeof MutationObserver!=='undefined'){
  new MutationObserver(layoutGalleries).observe(document.querySelector('#main'),{childList:true});
}
render();
