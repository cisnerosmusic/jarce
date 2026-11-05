# JARCE / THE LAST CHANCE MACHINE

**Street Echo Records**  
*Origin unknown. Signal confirmed.*

Web oficial de JARCE para **jarce.online**. Un archivo nocturno de señales recuperadas, sin biografía ni origen confirmado.

La web presenta las seis canciones del disco en orden, cada una con su cartel, audio y página de letra:

| # | Archivo base | Canción |
| --- | --- | --- |
| 01 | `01_lonely_vending_machine` | Lonely Vending Machine |
| 02 | `02_blinking` | Blinking |
| 03 | `03_last_bus` | Last Bus |
| 04 | `04_sticker` | Sticker |
| 05 | `05_lavanderia_3am` | Lavandería 3 A.M. (feat. LA TEKE) |
| 06 | `06_broken_turnstile` | Broken Turnstile |

## Versión

Versión actual: **1.3.0**. Se muestra en el pie de todas las páginas, en la 404 y en la pantalla sin conexión.

La misma cadena se usa como `?v=` en `style.css`, `signal.js` y `pwa.js` para forzar la recarga de caché. También forma parte del nombre de caché de `sw.js`. Al publicar cambios hay que subir la versión en todos esos puntos a la vez: basta con buscar `1.3.0` en el repositorio.

## Tecnología

HTML, CSS y JavaScript puro. Sin frameworks, instalación ni compilación. Sin fuentes externas, analítica ni cookies. Diseño responsive, navegación por teclado y respeto por la preferencia de movimiento reducido. Todo funciona sin JavaScript; el script añade el reproductor propio, el visor de carteles y el botón B5.

## Archivos

- `index.html`: home con la escena nocturna, el disco y las seis transmisiones (cartel, reproductor y enlace a la letra).
- `the-last-chance-machine/`: página del álbum.
- `transmissions/<nn-nombre>/`: página de cada canción con cartel, audio y letra completa. Son la única ubicación de las letras.
- `404.html`: página de señal perdida, con fondo `assets/404-signal.webp` (versión vertical `-small` para móvil).
- `offline.html`: pantalla sin conexión que muestra el service worker.
- `style.css`: composición, tipografía desgastada y adaptación móvil.
- `signal.js`: botón B5, reproductor (una canción a la vez, paso automático a la siguiente en la home, controles en pantalla bloqueada) y visor de carteles.
- `pwa.js`: registro del service worker y botón de instalación.
- `sw.js`: service worker; solo guarda `offline.html`.
- `manifest.webmanifest`, `favicon.ico`, `assets/icons/`: instalación como app. Incluye iconos adaptables (`maskable`) y capturas `assets/screenshot-*.webp`.
- `sitemap.xml`, `robots.txt`, `llms.txt`: índices para buscadores y agentes de IA.
- `assets/`: carteles en WebP (con variante `-640` para móvil) y JPG (para datos estructurados), portada del álbum y escena del home.
- `assets/og/`: imagen social de 1200×630 propia de cada página.
- `assets/music/`: los seis MP3, con etiquetas ID3 uniformes.
- `CNAME`: dominio personalizado `jarce.online`.
- `.nojekyll`: publicación estática directa.

## SEO y redes

Cada página tiene su propio título, descripción, canonical, imagen social (`assets/og/`), etiquetas Open Graph de tipo musical (`music.song`, `music.album`) y tarjeta de X. Los datos estructurados JSON-LD describen al artista, el álbum y cada grabación con su duración y posición, más la ruta de navegación (breadcrumb).

Para regenerar las imágenes sociales tras cambiar un cartel, basta con componer de nuevo la tarjeta de 1200×630: cartel a la izquierda, título y datos a la derecha, tipografía monoespaciada.

## Rendimiento

- La escena del home se precarga con `fetchpriority="high"` porque es el elemento principal de la primera pantalla y vive en el CSS.
- Los carteles del home cargan en diferido. En las páginas de canción y del álbum el cartel es lo primero que se ve, así que carga con prioridad alta.
- Al añadir una imagen nueva: generar `.webp` y `-640.webp`, poner `width`, `height` y `sizes`.
- `preload="none"` en los audios: nada se descarga hasta pulsar play. No hay reproducción automática al entrar.
- GitHub Pages fija la caché en 10 minutos y no se puede cambiar desde el repositorio.

## Instalar JARCE

La web se puede instalar como app desde un navegador compatible (requiere HTTPS).

- Android/Chrome: menú, Instalar aplicación o Añadir a pantalla de inicio.
- iPhone/Safari: Compartir, Añadir a pantalla de inicio.

En la app instalada no hay botón de volver del navegador. Por eso el cartel completo se abre en un visor dentro de la página, con botón de cerrar.

## Vista local

Servir la carpeta con cualquier servidor HTTP estático (por ejemplo `python3 -m http.server`) y abrir `http://localhost:8000`. Las rutas son absolutas, así que abrir `index.html` directamente desde el disco no carga los recursos.

## Publicar con GitHub Pages

En el repositorio, **Settings → Pages**:

1. **Source:** Deploy from a branch.
2. **Branch:** main, carpeta `/(root)`.
3. **Custom domain:** jarce.online.
4. **Enforce HTTPS** activado.

El archivo `CNAME` debe conservarse en los cambios futuros.

### DNS

| Tipo | Nombre | Valor |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | cisnerosmusic.github.io |

Documentación: [dominios personalizados en GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Mantener el sitio

Mantener los carteles completos, sin recortar, y el orden original 01 a 06. No añadir transmisiones futuras ni documentos internos sin una decisión editorial expresa.

## Material artístico

Las imágenes, la música, las letras y el resto del contenido artístico pertenecen a sus respectivos titulares. Este repositorio no concede ninguna licencia de reutilización del material.
