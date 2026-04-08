![# gdweb 🩷](https://raw.githubusercontent.com/dogfossils/dogfossils/refs/heads/main/media/gdweb%2018q.png)

The 4/3/2026 Geometry Dash web demo, containing the first level of the game, "Stereo Madness".  
Play here: [geometrydash.com](https://geometrydash.com)

[Strictly personal use only.](https://geometrydash.com/content-policy)

## About
This is a reverse-engineered version of the game. It features my own custom representation of the file structure and can be compiled back into a singular, minified JavaScript file.

> **Note:** The original source used [obfuscator.io](https://obfuscator.io/) to obfuscate the code.

## Development
You can work with this project in two ways:

### 1. Live Development
Test the game instantly without building by serving the root directory with a local web server.
> Example: Run `npx serve` in the root folder and open `index.html`.

### 2. Build for Production
To compile the game into a single optimized file:
1. Install dependencies: `npm install`
2. Build the project: `npm run build`

The final game will be generated in the `dist` folder. The contents in `src` will be compiled into one file, located in `dist/assets` called `index-game.js`.

> **Note:** The original domain lock present in `main.js` was commented out.
