/* ---------- Menú / Precios ---------- */
function drawProd(){
  $('#listaProd').innerHTML=`<table><tr><th>Producto</th><th>Precio</th><th class="adm">Costo</th><th class="adm">Margen</th><th class="adm"></th></tr>`+
  prods.map(p=>`<tr><td>${esc(p.nombre)}</td><td>${money(p.precio)}</td><td class="adm">${money(p.costo)}</td><td class="adm">${money(p.precio-p.costo)}</td><td class="adm"><button class="b r" onclick="delProd(${p.id})">✕</button></td></tr>`).join('')+'</table>';
}
$('#addP').onclick=async()=>{if(!isAdm())return;
  const n=$('#pn').value.trim(),p=parseFloat($('#pp').value),c=parseFloat($('#pc').value);
  if(!n||isNaN(p)||isNaN(c))return toast('Completa nombre, precio y costo');
  await put('productos',{nombre:n,precio:p,costo:c});$('#pn').value=$('#pp').value=$('#pc').value='';refresh();
};
async function delProd(id){if(!isAdm())return;if(confirm('¿Quitar del menú?')){await del('productos',id);delete cart[id];refresh()}}
