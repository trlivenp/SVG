const fs = require('fs');
const inquirer = require('inquirer');

function createSVG(userInput) {
  const { text, textColor, shape, shapeColor } = userInput;

  // Basic validation - ensure required fields are present
  if (!text || !textColor || !shape || !shapeColor) {
    throw new Error('Invalid user input. Please provide all required values.');
  }

  // SVG template based on the user input
  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <text x="50%" y="50%" font-size="20" fill="${textColor}" text-anchor="middle">${text}</text>
      <${shape} cx="150" cy="100" r="50" fill="${shapeColor}" />
    </svg>
  `;

  return svgContent;
}

function generateSVG(userInput) {
  const svgContent = createSVG(userInput);

  fs.writeFileSync('logo.svg', svgContent);
}

async function commandLineApp() {
  const userInput = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: (input) => input.length <= 3,
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (keyword or hexadecimal number):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hexadecimal number):',
    },
  ]);

  generateSVG(userInput);

  console.log('Generated logo.svg');
}

// Run the command line app
commandLineApp();

