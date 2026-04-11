![# gdweb 🩷](https://raw.githubusercontent.com/dogfossils/dogfossils/refs/heads/main/media/gdweb%2018q.png)

The 4/3/2026 Geometry Dash web demo, containing the first level of the game, "Stereo Madness".  
Play here: [geometrydash.com](https://geometrydash.com)

> [!CAUTION]
> [Strictly personal use only.](https://geometrydash.com/content-policy)

## About
This is a complete reverse engineered version of the vanilla Geometry Dash web demo that doesn't entierly use AI for everything. No additional features have been added.<br>
It features my own custom representation of the file structure based on modern game enviornments, and can be compiled back into a singular, minified JavaScript file. Everything has been organized in a way that shouldn't feel like a mess of files.

> [!IMPORTANT]
> The only modification made to the code that is not present in the vanilla game is the [domain lock being commented out](https://github.com/brokemutt/gdweb/blob/1c1d347ab6baaef657b965d634abf1ead6ead42d/src/main.js#L11-L17), this bit of code disallows users to run the compiled script in other websites.
<br>

> [!NOTE]
>  The original source used [obfuscator.io](https://obfuscator.io/) to obfuscate the code, obfuscator.io is proprietary web based software.

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

---

A 3rd party documentation is available at https://deepwiki.com/brokemutt/gdweb, powered by DeepWiki. Information may not be accurate.
