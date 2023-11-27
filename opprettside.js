// opprettside.js
function opprettTur() {
    // Hent verdier fra skjemaet
    var tittel = document.getElementById('turTittel').value;
    var beskrivelse = document.getElementById('turBeskrivelse').value;
    var bildeUrl = document.getElementById('turBildeUrl').value;

    // Opprett turinfo-objektet
    var turInfo = {
      tittel: tittel,
      beskrivelse: beskrivelse,
      bildeUrl: bildeUrl
      // Legg til flere detaljer om turen om nødvendig
    };

    // Hent lagrede turer eller opprett ny liste
    var lagredeTurer = JSON.parse(localStorage.getItem('lagredeTurer')) || [];
    lagredeTurer.push(turInfo);

    // Lagre den opprettede turen
    localStorage.setItem('lagredeTurer', JSON.stringify(lagredeTurer));
    
    // Gi en tilbakemelding eller naviger til index.html
    alert('Turen er opprettet!')
      window.location.href = 'index.html'; // Naviger til index.html
  
  }

  module.exports = { opprettTur };