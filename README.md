# Que te encuentren en Google — Landing page

Landing page estática y completamente editable para **Giselle Kaplun**. Su objetivo comercial es vender el servicio de **Ficha de Google** ($50.000): ayudar a comercios, emprendedores y negocios locales a mejorar su presencia digital, aparecer en Google y dejar de depender del boca en boca.

## Estructura del proyecto

```
/landing-google/
  index.html     → estructura y contenido de la landing
  styles.css     → estilos (paleta, tipografías, responsive)
  script.js      → menú móvil, preguntas frecuentes, formulario a WhatsApp
  README.md      → esta guía
```

- Sin frameworks: solo HTML, CSS y JavaScript puro.
- Tipografías: **DM Serif Display** (títulos) y **Manrope** (textos y botones), cargadas desde Google Fonts.
- Iconos: **Lucide** mediante CDN.
- La landing funciona abriendo directamente el archivo `index.html`, sin servidor.

---

## Cómo abrir la landing localmente

### Opción A: doble clic (la más simple)
1. Abrí la carpeta `landing-google`.
2. Hacé doble clic sobre `index.html`. Se abre en tu navegador y funciona sin instalar nada.

> Nota: la imagen del retrato y los iconos vienen de internet (Lucide, Google Fonts). Si abrís el archivo sin conexión, esos recursos no cargarán, pero el diseño no se rompe gracias al fallback incluido.

### Opción B: con un servidor local (recomendada)
Otros archivos estáticos (como el retrato guardado en `imagenes/`) se ven mejor con un servidor local:

```bash
cd landing-google
python3 -m http.server 8000
```

Luego abrí en el navegador: `http://localhost:8000`

---

## Cómo cambiar textos

Todos los textos están en `index.html`, escritos en español y fáciles de encontrar.

Ejemplos:
- **Título del hero**: buscá `<h1>Que te encuentren en Google...`.
- **Texto introductorio**: buscá `class="hero-lead"`.
- **WhatsApp y teléfono**: buscá `+54 9 11 4948 7553`.
- **Sección Problema**: buscá `id="problema"`. Cada problema es un `<div>` con `<b>01</b>` a `<b>05</b>`; agregás o quitás uno copiando esa misma estructura.
- **Preguntas frecuentes**: cada pregunta tiene este formato dentro del bloque FAQ:

```html
<div class="faq-item">
  <button aria-expanded="false">¿Tu pregunta?</button>
  <div class="faq-answer"><p>Tu respuesta.</p></div>
</div>
```

Buscá `class="faq-item"` para ver las 4 existentes.

---

## Cómo cambiar colores

Todos los colores están definidos como variables al inicio de `styles.css`:

```css
:root {
  --ink: #1f3d2b;        /* Verde oscuro (antes negro tinta) */
  --paper: #f4f0e8;      /* Marfil (fondo claro) */
  --terracotta: #b9573f; /* Terracota (acento) */
  --rose: #e8c9be;       /* Rosa suave */
  --gold: #c49c4a;       /* Dorado */
  --sand: #e3d8c7;       /* Beige arena */
}
```

