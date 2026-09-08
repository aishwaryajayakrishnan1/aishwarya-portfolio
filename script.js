const stepData=[
  ['01 / UNDERSTAND','Why are we doing this? What does success look like—and what constraint could quietly reshape the whole project?'],
  ['02 / STRUCTURE','Break the work into outcomes, owners, decisions and dependencies. Give the team a path without over-engineering it.'],
  ['03 / ALIGN','Translate expectations into a shared brief. Confirm who decides, who contributes and where feedback belongs.'],
  ['04 / MOVE','Keep progress visible, surface blockers early and adapt the plan when reality changes—because it always does.'],
  ['05 / LEARN','Deliver with care, document what matters and turn each project’s friction into a better system for the next one.']
];
document.querySelectorAll('.step').forEach((button,i)=>button.addEventListener('click',()=>{
  document.querySelectorAll('.step').forEach(b=>b.classList.remove('active'));button.classList.add('active');
  document.querySelector('#step-number').textContent=stepData[i][0];document.querySelector('#step-copy').textContent=stepData[i][1];
}));

const simData={
  brief:['Run a 20-minute clarity session','Objective, audience, deliverables, constraints','Hidden assumptions becoming late rework'],
  feedback:['Create one feedback owner and checkpoint','Decision log, priority changes, next action','Conflicting opinions turning into endless versions'],
  deadline:['Re-scope around the must-win outcome','Critical path, owners, trade-offs, check-ins','Urgency quietly reducing quality everywhere'],
  quality:['Define the acceptance checklist before review','Quality bar, review stages, final approver','Subjective “make it better” loops without closure']
};
document.querySelectorAll('.choice').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.choice').forEach(b=>b.classList.remove('active'));button.classList.add('active');
  const [move,visible,risk]=simData[button.dataset.sim];
  document.querySelector('#sim-move').textContent=move;document.querySelector('#sim-visible').textContent=visible;document.querySelector('#sim-risk').textContent=risk;
}));

