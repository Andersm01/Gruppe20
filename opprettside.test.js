const { opprettTur } = require('./opprettside.js');

// Mocker localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

// Oppretter et 'window' objekt og legger til mock localStorage
global.window = Object.create(window);
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mocker de nødvendige DOM-elementene
document.body.innerHTML = `
  <input id="turTittel" value="TestTur">
  <textarea id="turBeskrivelse" value="TestBeskrivelse"></textarea>
  <input id="turBildeUrl" value="test.jpg">
`;

// Mocker window.alert funksjonen
const alertSpy = jest.spyOn(window, 'alert').mockImplementationOnce(() => {});

describe('Function: opprettTur', () => {
  test('Skal lage en tur og lagre den i localStorage', () => {
    // Mocker localStorage.getItem til å returnere en tom array som en string
    localStorageMock.getItem.mockReturnValueOnce('[]');

    // Kaller funksjonen som skal testes
    opprettTur();

    // Forventninger
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'lagredeTurer',
      expect.any(String)
    );

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith('Turen er opprettet!');
  });
});