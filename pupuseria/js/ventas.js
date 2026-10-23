/* ---------- Ventas ---------- */
async function rango(){
  const d=$('#desde').value,h=$('#hasta').value;
  return (await all('pedidos')).filter(p=>p.fecha.slice(0,10)>=d&&p.fecha.slice(0,10)<=h);
}
async function drawVentas(){
  const ps=await rango();let v=0,c=0,n=0;const por={};
  ps.forEach(p=>p.items.forEach(i=>{v+=i.cant*i.precio;c+=i.cant*i.costo;n+=i.cant;
    const r=por[i.nombre]=por[i.nombre]||{cant:0,v:0,c:0};r.cant+=i.cant;r.v+=i.cant*i.precio;r.c+=i.cant*i.costo}));
  $('#stats').innerHTML=`<div class="stat">Pedidos<b>${ps.length}</b></div><div class="stat">Unidades<b>${n}</b></div>
  <div class="stat">Ventas<b>${money(v)}</b></div><div class="stat">Costos<b>${money(c)}</b></div><div class="stat">Ganancia<b class="pos">${money(v-c)}</b></div>`;
  $('#resumen').innerHTML=`<table><tr><th>Producto</th><th>Cant.</th><th>Ventas</th><th>Ganancia</th></tr>`+
  Object.entries(por).map(([k,r])=>`<tr><td>${esc(k)}</td><td>${r.cant}</td><td>${money(r.v)}</td><td>${money(r.v-r.c)}</td></tr>`).join('')+'</table>';
  return{ps,v,c,n,por};
}
$('#desde').onchange=$('#hasta').onchange=drawVentas;
