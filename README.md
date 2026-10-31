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

- `index.html`: contenido y estructura.
- `style.css`: composición, tipografía desgastada y adaptación móvil.
- `signal.js`: interacción B5.
- `assets/`: portada del álbum y carteles originales.
- `CNAME`: dominio personalizado `jarce.online`.
- `.nojekyll`: publicación estática directa.

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


La portada de entrada precede a la presentación del disco y a las dos secciones de canciones en orden vertical. Lonely Vending Machine incluye la letra completa facilitada por el autor; Lavandería 3 A.M. conserva su fragmento público.
