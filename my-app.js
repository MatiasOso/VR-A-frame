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
      subtitleContainer.style.color = '#00FF00'; // Color de letra más oscuro
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

    // Agregar la lógica de manejo de colores y síntesis de voz para las esferas
    var spheres = document.querySelectorAll('a-sphere[color-speech]');
    spheres.forEach(function (sphere) {
      sphere.addEventListener('click', function () {
        var colorName = findColorNameById(sphere.getAttribute('data-color'));
        speakColor(colorName);

        // Muestra el subtítulo correspondiente al color
        showSubtitle(colorName);
      });
    });

    function findColorNameById(color) {
      // Puedes implementar tu lógica específica para asignar colores a IDs aquí
      // Por ahora, simplemente usaremos el valor del atributo data-color como el nombre del color
      return color;
    }

    function speakColor(colorName) {
      var colorMsg = new SpeechSynthesisUtterance(colorName + ' ball');
      window.speechSynthesis.speak(colorMsg);
    }

    function showSubtitle(colorName) {
      // Mapeo de colores a subtítulos
      var subtitleMap = {
        'red': 'Red ball',
        'green': 'Green ball',
        'blue': 'Blue ball',
        // Agrega más colores según sea necesario
      };

      var subtitleContainer = document.getElementById('subtitle-container');
      subtitleContainer.innerText = subtitleMap[colorName] || 'Subtitle not available';
      subtitleContainer.style.display = 'block';

      // Configurar un temporizador para ocultar el subtítulo después de 5 segundos (5000 milisegundos)
      var hideTimer = setTimeout(function () {
        subtitleContainer.style.display = 'none';
      }, 5000); // Duración de 5 segundos
    }
  } else {
    console.log('La síntesis de voz no es compatible con este navegador.');
  }
});
