/* ---------- Pedidos ---------- */
const totalP=p=>p.items.reduce((s,i)=>s+i.cant*i.precio,0);
async function drawPedidos(){
  const ps=(await all('pedidos')).reverse();
  $('#listaPedidos').innerHTML=ps.length?`<table><tr><th>#</th><th>Fecha</th><th>Cliente</th><th>Detalle</th><th>Total</th><th>Estado</th><th></th></tr>`+
  ps.map(p=>`<tr><td>${p.id}</td><td>${p.fecha}</td><td>${esc(p.cliente)}<br><small>${p.tipo}</small></td>
  <td>${p.items.map(i=>i.cant+' × '+esc(i.nombre)).join('<br>')}</td><td>${money(totalP(p))}</td>
  <td><button class="b ${p.estado=='Entregado'?'g':''}" onclick="estado(${p.id})">${p.estado}</button></td>
  <td><button class="b r" onclick="delP(${p.id})">✕</button></td></tr>`).join('')+'</table>':'Aún no hay pedidos.';
}
async function estado(id){if(!isAdm())return;const p=(await all('pedidos')).find(x=>x.id==id);p.estado=p.estado=='Pendiente'?'Entregado':'Pendiente';await put('pedidos',p);drawPedidos()}
async function delP(id){if(!isAdm())return;if(confirm('¿Eliminar pedido #'+id+'?')){await del('pedidos',id);refresh()}}
