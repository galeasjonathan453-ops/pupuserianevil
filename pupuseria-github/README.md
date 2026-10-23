# 🫓 Pupusería – Sistema de Órdenes

Página estática (HTML + CSS + JS). Se publica con GitHub Pages, sin servidor.

## Publicar en GitHub Pages
1. En github.com → **New repository** → ponle un nombre (ej. `pupuseria`) → público → **Create**.
2. **uploading an existing file** → arrastra TODO el contenido de esta carpeta
   (`index.html`, `css/`, `js/`, `.nojekyll`, `README.md`) → **Commit changes**.
   `index.html` debe quedar en la raíz del repositorio.
3. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*,
   Branch = `main`, carpeta `/ (root)` → **Save**.
4. En 1–2 minutos la página estará en `https://TU-USUARIO.github.io/pupuseria/`.

## Importante
- Los datos (pedidos, menú, usuarios) se guardan en el navegador de cada dispositivo (IndexedDB).
  No se comparten entre celulares/computadoras ni entre personas.
- Acceso inicial de administrador: `admin` / `admin123`. Cámbialo al entrar.
