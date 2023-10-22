document.addEventListener('DOMContentLoaded', function () {
  // Verifica si el navegador soporta la Web Speech API
  if ('speechSynthesis' in window) {
    // Función para hablar el nombre del arbusto
    function speakBushName(bushName) {
      var bushMsg = new SpeechSynthesisUtterance(bushName);
      window.speechSynthesis.speak(bushMsg);
      
    }

    // Función para hablar tanto el color como la forma
    function speakObjectDetails(element) {
      var colorName = findColorNameById(element.getAttribute('data-color'));
      var shapeName = element.getAttribute('data-shape');
      var detailsMsg = new SpeechSynthesisUtterance(colorName + ' ' + shapeName);
      window.speechSynthesis.speak(detailsMsg);
    }

    // Función para mostrar un subtítulo
    function showSubtitle(text) {
      var subtitleContainer = document.getElementById('subtitle-container');
      subtitleContainer.innerText = text;
      subtitleContainer.style.display = 'block';

      // Configurar un temporizador para ocultar el subtítulo después de 5 segundos (5000 milisegundos)
      var hideTimer = setTimeout(function () {
        subtitleContainer.style.display = 'none';
      }, 5000); // Duración de 5 segundos
    }

    // Agregar la lógica de manejo de clics en los arbustos
    var bushes = document.querySelectorAll('.bush');
    bushes.forEach(function (bush) {
      bush.addEventListener('click', function () {
        var bushName = bush.getAttribute('data-name');
        speakBushName(bushName);

        // Muestra el nombre del arbusto como subtítulo
        showSubtitle(bushName);
      });
    });

    // Agregar la lógica de manejo de colores y síntesis de voz para las esferas y cuadrados
    var elements = document.querySelectorAll('a-sphere[color-speech], a-box[color-speech], a-cone[color-speech]');
    elements.forEach(function (element) {
      element.addEventListener('click', function () {
        speakObjectDetails(element);

        // Muestra los detalles como subtítulo
        showSubtitle(element.getAttribute('data-color') + ' ' + element.getAttribute('data-shape'));
      });
    });

    function findColorNameById(color) {
      // Puedes implementar tu lógica específica para asignar colores a IDs aquí
      // Por ahora, simplemente usaremos el valor del atributo data-color como el nombre del color
      return color;
    }

    // Crear un mensaje de voz inicial
    var initialMsg = new SpeechSynthesisUtterance('This is a Park');

    // Configurar opciones si es necesario
    // initialMsg.volume = 1;
    // initialMsg.rate = 1;
    // initialMsg.pitch = 1;

    // Configurar un retraso de 2 segundos (2000 milisegundos)
    setTimeout(function () {
      // Mostrar el subtítulo inicial después del retraso
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

      // Configurar un temporizador para ocultar el subtítulo inicial después de 5 segundos (5000 milisegundos)
      var hideTimer = setTimeout(function () {
        subtitleContainer.style.display = 'none';
      }, 5000); // Duración de 5 segundos

      // Configurar un evento de teclado para ocultar el subtítulo al presionar cualquier tecla
      window.addEventListener('keydown', function () {
        subtitleContainer.style.display = 'none';
        // Cancelar el temporizador si se oculta manualmente
        clearTimeout(hideTimer);
      });

      // Hablar el mensaje inicial
      window.speechSynthesis.speak(initialMsg);
    }, 2000); // Retraso de 2 segundos
  } else {
    console.log('La síntesis de voz no es compatible con este navegador.');
  }
});
