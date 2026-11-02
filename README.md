# JARCE — THE LAST CHANCE MACHINE

**Street Echo Records**  
*Origin unknown. Signal confirmed.*

Web oficial de JARCE para **jarce.online**. Un archivo nocturno de señales recuperadas, sin biografía ni origen confirmado.

La primera versión presenta únicamente dos transmisiones, cada una en una sección independiente con su cartel original completo y reproductor:

- `01_lonely_vending_machine` — Lonely Vending Machine.
- `05_lavanderia_3am` — Lavandería 3 A.M., feat. LA TEKE.

## Tecnología

HTML, CSS y JavaScript puro. Sin frameworks, instalación ni compilación. Sin fuentes externas, analítica ni cookies. Diseño responsive, navegación por teclado y respeto por la preferencia de movimiento reducido. Los carteles funcionan sin JavaScript; el botón B5 añade una pequeña interacción.

## Archivos

- `index.html`: home con la escena nocturna, el disco y las dos transmisiones.
- `the-last-chance-machine/`, `transmissions/`: páginas permanentes del álbum y de cada canción.
- `style.css`: composición, tipografía desgastada y adaptación móvil.
- `signal.js`: botón B5 y reproductor propio (play/pausa, avance, tiempo, una canción a la vez).
- `pwa.js`: registro del service worker y botón de instalación.
- `sw.js`: service worker; solo guarda `offline.html`.
- `offline.html`: pantalla de conexión perdida.
- `manifest.webmanifest`, `favicon.ico`, `assets/icons/`: instalación como app e iconos B5.
- `sitemap.xml`, `llms.txt`: índice para buscadores y agentes.
- `assets/`: escena del home (`jarce-night-signal.jpg`), portada del álbum (`album-cover.jpg`) y carteles v2.
- `assets/music/`: los dos MP3.
- `CNAME`: dominio personalizado `jarce.online`.
- `.nojekyll`: publicación estática directa.

## Versión

Versión actual: **1.1.0**. Se muestra en el pie de todas las páginas y en la pantalla sin conexión.

La misma cadena se usa como `?v=` en `style.css`, `signal.js` y `pwa.js` para forzar la recarga de caché, también en el nombre de caché de `sw.js`. Al publicar cambios hay que subir la versión en todos esos puntos a la vez (buscar `1.1.0` en el repositorio).

## Vista local

Abrir `index.html` en un navegador. No requiere dependencias. También puede servirse con cualquier servidor HTTP estático.

## Publicar con GitHub Pages

En el repositorio, abrir **Settings → Pages** y seleccionar:

1. **Source:** Deploy from a branch.
2. **Branch:** main.
3. **Folder:** /(root).
4. **Custom domain:** jarce.online.
5. Activar **Enforce HTTPS** cuando el certificado esté disponible.

Guardar el dominio en GitHub antes de completar la conexión DNS. El archivo CNAME debe conservarse en los cambios futuros.

### DNS en GoDaddy

| Tipo | Nombre | Valor |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | cisnerosmusic.github.io |

Revisar los registros existentes de @ y www para evitar destinos incompatibles. Conservar los registros de correo y verificación ajenos al alojamiento. La propagación DNS y la emisión del certificado no son inmediatas.

Documentación: [dominios personalizados en GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Mantener el sitio

Editar los archivos directamente y guardar los cambios en `main`; GitHub Pages publicará la actualización una vez habilitado. Mantener los carteles completos, sin recortar, y los números originales 01 y 05. No añadir transmisiones futuras, letras completas ni documentos internos sin una decisión editorial expresa.

Los MP3 están en `assets/music/`. Cada cartel incluye un reproductor con play/pausa, avance y tiempo. Solo suena una canción a la vez. `preload="none"` evita solicitar el audio hasta la interacción del visitante. Sin JavaScript se conservan los controles nativos del navegador. No hay reproducción automática.

## Material artístico

Las imágenes y el contenido artístico pertenecen a sus respectivos titulares. Este repositorio no concede una licencia de reutilización del material.


La portada de entrada precede a la presentación del disco y a las dos secciones de canciones en orden vertical. En el home cada canción muestra solo cartel, reproductor y un enlace a su página. Las letras completas facilitadas por el autor viven únicamente en la página de cada canción (Lavandería 3 A.M. con las indicaciones de voz por estrofa).

El home utiliza `assets/jarce-night-signal.jpg`, una escena original generada para JARCE y optimizada en JPEG. La portada original del álbum se conserva en assets.

## Páginas permanentes
- /the-last-chance-machine/: presentación del disco.
- /transmissions/01-lonely-vending-machine/: cartel, audio y letra de la canción 01.
- /transmissions/05-lavanderia-3am/: cartel, audio y letra de la canción 05.
- /llms.txt: índice factual para agentes compatibles; no garantiza indexación ni menciones.

Las páginas de detalle incluyen canonical, metadatos sociales y JSON-LD musical. Reutilizan los recursos y el reproductor del sitio. Son la única ubicación de las letras.

## Instalar JARCE
La web incluye manifest, iconos PNG de 192/512 y apple-touch-icon de 180, apertura standalone y un botón de instalación cuando el navegador ofrece el evento compatible.
- Android/Chrome: menú → Instalar aplicación o Añadir a pantalla de inicio.
- iPhone/Safari: Compartir → Añadir a pantalla de inicio; activar Abrir como app web si aparece.
- La instalación requiere HTTPS y depende del navegador.
El service worker solo guarda una pantalla de conexión perdida. No guarda canciones ni páginas: la música necesita conexión y las páginas se solicitan a la red para recibir actualizaciones.
