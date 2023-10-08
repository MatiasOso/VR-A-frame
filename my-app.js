// my-app.js
document.addEventListener('DOMContentLoaded', function () {
  // Verifica si el navegador soporta la Web Speech API
  if ('speechSynthesis' in window) {
    // Crear un mensaje de voz
    var msg = new SpeechSynthesisUtterance('This is a Park');

    // Configurar opciones si es necesario
    // msg.volume = 1;
    // msg.rate = 1;
    // msg.pitch = 1;

    // Configurar un retraso de 2 segundos (2000 milisegundos)
    setTimeout(function () {
      // Mostrar el subtítulo después del retraso
      var subtitleContainer = document.createElement('div');
      subtitleContainer.id = 'subtitle-container';
      subtitleContainer.style.position = 'fixed';
      subtitleContainer.style.bottom = '0';
      subtitleContainer.style.left = '50%';
      subtitleContainer.style.transform = 'translateX(-50%)';
      subtitleContainer.style.padding = '20px';
      subtitleContainer.style.fontSize = '24px'; // Tamaño de letra más grande
      subtitleContainer.style.color = '#00FF59'; // Color de letra más oscuro
      subtitleContainer.style.textAlign = 'center';
      subtitleContainer.innerText = 'This is a Park / Este es un Parque';
      document.body.appendChild(subtitleContainer);

      // Configurar un temporizador para ocultar el subtítulo después de 5 segundos (5000 milisegundos)
      var hideTimer = setTimeout(function () {
        subtitleContainer.style.display = 'none';
      }, 5000); // Duración de 5 segundos

      // Configurar un evento de teclado para ocultar el subtítulo al presionar cualquier tecla
      window.addEventListener('keydown', function () {
        subtitleContainer.style.display = 'none';
        // Cancelar el temporizador si se oculta manualmente
        clearTimeout(hideTimer);
      });

      // Hablar el mensaje
      window.speechSynthesis.speak(msg);
    }, 2000); // Retraso de 2 segundos
  } else {
    console.log('La síntesis de voz no es compatible con este navegador.');
  }
});
