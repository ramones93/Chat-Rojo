const chat = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const botonesContenedor = document.getElementById('botones');

const respuestas = {
  "hacerme socio": "¡Genial que quieras ser parte del club! Podés asociarte desde nuestra web oficial o en la sede.",
  "pagar cuota": "Podés pagar la cuota desde la app del club o en nuestras sedes.",
  "próximo partido": "El próximo partido es el domingo a las 19:00 contra Racing.",
  "plantel": "El plantel actual incluye a referentes como Rey, Marcone, Canelo y más.",
  "solicitudes": "Para solicitudes especiales, por favor contactanos vía formulario o whatsapp.",
  "contacto": "Podés comunicarte con nosotros al 1234-5678 o por email a contacto@clubdiablo.com"
};

const opciones = [
  "Hacerme Socio",
  "Pagar Cuota",
  "Próximo partido",
  "Plantel",
  "Solicitudes",
  "Contacto"
];

function agregarMensaje(mensaje, tipo) {
  const msg = document.createElement('div');
  msg.className = `message ${tipo}`;
  msg.textContent = mensaje;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function mostrarBotones() {
  botonesContenedor.innerHTML = '';
  opciones.forEach(op => {
    const boton = document.createElement('button');
    boton.textContent = op;
    boton.className = 'boton-opcion';
    boton.onclick = () => manejarOpcion(op);
    botonesContenedor.appendChild(boton);
  });
}

function manejarOpcion(texto) {
  agregarMensaje(texto, 'user');
  responder(texto.toLowerCase());
  input.value = '';
}

function responder(textoUsuario) {
  const clave = Object.keys(respuestas).find(p => textoUsuario.includes(p));
  if (clave) {
    setTimeout(() => {
      agregarMensaje(respuestas[clave], 'bot');
      setTimeout(() => {
        agregarMensaje('¿Cómo seguimos?', 'bot');
        mostrarBotones();
      }, 600);
    }, 500);
  } else {
    setTimeout(() => {
      agregarMensaje("Perdón, no entendí. ¿Podés repetirlo?", 'bot');
      mostrarBotones();
    }, 500);
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;
  agregarMensaje(texto, 'user');
  responder(texto.toLowerCase());
  input.value = '';
});

window.onload = () => {
  agregarMensaje("¡Hola! Soy Diablito, ¿en qué puedo ayudarte?", 'bot');
  mostrarBotones();
};