> El verde oscuro `#1f3d2b` es el mismo "verde profundo" (`--green-deep`) que usa la web [gkaplunconsultora.com.ar](https://gkaplunconsultora.com.ar/). Alcanza con cambiarlo acá y se actualiza en textos, botones, la franja de pilares, el formulario y el footer.

Cambiá el valor de cualquier variable y se actualiza en toda la landing automáticamente. Por ejemplo, para un terracota más intenso: `--terracotta: #a84a32;`.

---

## Cómo cambiar precios

La landing vende un único servicio: **Ficha de Google** ($50.000). El precio aparece en **dos lugares** de `index.html`:

1. **Sección destaca "Qué incluye"**: buscá `class="price-feature"` y el `<strong>$50.000</strong>`.
2. **Botón o WhatsApp**: no muestra precio, pero el mensaje precargado del formulario lo menciona (revisá el punto de WhatsApp).

También podés cambiar la validación de "5 a 7 días" en el hero (buscá `5 a 7 días`) y los beneficios/tiempo en la lista de "Qué incluye" editando las líneas de la lista `<ul>`, el `<em>Tiempo: 5 a 7 días</em>` y (si lo cargás en el formulario) el precio del mensaje de WhatsApp.

---

## Cómo cambiar imágenes

La landing usa dos imágenes:

### 1. Logo del header
1. El logo vive en la **raíz** de la landing: `logo.png` (reemplazá ese archivo por tu nuevo logo, manteniendo el mismo nombre).
2. Si el archivo falta, el header muestra el círculo vacío sin romper el diseño.
3. En `index.html`, buscá `class="brand-logo"`. El `src` ya apunta a la raíz:

```html
<img class="brand-logo" src="logo.png" alt="Logo de Giselle Kaplun">
```

> Si preferís tenerlo en `imagenes/logo.png` en vez de la raíz, subí también ese archivo y cambiá el `src` a `imagenes/logo.png`.

### 2. Retrato de Giselle (sección "Quién está detrás")
1. La foto vive **en la raíz**: `giselle-kaplun.jpg` (al lado de `index.html`). Reemplazá ese archivo por tu nueva foto, manteniendo el mismo nombre.
2. En `index.html`, buscá `class="portrait"`; el `src` apunta a la raíz:

```html
<img src="giselle-kaplun.jpg" alt="Giselle Kaplun" ...>
```

Si la imagen no carga, el diseño no se rompe: se mantiene el espacio reservado con un fondo editorial neutro y un mensaje que indica dónde se reemplaza.

---

## Cómo modificar el número de WhatsApp

El número está en dos lugares:

1. **`script.js`** (lo usa el formulario): en la primera línea, cambiá el número manteniendo el formato `http://wa.me/CÓDIGOPAÍSNÚMERO` sin `+`, sin guiones ni espacios:

```js
const WHATSAPP_URL = "http://wa.me/541149487553";
```

2. **`index.html`** (lo usan todos los botones "Quiero...", el menú, el teléfono y el botón flotante de WhatsApp `.wa-float`): buscá y reemplazá todas las apariciones de `http://wa.me/541149487553`. El teléfono visible `+54 9 11 4948 7553` también aparece en la sección de contacto.

> **Botón flotante de WhatsApp:** es el círculo verde fijo abajo a la derecha. Está al final del `index.html` (clase `wa-float`) y su estilo (color, tamaño, posición) en `styles.css`. El verde es `#25d366`; podés cambiarlo ahí.

---

## Cómo subir los archivos a un hosting

La landing es un sitio 100% estático, por lo que no necesita backend ni base de datos. Cualquier hosting sirve.

### Opciones simples
- **Netlify / Vercel**: creá una cuenta, arrastrá la carpeta `landing-google` a la zona de "Deploy" (Netlify) o usá su CLI. Obtenés un enlace público en segundos.
- **Hosting clásico (cPanel / Hostgator / DonWeb / etc.)**: subí los archivos de la carpeta con el administrador de archivos o con FTP a la carpeta `public_html`.

### Pasos generales
1. Entrá a la consola/panel de tu hosting.
2. Subí los archivos `index.html`, `styles.css`, `script.js` y la carpeta `imagenes/` a la raíz del sitio.
3. Visitá tu dominio para verificar.

> Preguntas frecuentes de subida:
> - **¿Necesito un certificado SSL?** Sí es recomendable; hoy casi todos los hostings lo ofrecen gratis (Let's Encrypt) y los mensajes de WhatsApp igual funcionan con cualquier hosting.
> - **¿Qué pasa con las letras acentuadas?** `index.html` ya está en UTF-8, no hay que hacer nada.
> - **¿Puedo usarlo con un dominio propio?** Sí, solo apuntás tu dominio al hosting y subís los archivos.

---

## Funcionalidades incluidas

- Todos los botones y CTA abren WhatsApp (`wa.me/541149487553`).
- El formulario no envía datos a ningún backend: al enviarlo, abre WhatsApp con un mensaje precargado que incluye nombre, negocio, medio de contacto y consulta comercial.
- Menú responsive con hamburguesa en pantallas pequeñas.
- Acordeón funcional en preguntas frecuentes (con estados `aria-expanded`).
- Scroll suave entre secciones.
- Iconos con Lucide (CDN).
- Año automático en el footer.
- Accesibilidad básica: textos alternativos, labels en el formulario, contraste y navegación por teclado.
- Diseño responsive en desktop, tablet y mobile, con `prefers-reduced-motion` respetado.