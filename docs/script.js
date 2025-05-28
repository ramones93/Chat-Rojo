const chat = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');

// Crear y mostrar botón para activar/desactivar voz
const toggleVozBtn = document.createElement('button');
toggleVozBtn.textContent = '🔊 Leer respuestas: ON';
toggleVozBtn.style.margin = '10px auto';
toggleVozBtn.style.display = 'block';
toggleVozBtn.style.padding = '8px 16px';
toggleVozBtn.style.backgroundColor = '#c62828';
toggleVozBtn.style.color = 'white';
toggleVozBtn.style.border = 'none';
toggleVozBtn.style.borderRadius = '10px';
toggleVozBtn.style.fontWeight = 'bold';
toggleVozBtn.style.cursor = 'pointer';
toggleVozBtn.style.maxWidth = '200px';
document.querySelector('.chat-container').insertBefore(toggleVozBtn, chat);

let leerVoz = localStorage.getItem('leerVoz');
if (leerVoz === null) {
  leerVoz = 'on'; // por defecto ON
  localStorage.setItem('leerVoz', leerVoz);
}
actualizarTextoBoton();

toggleVozBtn.onclick = () => {
  leerVoz = leerVoz === 'on' ? 'off' : 'on';
  localStorage.setItem('leerVoz', leerVoz);
  actualizarTextoBoton();
};

function actualizarTextoBoton() {
  toggleVozBtn.textContent = leerVoz === 'on' ? '🔊 Leer respuestas: ON' : '🔇 Leer respuestas: OFF';
}

const respuestas = {
  asociarme: "¡Genial! Podés asociarte desde nuestra web oficial: https://clubaindependiente.com.ar/asociate",
  partido: "El próximo partido es este domingo a las 19:00 hs en el Libertadores de América.",
  plantel: "Podés ver el plantel actual en nuestra web: https://clubaindependiente.com.ar/plantel",
  cuota: "Podés pagar la cuota desde el portal de socios: https://socios.clubaindependiente.com.ar",
};

function hablarTexto(texto) {
  if (leerVoz === 'off') return; // Si está apagado, no hablar
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'es-AR';
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  } else {
    console.warn("Tu navegador no soporta síntesis de voz.");
  }
}

function agregarMensaje(mensaje, tipo) {
  const msg = document.createElement('div');
  msg.className = `message ${tipo}`;
  msg.textContent = mensaje;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;

  if (tipo === 'bot') {
    hablarTexto(mensaje);
  }
}

function mostrarBotonesOpciones() {
  const contenedor = document.createElement('div');
  contenedor.className = 'botones-opciones';

  const opciones = [
    { texto: "Asociarme", clave: "asociarme" },
    { texto: "Próximo partido", clave: "partido" },
    { texto: "Plantel", clave: "plantel" },
    { texto: "Pagar Cuota", clave: "cuota" },
  ];

  opciones.forEach(op => {
    const boton = document.createElement('button');
    boton.className = 'boton-opcion';
    boton.textContent = op.texto;
    boton.onclick = () => {
      agregarMensaje(op.texto, 'user');
      responder(op.clave);
      contenedor.remove();
    };
    contenedor.appendChild(boton);
  });

  chat.appendChild(contenedor);
}

function responder(textoUsuario) {
  const clave = Object.keys(respuestas).find(palabra => textoUsuario.includes(palabra));
  if (clave) {
    setTimeout(() => {
      agregarMensaje(respuestas[clave], 'bot');
      setTimeout(() => {
        agregarMensaje("¿Cómo seguimos?", 'bot');
        mostrarBotonesOpciones();
      }, 600);
    }, 500);
  } else {
    setTimeout(() => {
      agregarMensaje("Perdón, no entendí. ¿Podés repetirlo?", 'bot');
      setTimeout(() => {
        agregarMensaje("¿Cómo seguimos?", 'bot');
        mostrarBotonesOpciones();
      }, 600);
    }, 500);
  }
}

window.onload = () => {
  agregarMensaje("¡Hola! Soy el asistente virtual de Independiente. ¿En qué puedo ayudarte?", 'bot');
  mostrarBotonesOpciones();
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const texto = input.value.trim().toLowerCase();
  if (!texto) return;
  agregarMensaje(texto, 'user');
  responder(texto);
  input.value = '';
});
