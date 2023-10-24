document.addEventListener('DOMContentLoaded', function () {
  // Verifica si el navegador soporta la Web Speech API
  if ('speechSynthesis' in window) {
    // Función para hablar el nombre del arbusto
    function speakBushName(bushName) {
      var bushMsg = new SpeechSynthesisUtterance(bushName);
      window.speechSynthesis.speak(bushMsg);
    }
    function findBushById(id){
      return id;
    }
    function SpeakBush(element){
      var bush = findBushById(element.getAttribute('id'));
      var detailsMsg = new SpeechSynthesisUtterance(id);
    }
    function findColorNameById(color) {
      return color;
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

    // Función para seleccionar objetos al azar y mostrarlos como objetivos
    function selectRandomObjects(objects, count) {
      var shuffledObjects = objects.slice();
      for (var i = shuffledObjects.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [shuffledObjects[i], shuffledObjects[j]] = [shuffledObjects[j], shuffledObjects[i]];
      }
      return shuffledObjects.slice(0, count);
    }

    // Lista de objetos disponibles
    objects = ['blue ball','red ball','green ball','blue cube','red cube','green cube','purple cone','yellow cone','light blue cone'];

    // Selecciona tres objetos al azar
    var randomObjects = selectRandomObjects(objects, 3);

    // Mostrar los objetivos en la div "text-overlay"
    var textOverlay = document.querySelector('.text-overlay');
    textOverlay.innerHTML = '';

    randomObjects.forEach(function (object) {
      var paragraph = document.createElement('p');
      paragraph.textContent = 'Encuentra: ' + object;
      textOverlay.appendChild(paragraph);
    });

    // Crear un mensaje de voz inicial
    var initialMsg = new SpeechSynthesisUtterance('This is a Park');

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