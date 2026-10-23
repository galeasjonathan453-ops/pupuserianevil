/* ---------- Login y sesión ---------- */
let ses=null;
const isAdm=()=>!!ses&&ses.rol=='admin';
async function hash(s){
  try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('pup:'+s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
  catch(e){let h=5381;for(const c of 'pup:'+s)h=(h*33)^c.charCodeAt(0);return 'f'+(h>>>0).toString(16)}
}
const log=(u,rol,ok)=>put('bitacora',{fecha:new Date().toLocaleString('sv'),usuario:u,rol,resultado:ok?'Exitoso':'Fallido'});
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x==b));
  ['fCli','fAdm'].forEach(f=>$('#'+f).classList.toggle('hide',f!=b.dataset.l));$('#lerr').textContent='';
});
$('#fCli').onsubmit=async e=>{e.preventDefault();if(!db)return $('#lerr').textContent='La base de datos aún no está lista. Cierra las otras pestañas de esta página y recarga con F5.';const n=$('#lcn').value.trim();if(!n)return;
  await log(n,'cliente',true);entrar({usuario:n,rol:'cliente'})};
$('#fAdm').onsubmit=async e=>{e.preventDefault();if(!db)return $('#lerr').textContent='La base de datos aún no está lista. Cierra las otras pestañas de esta página y recarga con F5.';
  const u=$('#lu').value.trim(),h=await hash($('#lp').value);
  const us=(await all('usuarios')).find(x=>x.usuario===u&&x.hash===h);
  await log(u||'(vacío)','admin',!!us);
  if(!us)return $('#lerr').textContent='Usuario o contraseña incorrectos';
  entrar(us)};
function entrar(u){
  ses=u;$('#lerr').textContent='';cart={};
  document.body.classList.toggle('cli',!isAdm());
  $('#login').classList.add('hide');$('#hd').classList.remove('hide');$('#app').classList.remove('hide');
  $('#quien').textContent=(isAdm()?'👑 ':'👤 ')+u.usuario;
  $('#cliente').value=isAdm()?'':u.usuario;
  document.querySelector('nav button').click();
}
function salir(){
  ses=null;cart={};$('#hd').classList.add('hide');$('#app').classList.add('hide');$('#login').classList.remove('hide');
  $('#lcn').value=$('#lu').value=$('#lp').value='';
}
async function cambiarClave(){
  if(!isAdm())return;const n=prompt('Nueva contraseña (mínimo 6 caracteres):');
  if(!n||n.length<6)return n&&alert('Debe tener al menos 6 caracteres');
  ses.hash=await hash(n);await put('usuarios',ses);toast('Contraseña actualizada ✔');
}
