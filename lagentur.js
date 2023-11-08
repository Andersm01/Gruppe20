        // Funksjon for å opprette en artikkel
        function opprettArtikkel() {
            // Opprett en ny artikkel-element
            var artikkel = document.createElement('article');

            // Legg til innhold i artikkelen
            artikkel.innerHTML = '<h2>Overskrift</h2><p>Dette er innholdet i artikkelen.</p>';

            // Legg artikkelen til i artikkelContainer
            var artikkelContainer = document.getElementById('artikkelContainer');
            artikkelContainer.appendChild(artikkel);
        }

        // Lytt etter klikk på knappen
        var opprettArtikkelKnapp = document.getElementById('opprettArtikkel');
        opprettArtikkelKnapp.addEventListener('click', opprettArtikkel);