# Flexible Autocomplete

Allows you to configure your own `CompletionItem` (https://code.visualstudio.com/api/references/vscode-api#CompletionItem) with JavaScript.

## Configuration

Create a `autocomplete.config.js` file in the root of your project that exports an array of `CompletionItem` compatible objects.

## Examples

##### Display a list of color given color tuples [label, color]
```javascript
const colors = require('./src/colors');

module.exports = colors.map(([name, color], index) => ({
    insertText: color, // inserted when autocomplete is slected
    documentation: color, // for the swatch and shown in the info window
    detail: color, // shown info window that pops up on the right
    kind: 15, // vscode.CompletionItemKind.Color
    label: `${name.charAt(0).toUpperCase()}${name.slice(1)} (${color})`, // main search and display
    sortText: index.toString().padStart(4, '0'), // used to sort (this is a string)
}));
```

##### Display fonts
```javascript
const fonts = require('./src/fonts');

module.exports = fonts.map(([name, value]) => ({
    label: name,
    insertText: value,
    kind: 5,
}));
```