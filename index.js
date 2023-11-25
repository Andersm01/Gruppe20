function leggTilTilMineturer(index) {
    var lagredeTurer = JSON.parse(localStorage.getItem('lagredeTurer')) || [];
    var valgtTur = lagredeTurer[index];

    var mineturer = JSON.parse(localStorage.getItem('mineturer')) || [];
    mineturer.push(valgtTur);
    localStorage.setItem('mineturer', JSON.stringify(mineturer));

    alert('Turen er lagt til i Mineturer-siden.');

    // Naviger til mineturer.html etter å ha lagt til turen
    window.location.href = 'mineturer.html';
  }

  function leggTilLagredeTurer() {
  var lagredeTurer = JSON.parse(localStorage.getItem('lagredeTurer')) || [];
  var lagredeTurerElement = document.getElementById('lagredeTurer');

  lagredeTurer.forEach(function(tur, index) {
    var turElement = document.createElement('div');
    turElement.classList.add('tour');
    turElement.innerHTML = `
      <img src="${tur.bildeUrl}" alt="${tur.tittel}">
      <div class="tour-info">
        <div class="tour-description">
          <h1>${tur.tittel}</h1>
          <p>${tur.beskrivelse}</p>
          <button class="fjern" onclick="fjernTur(${index})">Fjern</button>
          <button class="bestill" onclick="leggTilTilMineturer(${index})">Bestill tur</button>
        </div>
      </div>
    `;

    lagredeTurerElement.appendChild(turElement);
  });
}


    function fjernTur(index) {
      var lagredeTurer = JSON.parse(localStorage.getItem('lagredeTurer')) || [];

      if (confirm('Er du sikker på at du vil fjerne denne turen?')) {
        lagredeTurer.splice(index, 1);
        localStorage.setItem('lagredeTurer', JSON.stringify(lagredeTurer));

        var lagredeTurerElement = document.getElementById('lagredeTurer');
        lagredeTurerElement.innerHTML = ''; // Tømmer beholderen

        // Oppdater visningen ved å legge til de gjenværende turene igjen
        leggTilLagredeTurer();
      }
    }

    // Kjør funksjonen for å legge til lagrede turer når siden lastes
    leggTilLagredeTurer();