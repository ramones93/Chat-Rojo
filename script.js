const chat = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');

// Simulación de respuestas según input
const respuestas = {
  hola: "¡Hola! ¿En qué puedo ayudarte hoy?",
  bici: "¿Estás buscando una bicicleta de montaña o urbana?",
  gracias: "¡De nada! Estoy para ayudarte.",
};

function agregarMensaje(mensaje, tipo) {
  const msg = document.createElement('div');
  msg.className = `message ${tipo}`;
  msg.textContent = mensaje;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function responder(textoUsuario) {
  const clave = Object.keys(respuestas).find(palabra => textoUsuario.includes(palabra));
  if (clave) {
    setTimeout(() => agregarMensaje(respuestas[clave], 'bot'), 500);
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
