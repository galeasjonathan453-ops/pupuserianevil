const $=s=>document.querySelector(s);
const money=n=>'$'+Number(n).toFixed(2);
const hoy=()=>new Date().toLocaleDateString('sv');
const toast=m=>{const t=$('#toast');t.textContent=m;t.style.display='block';setTimeout(()=>t.style.display='none',1800)};
const esc=s=>String(s).replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
