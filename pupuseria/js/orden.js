/* ---------- Nueva orden ---------- */
let prods=[],cart={};
async function refresh(){prods=await all('productos');drawMenu();drawProd();if(isAdm()){drawPedidos();drawVentas();drawBit()}}
function drawMenu(){
  $('#menu').innerHTML=prods.map(p=>`<div class="item"><div><b>${esc(p.nombre)}</b><br><small>${money(p.precio)}</small></div>
  <div class="q"><button onclick="chg(${p.id},-1)">−</button><b>${cart[p.id]||0}</b><button onclick="chg(${p.id},1)">+</button></div></div>`).join('');
  $('#total').textContent=money(prods.reduce((s,p)=>s+(cart[p.id]||0)*p.precio,0));
}
function chg(id,d){cart[id]=Math.max(0,(cart[id]||0)+d);drawMenu()}
$('#guardar').onclick=async()=>{
  const items=prods.filter(p=>cart[p.id]>0).map(p=>({nombre:p.nombre,cant:cart[p.id],precio:p.precio,costo:p.costo}));
  if(!items.length)return toast('Agrega al menos un producto');
  await put('pedidos',{fecha:new Date().toLocaleString('sv'),cliente:$('#cliente').value.trim()||'Mostrador',tipo:$('#tipo').value,estado:'Pendiente',items});
  cart={};$('#cliente').value=isAdm()?'':ses.usuario;toast('Orden guardada ✔');refresh();
};
