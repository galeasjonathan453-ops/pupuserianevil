async function drawBit(){
  const b=(await all('bitacora')).reverse().slice(0,200);
  $('#listaBit').innerHTML='<table><tr><th>Fecha y hora</th><th>Usuario</th><th>Rol</th><th>Resultado</th></tr>'+
  b.map(x=>`<tr><td>${x.fecha}</td><td>${esc(x.usuario)}</td><td>${x.rol}</td><td>${x.resultado}</td></tr>`).join('')+'</table>';
}
