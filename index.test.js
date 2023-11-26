jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(JSON.stringify([]));
jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

const {
    leggTilLagredeTurer,
    fjernTur,
    leggTilTilMineturer
  } = require('./index.js');

  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

// Mocker nødvendige DOM-elementer
document.body.innerHTML = '<div id="lagredeTurer"></div>';

// Mocker window.confirm funksjonen
const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValueOnce(true);

// Mocker removeChild funksjonen
const lagredeTurerElement = document.getElementById('lagredeTurer');
const removeChildSpy = jest.spyOn(lagredeTurerElement, 'removeChild');

  
  describe('Function: leggTilLagredeTurer', () => {
    test('Skal legge til turer i DOM', () => {
      document.body.innerHTML = '<div id="lagredeTurer"></div>';
      localStorage.getItem.mockReturnValueOnce(
        JSON.stringify([{ tittel: 'TestTur', beskrivelse: 'TestBeskrivelse', bildeUrl: 'test.jpg' }])
      );
  
      leggTilLagredeTurer();
  
      const lagredeTurerElement = document.getElementById('lagredeTurer');
      expect(lagredeTurerElement.innerHTML).toContain('TestTur');
      expect(lagredeTurerElement.innerHTML).toContain('TestBeskrivelse');
      expect(lagredeTurerElement.innerHTML).toContain('test.jpg');
    });
  });
  
describe('Function: fjernTur', () => {
    test('Skal fjerne en tur fra localStorages og oppdatere DOM', () => {
        // Mocker oppsettet
        jest.spyOn(window, 'confirm').mockReturnValue(true);

        // Mocker localStorage getItem metode
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'lagredeTurer') {
                return JSON.stringify([{ tittel: 'TestTur', beskrivelse: 'TestBeskrivelse', bildeUrl: 'test.jpg' }]);
            }
            return null;
        });

        // Mocker localStorage setItem metode
        jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

        // Utfører funksjonen som skal testes
        fjernTur(0);

        // Forventninger
        expect(localStorage.setItem).toHaveBeenCalledWith('lagredeTurer', '[]');
    });
});
  
describe('Function: leggTilTilMineturer', () => {
    test('Skal legge til en tur i Mineturer og ta deg til siden mineturer.html', async () => {
      // Mocker window.location.assign ved å bruke jsdom's reconfigure metode
      const { location } = window;
      delete window.location;
      window.location = { ...location, assign: jest.fn() };
  
      // Bekrefter mocken
      const confirmMock = jest.spyOn(window, 'confirm').mockReturnValueOnce(true);
  
      // Kaller på funksjonen som skal testes
      leggTilTilMineturer(0);
  
      // Venter på at event loopen registrerer klikket eller andre asynkrone handlinger
      await new Promise(resolve => setTimeout(resolve, 0));
  
      // Sjekk om window.location.assign ble kalt med riktig argument
      expect(window.location.assign).toHaveBeenCalledWith('mineturer.html');
  
      // Gjenoppretter spies
      confirmMock.mockRestore();
    });
  });

  
  
  