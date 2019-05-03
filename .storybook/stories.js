import React from 'react';
import {storiesOf} from '@storybook/react';
import StyleEditor from '../src/components/StyleEditor';





const large = `
div {
    background-color:red;
    back/*foo*/ground:blue;
    color:red; /* short comment*/
    overflow:hidden;
    /*border:none;*/
    foo: bar;
    font-weight: 
}
/*span {color:red}*/
@supports      (display: flex) {
    @media screen and (min-width: 900px) {
        div {
            display: flex;
        }
        /*
        GIANT COMMENT:
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus aliquet est ut quam rutrum fringilla. Suspendisse et odio. Sed fringilla risus vel est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam auctor mi quis eros. Morbi justo nulla, lobortis imperdiet, consequat at, auctor ut, tortor. Sed est ipsum, posuere dictum, egestas ac, aliquam eu, sapien. Aenean ornare enim at mi. Phasellus id libero viverra felis elementum lobortis. Curabitur nec sapien gravida lacus lobortis tempor. Quisque eget mi a turpis rutrum venenatis. Nam tempus luctus nunc. Nulla ut orci ac est laoreet malesuada.
        */
        @media screen {
            div {
                color:lime;
            }
        }
    }
}
`;

let nameCount = 0;
const name = (param) => param || 'C' + nameCount++;


storiesOf('StyleEditor', module)
.add('large', () => <StyleEditor css={large} onChange={data => console.log('data:',data)}/>)
.add(name(), () => <StyleEditor css={`@import 'custom.css';`}/>)
.add(name(), () => <StyleEditor/>)
.add(name(), () => <StyleEditor css={`0div{mother:father;font-weight:bold}`}/>)
.add(name(), () => <StyleEditor css={`div{background-color:red;background:blue;}`}/>)
.add(name(), () => <StyleEditor css={` {mother:;: bold}`}/>)
;

