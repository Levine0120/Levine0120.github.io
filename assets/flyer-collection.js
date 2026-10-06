const printCollections={
  jingzhen:{title:'京圳画册',eyebrow:'PRINT DESIGN / JINGZHEN',description:'画册与封面方案',footer:'京圳画册',items:[
    {slug:'book',title:'京圳画册 · 完整跨页',pages:19,ratio:2383/1645,base:'assets/jingzhen-book/',digits:2},
    {slug:'covers',title:'封面方案',pages:3,ratio:1192/1645,base:'assets/jingzhen-covers/',digits:1}
  ]},
  ipanel:{title:'茁壮网络 · 平面设计',eyebrow:'PRINT DESIGN / IPANEL',description:'选择一组，查看完整设计',footer:'茁壮网络 · 平面设计',items:[
    {slug:'dragon-boat',title:'端午节贺卡',pages:2,ratio:2,cover:'assets/ipanel-card/page-01.jpg',sources:['assets/ipanel-card/page-01.jpg','assets/ipanel-card/page-02.jpg'],base:'assets/ipanel-card/',digits:2},
    {slug:'invitation',title:'CCBN 2017 邀请函',pages:2,ratio:3125/5558,cover:'assets/ipanel-invitation/page-1.jpg',sources:['assets/ipanel-invitation/page-1.jpg','assets/ipanel-invitation/page-2.jpg'],base:'assets/ipanel-invitation/',digits:1}
  ]},
  hangtong:{title:'航通 · 平面设计',eyebrow:'PRINT DESIGN / CASTEL',description:'选择一组，查看完整设计',footer:'航通 · 平面设计',items:[
    {slug:'english',title:'英文海报',pages:4,ratio:4158/2953,cover:'assets/hangtong-english/page-1.jpg',sources:['assets/hangtong-english/page-1.jpg','assets/hangtong-english/page-2.jpg','assets/hangtong-english/page-3.jpg','assets/hangtong-english/page-4.jpg'],base:'assets/hangtong-english/',digits:1},
    {slug:'chinese',title:'中文海报',pages:14,ratio:2079/2953,ratios:[2079/2953,2079/2953,2079/2953,2079/2953,2079/2953,2079/2953,1.5,1.5,2079/2953,2079/2953,2079/2953,2079/2953,2079/2953,2480/3508],cover:'assets/hangtong-chinese/page-1.jpg',sources:['assets/hangtong-chinese/page-1.jpg','assets/hangtong-chinese/page-2.jpg','assets/hangtong-chinese/page-3.jpg','assets/hangtong-chinese/page-4.jpg','assets/hangtong-chinese/page-5.jpg','assets/hangtong-chinese/page-6.jpg','assets/hangtong-chinese/page-7.jpg','assets/hangtong-chinese/page-8.jpg','assets/hangtong-chinese/page-9.jpg','assets/hangtong-chinese/page-10.jpg','assets/hangtong-chinese/page-11.jpg','assets/hangtong-chinese/page-12.jpg','assets/hangtong-chinese/page-13.jpg','assets/hangtong-chinese/page-14.jpg'],base:'assets/hangtong-chinese/',digits:1},
    {slug:'promotion',title:'促销传单',pages:1,ratio:2461/3490,cover:'assets/hangtong-promotion/page-1.jpg',sources:['assets/hangtong-promotion/page-1.jpg'],base:'assets/hangtong-promotion/',digits:1},
    {slug:'silicone',title:'产品设计',pages:2,ratio:1672/2408,ratios:[1672/2408,12742/6161],cover:'assets/hangtong-silicone/page-1.jpg',sources:['assets/hangtong-silicone/page-1.jpg','assets/hangtong-silicone/page-2.jpg'],base:'assets/hangtong-silicone/',digits:1}
  ]},
  exhibition:{title:'展板设计',eyebrow:'PRINT DESIGN / EXHIBITION',description:'选择一组，查看展板与展示效果',footer:'中建科工 · 展板设计',items:[
    {slug:'overview',title:'企业介绍展板',pages:2,ratio:6000/821,ratios:[6000/821,3728/732],sources:['assets/exhibition-pages/page-1.jpg','assets/exhibition-pages/overview-render.webp'],base:'assets/exhibition-pages/',digits:1},
    {slug:'exhibition',title:'展板与展陈效果',pages:6,ratio:9356/2552,ratios:[9356/2552,5954/2552,2200/1241,2200/1241,2200/1241,2200/1241],base:'assets/exhibition-pages/',digits:1,startPage:2},
    {slug:'foldout',title:'智能制造折页 · 2020 简版',pages:7,ratio:595.44/841.92,base:'assets/foldout-pages/',digits:1}
  ]},
  brochures:{title:'智能制造产品集',eyebrow:'PRINT DESIGN / CORPORATE BROCHURE',description:'选择一个版本，翻阅完整画册',footer:'中建钢构 · 智能制造产品集',items:[
    {slug:'2022',title:'2022 版 · 智能制造产品集',pages:16,ratio:1729.13/651.968,base:'assets/brochure-pages/',digits:2},
    {slug:'2024',title:'2024 版 · 智能制造产品集',pages:25,ratio:1700.88/637.92,base:'assets/brochure-2024-pages/',digits:2}
  ]},
  flyers:{title:'产品彩页',eyebrow:'PRINT DESIGN / PRODUCT SHEETS',description:'选择一份彩页，查看完整设计',folder:'flyer-pages',footer:'中建钢构 · 产品彩页',items:[
    {slug:'high-power',title:'高功率激光除锈机',pages:4,ratio:1190.55/807.874},
    {slug:'portable',title:'便携式激光除锈机',pages:2,ratio:1190.55/807.874},
    {slug:'manufacturing',title:'生产制造系统',pages:6,ratio:1190.55/807.874},
    {slug:'flexible',title:'现场柔性焊接机器人',pages:4,ratio:1190.55/807.874},
    {slug:'bevel',title:'智能坡口切口单元',pages:4,ratio:1190.55/807.874},
    {slug:'assembly',title:'总成焊接机器人',pages:4,ratio:1190.55/807.874},
    {slug:'collaborative',title:'协作焊接机器人',pages:4,ratio:1190.55/807.874},
    {id:'print-parts',slug:'parts',folder:'print-pages',title:'智能部件焊接单元 · 印刷版',pages:4,ratio:1256.55/873.874},
    {id:'print-bevel',slug:'bevel',folder:'print-pages',title:'智能坡口切口单元 · 印刷版',pages:4,ratio:1256.55/873.874},
    {id:'print-assembly',slug:'assembly',folder:'print-pages',title:'总成焊接机器人 · 印刷版',pages:4,ratio:1256.55/873.874},
    {id:'print-laser',slug:'laser',folder:'print-pages',title:'3KW连续激光除锈机 · 印刷版',pages:4,ratio:1241.76/859.2}
  ]},
  magazines:{title:'《钢构人》期刊',eyebrow:'PRINT DESIGN / STEEL STRUCTURE MAN',description:'选择一期，翻阅完整期刊',folder:'magazine-pages',footer:'《钢构人》· 期刊设计',items:[
    {slug:'issue-204',title:'2025 年 2 月刊 · 第 204 期',pages:38,ratio:1.4788,ratios:[1.4788,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615,1.4615],digits:2},
    {slug:'issue-210',title:'2025 年 8 月刊 · 第 210 期',pages:87,ratio:0.7308,ratios:[0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308],digits:2},
    {slug:'issue-143',title:'2020 年 1 月刊 · 总第 143 期',pages:33,ratio:0.7368,ratios:[0.7368,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,1.4737,0.7368],digits:2},
    {slug:'issue-212',title:'2025 年 10 月刊 · 第 212 期',pages:69,ratio:0.7308,ratios:[0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308,0.7308],digits:2}
  ]},
  standards:{title:'设计规范',eyebrow:'PRINT DESIGN / DESIGN GUIDELINES',description:'选择一份规范，查看完整设计',folder:'standards-pages',footer:'中建钢构 · 设计规范',items:[
    {slug:'ppt',title:'智能制造研究院 PPT 制作规范',pages:83,ratio:1.7778,ratios:[1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778],digits:2},
    {slug:'pc',title:'PC 端中后台界面规范',pages:21,ratio:1.7778,ratios:[1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778],digits:2},
    {slug:'mobile',title:'移动端 App 设计规范',pages:17,ratio:1.7778,ratios:[1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778,1.7778],digits:2}
  ]}
};
const flyerCollection=document.querySelector('#flyer-collection');
const flyerGrid=document.querySelector('#flyer-collection-grid');
let collectionTrigger=null,currentCollection='flyers';
const collectionLastItem={};
function renderCollection(){
  const group=printCollections[currentCollection];
  flyerCollection.setAttribute('aria-label',`${group.title}目录`);
  document.querySelector('#flyer-collection-eyebrow').textContent=group.eyebrow;
  document.querySelector('#flyer-collection-title').textContent=group.title;
  document.querySelector('#flyer-collection-description').textContent=group.description;
  flyerGrid.replaceChildren();
  flyerGrid.classList.toggle('is-brochures',currentCollection==='brochures'||currentCollection==='exhibition'||currentCollection==='hangtong'||currentCollection==='ipanel'||currentCollection==='jingzhen');
  flyerGrid.classList.toggle('is-magazines',currentCollection==='magazines');
  flyerGrid.classList.toggle('is-standards',currentCollection==='standards');
  group.items.forEach((item,index)=>{
    const button=document.createElement('button');
    button.type='button';button.className='flyer-item';
    button.dataset.slug=item.id||item.slug;
    button.setAttribute('aria-label',`预览${item.title}，${item.pages}页`);
    const pageBase=item.base||`assets/${item.folder||group.folder}/${item.slug}/`;
    button.innerHTML=`<img src="${item.cover||`${pageBase}page-${String(item.startPage||1).padStart(item.digits||1,'0')}.jpg`}" alt="" loading="lazy"><span class="flyer-item-meta"><strong>${item.title}</strong><small>${String(index+1).padStart(2,'0')} / ${String(item.pages).padStart(2,'0')} 页 ↗</small></span>`;
    button.onclick=()=>{
      collectionLastItem[currentCollection]=item.id||item.slug;
      flyerCollection.classList.remove('open');flyerCollection.setAttribute('aria-hidden','true');
      openBrochure(collectionTrigger,{title:item.title,eyebrow:`${group.eyebrow} / ${String(index+1).padStart(2,'0')}`,footer:group.footer,total:item.pages,ratio:item.ratio,ratios:item.ratios,sources:item.sources,base:pageBase,digits:item.digits||1,startPage:item.startPage||1,showBack:true});
    };
    flyerGrid.append(button);
  });
}
function openCollection(type,trigger){
  currentCollection=type;collectionTrigger=trigger;
  renderCollection();
  flyerCollection.classList.add('open');flyerCollection.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
  const last=collectionLastItem[type];
  (last?flyerGrid.querySelector(`[data-slug="${last}"]`):flyerGrid.querySelector('.flyer-item')).focus();
}
function openHangtongCollection(trigger){openCollection('hangtong',trigger)}
function openExhibitionCollection(trigger){openCollection('exhibition',trigger)}
function openBrochureCollection(trigger){openCollection('brochures',trigger)}
function openFlyerCollection(trigger){openCollection('flyers',trigger)}
function openMagazineCollection(trigger){openCollection('magazines',trigger)}
function openStandardsCollection(trigger){openCollection('standards',trigger)}
function closeCollection(){
  flyerCollection.classList.remove('open');flyerCollection.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');collectionTrigger?.focus();collectionTrigger=null;
}
document.querySelector('#flyer-collection-close').onclick=closeCollection;
flyerCollection.addEventListener('click',e=>{if(e.target===flyerCollection)closeCollection()});
document.querySelector('#brochure-back').onclick=()=>{
  const trigger=collectionTrigger,type=currentCollection;
  closeBrochure();
  openCollection(type,trigger);
};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&flyerCollection.classList.contains('open'))closeCollection()});

