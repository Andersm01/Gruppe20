jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
const { leggTilITurerListe } = require('./tur.js');
    
// Mocker localStorage for testingen
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
};
    
describe('Function: leggTilITurerListe', () => {
    test('Skal legge til en tur i Mineturer og vise en varsling', () => {
    // Mocker DOM-elementer
    document.body.innerHTML = `
        <div class="tour">
        <img src="test.jpg" alt="TestTur">
        <div class="tour-info">
            <h1 class="tour-title">TestTur</h1>
            <div class="tour-description">
                <p>Beskrivelse av testtur.</p>
            </div>
            <a href="#" class="btn" onclick="leggTilITurerListe()">Bestill tur</a>
        </div>
        </div>
    `;
    
    const alertSpy = jest.spyOn(window, 'alert').mockImplementationOnce(() => {});
    const localStorageSpy = jest.spyOn(localStorage, 'setItem');
    
    leggTilITurerListe();
    
    expect(localStorageSpy).toHaveBeenCalledWith(
        'mineturer',
        '[{"tittel":"TestTur","beskrivelse":"Beskrivelse av testtur.","bildeUrl":"test.jpg"}]'
    );
    expect(alertSpy).toHaveBeenCalledWith('Turen er lagt til i din tur-liste på mineturer!');
    alertSpy.mockRestore();
    localStorageSpy.mockRestore();
    });
});
  