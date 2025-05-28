const chat = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const botonesContenedor = document.getElementById('botones');

const avatarBot = 'images/avatardiablo.png';

const respuestas = {
  "hacerme socio": "¡Genial que quieras hacerte socio! Podés asociarte en nuestra web oficial o en la sede del club.",
  "pagar cuota": "Podés pagar la cuota desde la app oficial del club o en cualquiera de nuestras sucursales.",
  "próximo partido": "El próximo partido es el domingo a las 17:00 en el Estadio Libertadores de América.",
  "plantel": "Nuestro plantel actual cuenta con jugadores destacados como Silva, Fernández y Bustos.",
  "solicitudes": "Podés enviar tus solicitudes por mail o acercarte a atención al socio.",
  "contacto": "Podés contactarnos vía mail, teléfono o redes sociales oficiales del club.",
};

const opciones = [
  "Hacerme Socio",
  "Pagar Cuota",
  "Próximo partido",
  "Plantel",
  "Solicitudes",
  "Contacto"
];

function agregarMensaje(texto, tipo) {
  const msg = document.createElement('div');
  msg.className = 'message ' + tipo;

  if (tipo === 'bot') {
    const img = document.createElement('img');
    img.src = avatarBot;
    img.alt = 'Diablito avatar';
    img.className = 'avatar-msg';

    const textoMsg = document.createElement('div');
    textoMsg.className = 'texto-msg';
    textoMsg.textContent = texto;

    msg.appendChild(img);
    msg.appendChild(textoMsg);
  } else {
    msg.textContent = texto;
  }

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
  // Buscar coincidencia simple en respuestas
  const clave = Object.keys(respuestas).find(k => textoUsuario.includes(k));
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

// Inicio del chatbot
window.onload = () => {
  agregarMensaje("¡Hola! Soy Diablito, tu asistente del Club Independiente. ¿En qué puedo ayudarte?", 'bot');
  mostrarBotones();
};