function openIpanelCollection(trigger){openCollection('ipanel',trigger)}

function openDronePreview(trigger){openBrochure(trigger,{"title":"DRONE · 无人机物料","eyebrow":"PRINT DESIGN / DRONE","footer":"DRONE · 无人机物料","total":17,"ratio":0.7070709950231028,"ratios":[1.4911764705882353,1.96,1.666196189131969,0.6776595744680851,0.7070709950231028,0.7070709950231028,0.7070709950231028,0.7070709950231028,0.7070709950231028,0.7070709950231028,0.7070709950231028,0.7070709950231028,0.7070709950231028,0.7070709950231028,0.7070709950231028,0.7070709950231028,0.7070709950231028],"sources":["assets/drone-pages/page-17.jpg","assets/drone-pages/page-14.jpg","assets/drone-pages/page-15.jpg","assets/drone-pages/page-16.jpg","assets/drone-pages/page-1.jpg","assets/drone-pages/page-2.jpg","assets/drone-pages/page-3.jpg","assets/drone-pages/page-4.jpg","assets/drone-pages/page-5.jpg","assets/drone-pages/page-6.jpg","assets/drone-pages/page-7.jpg","assets/drone-pages/page-8.jpg","assets/drone-pages/page-9.jpg","assets/drone-pages/page-10.jpg","assets/drone-pages/page-11.jpg","assets/drone-pages/page-12.jpg","assets/drone-pages/page-13.jpg"],"showBack":false})}

function openJingzhenCollection(trigger){openCollection('jingzhen',trigger)}

function openOfficialPreview(trigger){openBrochure(trigger,{title:'中建科工 · 产品官网',eyebrow:'WEB DESIGN / PRODUCT WEBSITE',footer:'中建科工 · 产品官网',total:1,ratio:3840/5010,sources:['assets/official-overview.jpg'],showBack:false,initialZoom:1.5})}
