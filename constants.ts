import { Device } from './types';

export const DEFAULT_HTML = `
<div class="container">
  <h1>Welcome to the Live Code Previewer!</h1>
  <p>Edit the code on the left to see your changes here in real-time.</p>
  <button id="myButton">Click Me!</button>
</div>
`;

export const DEFAULT_CSS = `
:root {
  --background: #F0F2F5;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --card-background: #FFFFFF;
  --accent-color: #3b82f6;
  --accent-hover: #2563eb;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--background);
  color: var(--text-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  text-align: center;
  background-image: radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0);
  background-size: 20px 20px;
}

.container {
  background: var(--card-background);
  padding: 2rem 3rem;
  border-radius: 16px;
  box-shadow: 0 10px 40px var(--shadow-color);
  border: 1px solid #e5e7eb;
}

h1 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

#myButton {
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

#myButton:hover {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

#myButton:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}
`;

export const DEFAULT_JS = `
const button = document.getElementById('myButton');

const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
let currentIndex = 0;

button.addEventListener('click', () => {
  // Change button color
  currentIndex = (currentIndex + 1) % colors.length;
  button.style.backgroundColor = colors[currentIndex];
  button.style.boxShadow = \`0 4px 15px \${colors[currentIndex]}4D\`; // Change shadow color too

  // You can still use console.log, it will show up in your browser's dev tools!
  console.log('Button clicked! New color:', colors[currentIndex]);
});
`;

export const DEVICES: Device[] = [
  { name: 'Desktop', width: '100%', height: '100%' },
  { name: 'Tablet', width: '768px', height: '1024px' },
  { name: 'Mobile', width: '375px', height: '812px' },
];
