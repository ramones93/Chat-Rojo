const chat = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');

const respuestas = {
  hola: "¡Hola! ¿En qué puedo ayudarte hoy?",
  asociarme: "Podés asociarte desde la web oficial o acercándote a la sede de Av. Mitre.",
  partido: "El próximo partido es el domingo contra Racing, en el Libertadores de América.",
  plantel: "El plantel está compuesto por jugadores como Rey, Cauteruccio, y otros grandes.",
  cuota: "Podés pagar la cuota desde la app oficial o en la sede.",
  gracias: "¡De nada! Vamos Rojo.",
};

let leerRespuestas = true;
let vozSeleccionada = null;

// 🎤 Configurar la voz
function configurarVoz() {
  const voces = speechSynthesis.getVoices();
  vozSeleccionada = voces.find(v => v.lang === 'es-AR' && v.name.toLowerCase().includes('google'))
                  || voces.find(v => v.lang.startsWith('es') && v.name.toLowerCase().includes('male'))
                  || voces.find(v => v.lang.startsWith('es'));
}

speechSynthesis.onvoiceschanged = configurarVoz;

// 🗣️ Función para hablar
function hablar(texto) {
  if (leerRespuestas && vozSeleccionada) {
    const utter = new SpeechSynthesisUtterance(texto);
    utter.voice = vozSeleccionada;
    speechSynthesis.speak(utter);
  }
}

// 💬 Agregar mensaje al chat
function agregarMensaje(mensaje, tipo) {
  const msg = document.createElement('div');
  msg.className = `message ${tipo}`;
  msg.textContent = mensaje;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
  if (tipo === 'bot') hablar(mensaje);
}

// 🧠 Responder según intención
function responder(textoUsuario) {
  const clave = Object.keys(respuestas).find(palabra => textoUsuario.includes(palabra));
  if (clave) {
    setTimeout(() => {
      agregarMensaje(respuestas[clave], 'bot');
      setTimeout(() => {
        agregarMensaje("¿Cómo seguimos?", 'bot');
        mostrarBotones();
      }, 600);
    }, 500);
  } else {
    setTimeout(() => {
      agregarMensaje("Perdón, no entendí. ¿Podés repetirlo?", 'bot');
    }, 500);
  }
}

// 🎛️ Mostrar botones
function mostrarBotones() {
  const opciones = ['Asociarme', 'Próximo partido', 'Plantel', 'Pagar cuota'];
  const contenedor = document.createElement('div');
  contenedor.className = 'botones-opciones-vertical';
  opciones.forEach(op => {
    const boton = document.createElement('button');
    boton.className = 'boton-opcion';
    boton.textContent = op;
    boton.onclick = () => {
      agregarMensaje(op, 'user');
      responder(op.toLowerCase());
      contenedor.remove();
    };
    contenedor.appendChild(boton);
  });
  chat.appendChild(contenedor);
  chat.scrollTop = chat.scrollHeight;
}

// 🎚️ Toggle botón voz
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '🔊 Leer respuestas: ON';
toggleBtn.style.margin = '10px';
toggleBtn.style.padding = '8px 12px';
toggleBtn.style.border = 'none';
toggleBtn.style.cursor = 'pointer';
toggleBtn.style.backgroundColor = '#c62828';
toggleBtn.style.color = 'white';
toggleBtn.style.borderRadius = '6px';
toggleBtn.style.fontWeight = 'bold';
toggleBtn.onclick = () => {
  leerRespuestas = !leerRespuestas;
  toggleBtn.textContent = leerRespuestas ? '🔊 Leer respuestas: ON' : '🔇 Leer respuestas: OFF';
};
document.querySelector('.chat-container').prepend(toggleBtn);

// ⌨️ Envío de formulario
form.addEventListener('submit', e => {
  e.preventDefault();
  const texto = input.value.trim().toLowerCase();
  if (!texto) return;
  agregarMensaje(texto, 'user');
  responder(texto);
  input.value = '';
});

// 🤖 Saludo inicial y botones
setTimeout(() => {
  agregarMensaje("¡Hola! Soy el asistente de Independiente. ¿En qué te puedo ayudar?", 'bot');
  mostrarBotones();
}, 500);
