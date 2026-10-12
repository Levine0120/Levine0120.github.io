const rdsModal=document.createElement('dialog');
rdsModal.setAttribute('aria-label','RDS · 研发管理系统');
rdsModal.style.cssText='position:fixed;inset:0;width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:#0b2033;overflow:hidden';
const rdsFrame=document.createElement('iframe');
rdsFrame.title='RDS · 研发管理系统：图片与介绍';
rdsFrame.style.cssText='display:block;width:100%;height:100%;border:0';
rdsModal.append(rdsFrame);document.body.append(rdsModal);
let rdsTrigger=null;
function openRdsModal(trigger){rdsTrigger=trigger;rdsFrame.src='cases/rds/';rdsModal.showModal();document.body.classList.add('modal-open');rdsFrame.focus()}
function closeRdsModal(){rdsModal.close();rdsFrame.removeAttribute('src');document.body.classList.remove('modal-open');rdsTrigger?.focus()}
rdsModal.addEventListener('cancel',e=>{e.preventDefault();closeRdsModal()});
window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===rdsFrame.contentWindow&&e.data?.type==='rds-close')closeRdsModal()});
