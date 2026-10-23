/* ---------- Base de datos (IndexedDB) ---------- */
let db;
const wrap=r=>new Promise((ok,no)=>{r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)});
const st=(n,m='readonly')=>db.transaction(n,m).objectStore(n);
const all=n=>wrap(st(n).getAll());
const put=(n,v)=>wrap(st(n,'readwrite').put(v));
const del=(n,id)=>wrap(st(n,'readwrite').delete(id));
const open=indexedDB.open('pupuseria',2);
open.onupgradeneeded=e=>{const d=e.target.result;
  for(const n of ['productos','pedidos','usuarios','bitacora'])if(!d.objectStoreNames.contains(n))d.createObjectStore(n,{keyPath:'id',autoIncrement:true});
};
open.onsuccess=async e=>{
  db=e.target.result;$('#lerr').textContent='';
  db.onversionchange=()=>{db.close();alert('La página se actualizó en otra pestaña. Recarga con F5.')};
  if(!(await all('productos')).length){
    for(const p of [['Pupusa revuelta',0.75,0.35],['Pupusa de queso',0.75,0.33],['Pupusa de frijol con queso',0.75,0.30],['Pupusa de chicharrón',0.75,0.38],['Pupusa de loroco',0.85,0.40],['Refresco',0.75,0.30],['Café',0.50,0.15]])
      await put('productos',{nombre:p[0],precio:p[1],costo:p[2]});
  }
  if(!(await all('usuarios')).length)await put('usuarios',{usuario:'admin',hash:await hash('admin123'),rol:'admin'});
  $('#desde').value=$('#hasta').value=hoy();
};
open.onerror=()=>{$('#lerr').textContent='No se pudo abrir la base de datos. Prueba en otro navegador o fuera de modo privado.'};
open.onblocked=()=>{$('#lerr').textContent='La base de datos se está actualizando. Cierra las OTRAS pestañas o ventanas de esta página (la versión anterior) y espera unos segundos.'};
