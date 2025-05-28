const chat = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const botonesContenedor = document.getElementById('botones');

const respuestas = {
  "hacerme socio": "Podés hacerte socio desde nuestra web oficial o acercándote a la sede.",
  "pagar cuota": "La cuota se puede pagar online o en cualquiera de nuestras sedes.",
  "próximo partido": "Jugamos este domingo a las 19:00 hs contra Racing.",
  "plantel": "El plantel está conformado por grandes jugadores como Rey, Marcone, Canelo, entre otros.",
  "solicitudes": "Podés hacer solicitudes a través del formulario en nuestra web.",
  "contacto": "Podés contactarnos por redes sociales o al teléfono oficial del club.",
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
        agregarMensaje('¿En qué más te puedo ayudar?', 'bot');
        mostrarBotones();
      }, 600);
    }, 500);
  } else {
    setTimeout(() => {
      agregarMensaje("No entendí eso, ¿podés repetirlo?", 'bot');
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
