function leggTilITurerListe() {
    var tittel = document.querySelector('.tour-title').textContent;
    var beskrivelse = document.querySelector('.tour-description p').textContent;
    var bildeUrl = document.querySelector('.tour img').getAttribute('src');

    var turInfo = {
      tittel: tittel,
      beskrivelse: beskrivelse,
      bildeUrl: bildeUrl
      // Legg til flere detaljer om turen hvis nødvendig
    };

    var mineturer = JSON.parse(localStorage.getItem('mineturer')) || [];
    mineturer.push(turInfo);
    localStorage.setItem('mineturer', JSON.stringify(mineturer));

    alert('Turen er lagt til i din tur-liste på mineturer!');
  }