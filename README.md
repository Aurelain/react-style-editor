# React Style Editor

[![Npm Version][npm-version-image]][npm-version-url]
[![License][license-image]][license-url]

A React component that displays and edits CSS, similar to the browser's DevTools.

## Features
- Parses any CSS string and formats it in a familiar fashion
- Validates each rule and each declaration using the browsers's own engine
- Facilitates commenting the CSS code through checkbox toggling
- Allows easy additions by clicking next to the desired location
- Has no dependencies (other than React)
- Is customizable through classes 
- Offers 3 output formats:
    - the code with preserved formatting
    - the prettified code
    - a machine-friendly model of the code (recursive array of objects)

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

## License
[MIT](https://github.com/Aurelain/react-style-editor/blob/master/LICENSE)