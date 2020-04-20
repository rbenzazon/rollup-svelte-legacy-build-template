# rollup svelte legacy template

This is a project template for [Svelte](https://svelte.dev) apps.
Using rollup and babel to produce a IE compatible build while supporting code splitting

## manual install

If you want to use this template on an existing svelte + rollup project follow these steps :

install babel
```bash
npm install --save-dev rollup-plugin-babel  
```
install babel core
```bash
npm install --save-dev @babel/core  
```
for dynamic import support
```bash
npm install --save-dev @babel/plugin-syntax-dynamic-import
```
not sure what it does
```bash
npm install --save-dev @babel/plugin-transform-runtime
```
legacy browser target
```bash
npm install --save-dev @babel/preset-env
```
contains polyfills
```bash
npm install --save core-js@3
```
add in rollup.config.js
```javascript
import babel from 'rollup-plugin-babel'

export default {
//...
plugins: [
    babel({
        extensions: [ '.js', '.mjs', '.html', '.svelte' ],
        runtimeHelpers: true,
        exclude: [ 'node_modules/@babel/**','node_modules/core-js/**' ],
        presets: [
            [
            '@babel/preset-env',
            {
                targets: '> 0.25%, not dead',
                useBuiltIns: 'usage',
                corejs: 3
            }
            ]
        ],
        plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
            '@babel/plugin-transform-runtime',
            {
                useESModules: true
            }
            ]
        ]
        })
//...
]}
```
in the html code use this to refer to your main.js
```html
<script defer data-main="/build/main.js" src='/require.js'></script>
```
where /require.js is the path to require.js found at this address :
[require.js](https://requirejs.org/docs/release/2.3.3/minified/require.js)

## Get started

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```