const caseData={
  'case-1':{label:'CONFIDENTIAL / CREATIVE DELIVERY',title:'From an open brief to a shared direction.',intro:'A professional GenAI creative workstream focused on translating requirements into a visual story the team could build and refine together.',blocks:[['THE CHALLENGE','Creative requirements can sound clear in conversation but become ambiguous during production. The work needed a shared visual direction and an efficient feedback rhythm.'],['MY ROLE','Requirement interpretation, storyboarding, GenAI exploration, stakeholder communication and iterative creative refinement.'],['THE SYSTEM','Brief → questions → storyboard → visual routes → review checkpoint → refinement → quality check → delivery.'],['THE LEARNING','A better prompt cannot rescue an unclear objective. Alignment before production is one of the most valuable forms of project acceleration.']]},
  'case-2':{label:'CONFIDENTIAL / CROSS-FUNCTIONAL',title:'Making global creative work move as one.',intro:'A multi-stakeholder marketing initiative where coordination mattered as much as the creative output.',blocks:[['THE CHALLENGE','Several contributors, dependencies and perspectives had to converge without losing the original objective or slowing delivery.'],['MY ROLE','Supported planning, clarified requirements, connected creative and business stakeholders, tracked progress and helped resolve execution questions.'],['THE SYSTEM','Shared scope → visible ownership → milestone check-ins → consolidated feedback → final review.'],['THE LEARNING','People move faster when they know what is expected, why it matters and where their decision fits in the larger delivery.']]},
  'case-3':{label:'CONFIDENTIAL / PROCESS IMPROVEMENT',title:'Finding the system inside the process.',intro:'An exploration of how automation and GenAI could reduce friction in a creative workflow while keeping people and quality at the centre.',blocks:[['THE CHALLENGE','Repetitive work and unclear handoffs created opportunities for improvement, but automation needed to serve the process—not become another layer of complexity.'],['MY ROLE','Helped understand the current workflow, identify pain points, explore GenAI opportunities and coordinate inputs across business, creative and technology perspectives.'],['THE SYSTEM','Current state → pain points → opportunity areas → feasibility discussion → stakeholder alignment → practical next steps.'],['THE LEARNING','The best automation starts with listening. A technically possible solution is only useful when it fits how people actually work.']]}
};
const dialog=document.querySelector('#case-dialog');
document.querySelectorAll('.case-open').forEach(button=>button.addEventListener('click',()=>{
  const data=caseData[button.dataset.case];document.querySelector('#dialog-label').textContent=data.label;document.querySelector('#dialog-title').textContent=data.title;document.querySelector('#dialog-intro').textContent=data.intro;
  document.querySelector('#dialog-grid').innerHTML=data.blocks.map(([name,copy])=>`<div><span>${name}</span><p>${copy}</p></div>`).join('');dialog.showModal();button.setAttribute('aria-expanded','true');dialog.dataset.trigger=button.dataset.case;
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>{document.querySelector(`[data-case="${dialog.dataset.trigger}"]`)?.setAttribute('aria-expanded','false')});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const focusLabels=['Find the real objective','Turn ambiguity into a path','Make ownership visible','Track, unblock, adapt','Deliver, reflect, improve'];
document.querySelectorAll('.step').forEach((el,i)=>el.addEventListener('click',()=>{const clarity=Math.min(98,34+i*16);document.querySelector('#console-focus').textContent=focusLabels[i];document.querySelector('#clarity-value').textContent=clarity+'%';document.querySelector('#clarity-fill').style.width=clarity+'%';document.querySelector('.core-index').textContent=String(i+1).padStart(2,'0')}));

document.querySelectorAll('[data-flip-card]').forEach(card=>card.querySelectorAll('.flip-trigger').forEach(button=>button.addEventListener('click',()=>{const flipped=card.classList.toggle('is-flipped');card.querySelectorAll('.flip-trigger').forEach(trigger=>trigger.setAttribute('aria-expanded',String(flipped)))})));

const galleryGrid=document.querySelector('#gallery-grid');
const placeholderItems=[
  {title:'Your hero campaign',category:'campaign',label:'CAMPAIGN / 01'},
  {title:'Your best storyboard',category:'storyboard',label:'STORYBOARD / 02'},
  {title:'Your AI experiment',category:'experiment',label:'EXPERIMENT / 03'}
];
const galleryItems=window.galleryItems?.length?window.galleryItems:placeholderItems;
function renderGallery(filter='all'){
  const items=galleryItems.filter(item=>filter==='all'||item.category===filter);
  galleryGrid.innerHTML=items.map((item,index)=>`${item.href?`<a class="gallery-card-link" href="${item.href}" aria-label="Open ${item.title} project">`:''}<article class="gallery-item ${item.src?'has-asset':'is-placeholder'} reveal visible">
    <div class="gallery-media">${item.type==='video'?`<video src="${item.src}" muted loop playsinline controls aria-label="${item.alt||item.title}"></video>`:item.src?`<img src="${item.src}" alt="${item.alt||item.title}" loading="lazy">`:`<div class="upload-placeholder"><span>+</span><small>ADD ASSET ${String(index+1).padStart(2,'0')}</small></div>`}</div>
    <div class="gallery-meta"><span>${item.label||item.category}</span><h3>${item.title}</h3><p>${item.description||'Add a short note about the brief, your role and the creative decision behind this piece.'}</p>${item.href?`<span class="gallery-open">Open full project <b>↗</b></span>`:''}</div>
  </article>${item.href?'</a>':''}`).join('');
  document.querySelector('#gallery-count').textContent=window.galleryItems?.length?`${items.length} SELECTED PIECE${items.length===1?'':'S'}`:'READY FOR YOUR WORK';
}
renderGallery();
document.querySelectorAll('.gallery-filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.gallery-filter').forEach(b=>b.classList.remove('active'));button.classList.add('active');renderGallery(button.dataset.filter)}));
