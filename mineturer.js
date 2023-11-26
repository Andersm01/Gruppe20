// mineturer.js
window.onload = function() {
    var turerDiv = document.getElementById('turer-liste');
    var mineturer = JSON.parse(localStorage.getItem('mineturer')) || [];

    mineturer.forEach(function(tur, index) {
      var turElement = document.createElement('div');
      turElement.classList.add('tour');
      turElement.innerHTML = `
        <img src="${tur.bildeUrl}" alt="${tur.tittel}">
        <div class="tour-details">
          <h2 class="tour-title">${tur.tittel}</h2>
          <p class="tour-description">${tur.beskrivelse}</p>
          <button class="remove-btn" data-index="${index}">Fjern</button>
        </div>
      `;
      turerDiv.appendChild(turElement);
    });

    turerDiv.addEventListener('click', function(event) {
      if (event.target.classList.contains('remove-btn')) {
        var indexToRemove = event.target.dataset.index;
        mineturer.splice(indexToRemove, 1);
        localStorage.setItem('mineturer', JSON.stringify(mineturer));
        event.target.closest('.tour').remove(); // Fjerner hele tour-elementet
      }
    });
  };