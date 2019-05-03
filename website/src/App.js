import React from 'react';
import StyleEditor from 'react-style-editor';

import './App.css';


class App extends React.Component {

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

export default App;
