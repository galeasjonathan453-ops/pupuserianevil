/* ---------- Navegación ---------- */
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{
  if(b.classList.contains('adm')&&!isAdm())return;
  document.querySelectorAll('nav button,section').forEach(x=>x.classList.remove('on'));
  b.classList.add('on');$('#'+b.dataset.t).classList.add('on');refresh();
});
