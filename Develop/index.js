const fs = require('fs');
const inquirer = require('inquirer');

function createSVG(userInput) {
  const { text, textColor = '#000000', shape, shapeColor } = userInput;

  // Basic validation - ensure required fields are present
  if (!text || !shape || !shapeColor) {
    throw new Error('Invalid user input. Please provide all required values.');
  }

  let shapeElement = '';

  switch (shape) {
    case 'circle':
      shapeElement = `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
      break;
    case 'triangle':
      shapeElement = `<polygon points="150,50 100,150 200,150" fill="${shapeColor}" />`;
      break;
    case 'square':
      shapeElement = `<rect x="100" y="50" width="100" height="100" fill="${shapeColor}" />`;
      break;
    default:
      throw new Error(`Unsupported shape: ${shape}`);
  }

  // SVG template based on the user input
  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapeElement}
      <text x="50%" y="50%" font-size="20" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
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

