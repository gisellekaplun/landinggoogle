// ============================================================
// Que te encuentren en Google — script.js
// Contenido editable en "contenido.json". Este script lo carga
// y lo aplica a los elementos marcados con data-key en index.html.
// ============================================================

// Valores de respaldo (se usan solo si no se puede leer contenido.json,
// por ejemplo al abrir el sitio con doble clic desde un archivo local).
const RESPALDO = {
  whatsapp: "http://wa.me/541149487553",
  mensaje: "Hola Giselle, quiero armar la Ficha de Google de mi negocio."
};

// Helper: lee un valor anidado como "contacto.whatsapp"
function obtener(obj, ruta) {
  return ruta.split(".").reduce((o, k) => {
    if (o == null) return null;
    return Array.isArray(o) ? o[Number(k)] : o[k];
  }, obj);
}

// Helper: escapa caracteres especiales del contenido inyectado
function esc(valor) {
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ================= Aplicar contenido del JSON =================
function aplicarContenido(c) {
  // Título y descripción de la página
  if (typeof c.pagina?.titulo === "string") document.title = c.pagina.titulo;
  if (typeof c.pagina?.descripcion === "string") {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", c.pagina.descripcion);
  }

  // Enlaces de WhatsApp
  if (typeof c.contacto?.whatsapp === "string") {
    document.querySelectorAll("[data-whatsapp]").forEach((a) => {
      a.href = c.contacto.whatsapp;
    });
  }

  // Listas generadas desde el JSON
  renderPilares(c);
  renderLista(c, "problema.items", "problemasList", (i) =>
    `<div><b>${esc(i.numero)}</b><p>${esc(i.texto)}</p></div>`
  );
  renderLista(c, "oferta.items", "incluidosList", (t) =>
    `<div><i data-lucide="check"></i>${esc(t)}</div>`
  );
  renderLista(c, "proceso.steps", "pasosList", (s) =>
    `<div><b>${esc(s.numero)}</b><span><strong>${esc(s.titulo)}</strong>${esc(s.detalle)}</span></div>`
  );
  renderLista(c, "faq.items", "faqList", (f, indice) =>
    `<div class="faq-item${indice === 0 ? " open" : ""}"><button aria-expanded="${indice === 0 ? "true" : "false"}">${esc(f.pregunta)}<i data-lucide="chevron-down"></i></button><div class="faq-answer"><p>${esc(f.respuesta)}</p></div></div>`
  );

  // Texto del círculo "hacemos visible lo valioso"
  const circulo = document.getElementById("circuloTexto");
  const lineas = c.proceso?.circulo;
  if (circulo && Array.isArray(lineas) && lineas.length >= 3) {
    circulo.innerHTML = `${esc(lineas[0])}<br><em>${esc(lineas[1])}</em><br>${esc(lineas[2])}`;
  }

  // Textos simples marcados con data-key
  document.querySelectorAll("[data-key]").forEach((el) => {
    const valor = obtener(c, el.dataset.key);
    if (typeof valor === "string") el.textContent = valor;
  });

  // Placeholders del formulario
  document.querySelectorAll("[data-placeholder-key]").forEach((el) => {
    const valor = obtener(c, el.dataset.placeholderKey);
    if (typeof valor === "string") el.setAttribute("placeholder", valor);
  });
}

// Pilares: consume la 1era columna "POV" (etiqueta) y rearma las demás
function renderPilares(c) {
  const cont = document.getElementById("pilaresList");
  if (!cont) return;
  const items = c.pilares?.items || [];
  const pov = cont.querySelector(".pillars-pov");
  const etiqueta = pov ? pov.outerHTML : "";
  cont.innerHTML =
    etiqueta +
    items
      .map(
        (i) =>
          `<div><b>${esc(i.numero)}</b><strong>${esc(i.titulo)}</strong><small>${esc(i.detalle)}</small></div>`
      )
      .join("");
}

// Renderiza cualquier lista a partir de una ruta del JSON y un template
function renderLista(c, ruta, id, template) {
  const cont = document.getElementById(id);
  if (!cont) return;
  const items = obtener(c, ruta);
  if (!Array.isArray(items)) return;
  cont.innerHTML = items.map(template).join("");
}

// ================= Carga inicial =================
(async function inicio() {
  let contenido = null;
  try {
    const respuesta = await fetch("contenido.json");
    if (respuesta.ok) contenido = await respuesta.json();
  } catch (e) {
    console.warn(
      "No se pudo leer contenido.json. Se muestra el contenido de respaldo del HTML. " +
        "(Si abriste el sitio con doble clic, abrí la carpeta con un servidor local o subilo para ver tus cambios.)"
    );
  }
  if (contenido) aplicarContenido(contenido);

  // ================= Iconos de Lucide =================
  lucide.createIcons();

  // ================= Año automático en el footer =================
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ================= Menú móvil =================
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && header) {
    menuToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      menuToggle.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
      lucide.createIcons();
    });
  }

  // Al elegir un enlace del menú, se cierra el menú móvil
  if (mainNav) {
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header?.classList.remove("is-open");
        menuToggle?.setAttribute("aria-expanded", "false");
        menuToggle?.setAttribute("aria-label", "Abrir menú");
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
      });
    });
  }

  // ================= Acordeón de preguntas frecuentes =================
  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  // ================= Formulario -> WhatsApp =================
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const url = contenido?.contacto?.whatsapp || RESPALDO.whatsapp;
      const mensaje = contenido?.contacto?.mensaje_whatsapp || RESPALDO.mensaje;
      window.open(
        `${url}?text=${encodeURIComponent(mensaje)}`,
        "_blank",
        "noopener,noreferrer"
      );
      const exito = document.getElementById("formSuccess");
      if (exito) exito.hidden = false;
    });
  }
})();