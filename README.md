# Brunch + Babel/ES6 Boilerplate

This is a modern JS skeleton for [Brunch](http://brunch.io).

## Installation

Download this repo.

## Getting started

* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * Brunch plugins and app dependencies: `npm install`
* Design:
    * Cut out your mockup in files and put it in `artworks` dir.
    * `npm run prep` — prepares all components needed in `src/components/` and generate `src/main.js` with all components js.
    * if you delete the js file of a component, re-run `npm run prep` to regenerate the correct `src/main.js` file. 
* Run:
    * `npm start` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `npm run build` — builds minified project for production
* Learn:
    * `www/src/` dir is fully auto-generated and served by HTTP server.  Write your code in `src/` dir.
    * Place static files you want to be copied from `src/assets/` to `www/src/assets/`.
    * [Brunch site](http://brunch.io), [Getting started guide](https://github.com/brunch/brunch-guide#readme)
