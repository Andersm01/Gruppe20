// opprettside.test.js

const { opprettTur } = require('./opprettside.js');

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

// Opprett et 'window' objekt og legg til mock localStorage
global.window = Object.create(window);
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock the necessary DOM elements
document.body.innerHTML = `
  <input id="turTittel" value="TestTur">
  <textarea id="turBeskrivelse" value="TestBeskrivelse"></textarea>
  <input id="turBildeUrl" value="test.jpg">
`;

// Mock the window.alert function
const alertSpy = jest.spyOn(window, 'alert').mockImplementationOnce(() => {});

describe('Function: opprettTur', () => {
  test('should create a tour and store it in localStorage without redirecting', () => {
    // Mock localStorage.getItem to return an empty array as a string
    localStorageMock.getItem.mockReturnValueOnce('[]');

    // Call the function to be tested
    opprettTur();

    // Assertions
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'lagredeTurer',
      expect.any(String)
    );

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith('Turen er opprettet!');
  });
});