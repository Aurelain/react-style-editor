import {addParameters, configure} from '@storybook/react';

addParameters({options: {isFullscreen: true}});
configure(() => require('../src/index.js'), module);