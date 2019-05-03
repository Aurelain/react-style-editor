import {addParameters, configure} from '@storybook/react';

addParameters({options: {isFullscreen: true}});
configure(() => require('./stories.js'), module);