// ============================================================
// Que te encuentren en Google — script.js
// ============================================================

// Cambiá acá el número de WhatsApp (con código de país, sin "+" ni espacios)
const WHATSAPP_URL = "http://wa.me/541149487553";

// Renderiza los iconos de Lucide (se vuelve a llamar tras cada cambio de DOM)
lucide.createIcons();

// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// ================= Menú móvil =================
const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.innerHTML = `<i data-lucide="${isOpen ? "x" : "menu"}"></i>`;
  lucide.createIcons();
});

// Al elegir un enlace del menú, se cierra el menú móvil
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });
});

// ================= Acordeón de preguntas frecuentes =================
document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

// ================= Formulario -> WhatsApp =================
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);

  // Mensaje predeterminado enviado a WhatsApp
  const message = "Hola Giselle, quiero armar la Ficha de Google de mi negocio.";

  window.open(
    `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
  document.getElementById("formSuccess").hidden = false;
});