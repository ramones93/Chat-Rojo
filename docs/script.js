const chat = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const botonesContenedor = document.getElementById('botones');
const toggleVoz = document.getElementById('toggle-voz');
let vozActiva = true;

const respuestas = {
  "asociarme": "Podés asociarte desde nuestra web oficial o acercándote a la sede social.",
  "próximo partido": "El próximo partido es el domingo a las 19:00 contra Racing.",
  "plantel": "El plantel actual incluye a referentes como Rey, Marcone, Canelo y más.",
  "pagar cuota": "Podés pagar la cuota desde la app del club o en nuestras sedes.",
};

const opciones = [
  "Asociarme",
  "Próximo partido",
  "Plantel",
  "Pagar Cuota"
];

function agregarMensaje(mensaje, tipo) {
  const msg = document.createElement('div');
  msg.className = `message ${tipo}`;
  msg.textContent = mensaje;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;

  if (tipo === 'bot' && vozActiva) {
    hablar(mensaje);
  }
}

function hablar(texto) {
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'es-AR';
  const voces = window.speechSynthesis.getVoices();
  const vozArgentina = voces.find(v => v.lang === 'es-AR' && v.name.toLowerCase().includes('hombre')) || voces.find(v => v.lang === 'es-AR');
  if (vozArgentina) utterance.voice = vozArgentina;
  speechSynthesis.speak(utterance);
}

function mostrarBotones() {
  botonesContenedor.innerHTML = '';

  if (opciones.length <= 3) {
    opciones.forEach(op => {
      const boton = document.createElement('button');
      boton.textContent = op;
      boton.className = 'boton-opcion';
      boton.onclick = () => manejarOpcion(op);
      botonesContenedor.appendChild(boton);
    });
  } else {
    const desplegar = document.createElement('button');
    desplegar.textContent = 'Opciones';
    desplegar.className = 'boton-opcion';
    desplegar.onclick = () => {
      desplegar.remove();
      opciones.forEach(op => {
        const boton = document.createElement('button');
        boton.textContent = op;
        boton.className = 'boton-opcion';
        boton.onclick = () => manejarOpcion(op);
        botonesContenedor.appendChild(boton);
      });
    };
    botonesContenedor.appendChild(desplegar);
  }
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

toggleVoz.addEventListener('click', () => {
  vozActiva = !vozActiva;
  toggleVoz.textContent = vozActiva ? '🔊 Voz activada' : '🔇 Voz desactivada';
});

window.onload = () => {
  agregarMensaje("¡Hola! ¿En qué puedo ayudarte?", 'bot');
  mostrarBotones();
};
