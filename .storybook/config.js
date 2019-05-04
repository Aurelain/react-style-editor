import {addParameters, configure} from '@storybook/react';

addParameters({options: {isFullscreen: false}});
configure(() => require('./stories.js'), module);