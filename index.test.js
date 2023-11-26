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

  // Mock the necessary DOM elements
document.body.innerHTML = '<div id="lagredeTurer"></div>';

// Mock the window.confirm function
const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValueOnce(true);

// Mock the removeChild function
const lagredeTurerElement = document.getElementById('lagredeTurer');
const removeChildSpy = jest.spyOn(lagredeTurerElement, 'removeChild');

  
  describe('Function: leggTilLagredeTurer', () => {
    test('should add tours to the DOM', () => {
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
    test('should remove a tour from localStorage and update the DOM', () => {
        // Mock setup
        jest.spyOn(window, 'confirm').mockReturnValue(true);

        // Mock localStorage getItem method
        jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
            if (key === 'lagredeTurer') {
                return JSON.stringify([{ tittel: 'TestTur', beskrivelse: 'TestBeskrivelse', bildeUrl: 'test.jpg' }]);
            }
            return null;
        });

        // Mock localStorage setItem method
        jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});

        // Execute the function to be tested
        fjernTur(0);

        // Expectations
        expect(localStorage.setItem).toHaveBeenCalledWith('lagredeTurer', '[]');
        // You can add more expectations based on the behavior of fjernTur function
    });
});
  
describe('Function: leggTilTilMineturer', () => {
    test('should add a tour to Mineturer and redirect to mineturer.html', async () => {
      // Mock window.location.assign using jsdom's reconfigure method
      const { location } = window;
      delete window.location;
      window.location = { ...location, assign: jest.fn() };
  
      // Mock confirm
      const confirmMock = jest.spyOn(window, 'confirm').mockReturnValueOnce(true);
  
      // Call the function to be tested
      leggTilTilMineturer(0);
  
      // Wait for the event loop to process the click or other asynchronous actions
      await new Promise(resolve => setTimeout(resolve, 0));
  
      // Check if window.location.assign was called with the correct argument
      expect(window.location.assign).toHaveBeenCalledWith('mineturer.html');
  
      // Restore the spies
      confirmMock.mockRestore();
    });
  });

  
  
  