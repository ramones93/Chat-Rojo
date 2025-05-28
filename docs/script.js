const chat = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const botonesOpciones = document.getElementById('botones-opciones');
const toggleVoiceBtn = document.getElementById('toggle-voice');

let vozActiva = true;
let vozSeleccionada = null;

const respuestas = {
  asociarme: "Podés asociarte ingresando en nuestra web oficial o acercándote a la sede de Avellaneda.",
  'próximo partido': "El próximo partido se juega este domingo a las 18 hs en el Libertadores de América.",
  plantel: "Tenemos un plantel competitivo con jóvenes promesas y jugadores de experiencia. ¿Querés conocer alguno en particular?",
  'pagar cuota': "Podés pagar tu cuota desde la app oficial del club o en cualquier sucursal habilitada.",
  hola: "¡Hola! ¿En qué puedo ayudarte hoy?"
};

const opciones = ["Asociarme", "Próximo partido", "Plantel", "Pagar Cuota"];

function configurarVoz() {
  const voces = speechSynthesis.getVoices();

  vozSeleccionada =
    voces.find(v => v.lang === 'es-AR' && v.name.toLowerCase().includes('male')) ||
    voces.find(v => v.lang === 'es-AR') ||
    voces.find(v => v.lang.startsWith('es') && v.name.toLowerCase().includes('male')) ||
    voces.find(v => v.lang.startsWith('es'));
}

function hablar(texto) {
  if (!vozActiva || !vozSeleccionada) return;
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.voice = vozSeleccionada;
  speechSynthesis.speak(utterance);
}

function agregarMensaje(mensaje, tipo) {
  const msg = document.createElement('div');
  msg.className = `message ${tipo}`;
  msg.textContent = mensaje;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;

  if (tipo === 'bot') {
    hablar(mensaje);
  }
}

function mostrarOpciones() {
  botonesOpciones.innerHTML = '';
  opciones.forEach(opcion => {
    const btn = document.createElement('button');
    btn.className = 'boton-opcion';
    btn.textContent = opcion;
    btn.onclick = () => manejarOpcion(opcion.toLowerCase());
    botonesOpciones.appendChild(btn);
  });
}

function manejarOpcion(opcion) {
  agregarMensaje(opcion, 'user');
  responder(opcion);
}

function responder(textoUsuario) {
  const clave = Object.keys(respuestas).find(palabra => textoUsuario.includes(palabra));
  if (clave) {
    setTimeout(() => {
      agregarMensaje(respuestas[clave], 'bot');
      setTimeout(() => {
        agregarMensaje("¿Cómo seguimos?", 'bot');
        mostrarOpciones();
      }, 1000);
    }, 500);
  } else {
    setTimeout(() => agregarMensaje("Perdón, no entendí. ¿Podés repetirlo?", 'bot'), 500);
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const texto = input.value.trim().toLowerCase();
  if (!texto) return;
  agregarMensaje(texto, 'user');
  responder(texto);
  input.value = '';
});

toggleVoiceBtn.addEventListener('click', () => {
  vozActiva = !vozActiva;
  toggleVoiceBtn.textContent = vozActiva ? "🔊 Voz Activada" : "🔇 Voz Desactivada";
});

window.speechSynthesis.onvoiceschanged = configurarVoz;

// Iniciar
agregarMensaje("¡Hola! ¿En qué puedo ayudarte hoy?", 'bot');
mostrarOpciones();
