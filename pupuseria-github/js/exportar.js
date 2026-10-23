function dl(name,type,txt){
  const url=URL.createObjectURL(new Blob(['\ufeff'+txt],{type:type+';charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download=name;a.style.display='none';
  document.body.appendChild(a);a.click();
  setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url)},1500);
}

/* Excel (SpreadsheetML) con fórmulas que calculan ventas, costos y ganancia */
$('#btnXls').onclick=async()=>{if(!isAdm())return;
  const ps=await rango();if(!ps.length)return alert('No hay ventas entre el '+$('#desde').value+' y el '+$('#hasta').value+'. Cambia las fechas Desde y Hasta, o guarda primero una orden.');
  const S=(v,s='')=>`<Cell${s?` ss:StyleID="${s}"`:''}><Data ss:Type="String">${esc(v)}</Data></Cell>`;
  const N=(v,s='')=>`<Cell${s?` ss:StyleID="${s}"`:''}><Data ss:Type="Number">${v}</Data></Cell>`;
  const F=(f,v,s='m')=>`<Cell ss:StyleID="${s}" ss:Formula="${f}"><Data ss:Type="Number">${v}</Data></Cell>`;
  let rows=`<Row>${['Fecha','Pedido','Cliente','Producto','Cantidad','Precio unit.','Costo unit.','Venta','Costo total','Ganancia'].map(h=>S(h,'h')).join('')}</Row>`;
  let tc=0,tv=0,tk=0;
  ps.forEach(p=>p.items.forEach(i=>{
    const v=i.cant*i.precio,k=i.cant*i.costo;tc+=i.cant;tv+=v;tk+=k;
    rows+=`<Row>${S(p.fecha)}${N(p.id)}${S(p.cliente)}${S(i.nombre)}${N(i.cant)}${N(i.precio,'m')}${N(i.costo,'m')}${F('=RC[-3]*RC[-2]',v)}${F('=RC[-4]*RC[-2]',k)}${F('=RC[-2]-RC[-1]',v-k)}</Row>`;
  }));
  rows+=`<Row>${S('TOTALES','b')}<Cell/><Cell/><Cell/>${F('=SUM(R2C:R[-1]C)',tc,'b')}<Cell/><Cell/>${F('=SUM(R2C:R[-1]C)',tv,'b')}${F('=SUM(R2C:R[-1]C)',tk,'b')}${F('=SUM(R2C:R[-1]C)',tv-tk,'b')}</Row>`;
  const xml=`<?xml version="1.0" encoding="UTF-8"?><?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Styles><Style ss:ID="h"><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#C2410C" ss:Pattern="Solid"/></Style>
<Style ss:ID="m"><NumberFormat ss:Format="$#,##0.00"/></Style>
<Style ss:ID="b"><Font ss:Bold="1"/><Interior ss:Color="#FED7AA" ss:Pattern="Solid"/><NumberFormat ss:Format="$#,##0.00"/></Style></Styles>
<Worksheet ss:Name="Ventas"><Table><Column ss:Width="110"/><Column ss:Width="50"/><Column ss:Width="100"/><Column ss:Width="160"/><Column ss:Width="60" ss:Span="5"/>${rows}</Table></Worksheet></Workbook>`;
  dl(`ventas_pupuseria_${$('#desde').value}_a_${$('#hasta').value}.xls`,'application/vnd.ms-excel',xml);
};

/* Reporte HTML descargable */
$('#btnHtml').onclick=async()=>{if(!isAdm())return;
  const{ps,v,c,n,por}=await drawVentas();if(!ps.length)return alert('No hay ventas entre el '+$('#desde').value+' y el '+$('#hasta').value+'. Cambia las fechas Desde y Hasta, o guarda primero una orden.');
  const html=`<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Reporte de ventas</title>
<style>body{font-family:Arial;max-width:800px;margin:20px auto}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:6px;text-align:left}th{background:#c2410c;color:#fff}</style></head><body>
<h1>🫓 Reporte de ventas – Pupusería</h1><p>Del ${$('#desde').value} al ${$('#hasta').value}</p>
<p><b>Pedidos:</b> ${ps.length} · <b>Unidades:</b> ${n} · <b>Ventas:</b> ${money(v)} · <b>Costos:</b> ${money(c)} · <b>Ganancia:</b> ${money(v-c)}</p>
<h2>Por producto</h2><table><tr><th>Producto</th><th>Cant.</th><th>Ventas</th><th>Ganancia</th></tr>${Object.entries(por).map(([k,r])=>`<tr><td>${esc(k)}</td><td>${r.cant}</td><td>${money(r.v)}</td><td>${money(r.v-r.c)}</td></tr>`).join('')}</table>
<h2>Detalle de pedidos</h2><table><tr><th>#</th><th>Fecha</th><th>Cliente</th><th>Detalle</th><th>Total</th></tr>${ps.map(p=>`<tr><td>${p.id}</td><td>${p.fecha}</td><td>${esc(p.cliente)}</td><td>${p.items.map(i=>i.cant+' × '+esc(i.nombre)).join(', ')}</td><td>${money(totalP(p))}</td></tr>`).join('')}</table></body></html>`;
  dl(`reporte_ventas_${$('#desde').value}.html`,'text/html',html);
};
