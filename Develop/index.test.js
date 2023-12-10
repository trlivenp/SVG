const commandLineApp = require('./index.js').default;

describe('commandLineApp', () => {
  // Test case 1: Valid input
  test('should generate SVG for valid input', async () => {
    // Using Jest's mock functions to mock dependencies
    const mockInput = {
      text: 'ABC',
      textColor: 'red',
      shape: 'circle',
      shapeColor: '#00FF00',
    };

    // Mock inquirer.prompt to return the user input
    jest.spyOn(inquirer, 'prompt').mockResolvedValue(mockInput);

    // Mock fs.writeFileSync to avoid actual file writing during tests
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    // Run the function
    await commandLineApp();

    // Assert that inquirer.prompt was called with the correct questions
    expect(inquirer.prompt).toHaveBeenCalledWith(/* questions array */);

    // Assert that fs.writeFileSync was called with the correct filename and content
    expect(fs.writeFileSync).toHaveBeenCalledWith('logo.svg', /* expected SVG content */);

    // Assert console.log output
    expect(console.log).toHaveBeenCalledWith('Generated logo.svg');
  });

  // Test case 2: Input validation
  test('should handle invalid input with proper validation message', async () => {
    // Mock inquirer.prompt to simulate invalid input (e.g., text longer than 3 characters)
    jest.spyOn(inquirer, 'prompt').mockResolvedValue({ text: 'InvalidInput', textColor: 'red', shape: 'circle', shapeColor: '#00FF00' });

    // Mock fs.writeFileSync to avoid actual file writing during tests
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    // Run the function
    await commandLineApp();

    // Assert that inquirer.prompt was called with the correct questions
    expect(inquirer.prompt).toHaveBeenCalledWith(/* questions array */);

    
    expect(console.log).toHaveBeenCalledWith('Generated logo.svg');
    
  });

  
});
