# React Style Editor

[![Npm Version][npm-version-image]][npm-version-url]   [![Size][bundlephobia-image]][bundlephobia-url]



A React component that displays and edits CSS, similar to the browser's DevTools.

## Features
- Parses any CSS string and formats it in a familiar fashion
- Validates each rule and each declaration using the browsers's own engine
- Facilitates commenting the CSS code through checkbox toggling
- Allows easy additions by clicking next to the desired location
- Has no dependencies (other than React)
- Is tiny (< 10 KB minified)
- Is customizable through classes 
- Offers 3 output formats:
    - the code with preserved formatting
    - a machine-friendly model of the code (recursive array of objects)
    - the prettified code

## Installation

```sh
npm i react-style-editor
```

## Usage

```js
import React from 'react'
import StyleEditor from 'react-style-editor'

class Component extends React.Component {

    render() {
        return (
            <StyleEditor
                css={`
                    div {color:red;}
                    /* Hello, World! */
                    @media screen {
                        article {
                            display: flex;
                        }
                    }
                `}
            />
        )
    }
}
```

## API
TODO

## Ideas for the future
- Live demo
- Color swatches (similar to the browser)
- Dropdown suggestions for properties/values (similar to the browser)
- Ability to copy/delete fragments of code
- Keyboard support for `TAB`, `:` and `UP`, `DOWN`
- Prop for automatically mutating the code *after* validation
- Theme support (similar to the browser)
- Toggle view mode: tree/original
- Undo/redo
- Better code quality through `propTypes`
- Better comment rendering (some comments look better inline rather than block)
- Filters (similar to the browser)
- Error messages displayed in the warning-sign's tooltip

[npm-version-image]: https://img.shields.io/npm/v/react-style-editor.svg?style=flat-square
[npm-version-url]: https://www.npmjs.com/package/react-style-editor

[bundlephobia-image]: https://img.shields.io/bundlephobia/minzip/react-style-editor.svg?style=flat-square
[bundlephobia-url]: https://bundlephobia.com/result?p=react-style-editor