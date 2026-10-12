const industrialModal=document.createElement('dialog');
industrialModal.setAttribute('aria-label','工业互联网 · 系统入口');
industrialModal.style.cssText='position:fixed;inset:0;width:100vw;height:100dvh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:#0b2033;overflow:hidden';
const industrialFrame=document.createElement('iframe');
industrialFrame.title='工业互联网 · 系统入口：图片与介绍';
industrialFrame.style.cssText='display:block;width:100%;height:100%;border:0';
industrialModal.append(industrialFrame);document.body.append(industrialModal);
let industrialTrigger=null;
function openIndustrialModal(trigger){industrialTrigger=trigger;industrialFrame.src='cases/industrial-platform/';industrialModal.showModal();document.body.classList.add('modal-open');industrialFrame.focus()}
function closeIndustrialModal(){industrialModal.close();industrialFrame.removeAttribute('src');document.body.classList.remove('modal-open');industrialTrigger?.focus()}
industrialModal.addEventListener('cancel',e=>{e.preventDefault();closeIndustrialModal()});
window.addEventListener('message',e=>{if(e.origin===location.origin&&e.source===industrialFrame.contentWindow&&e.data?.type==='industrial-close')closeIndustrialModal()});
