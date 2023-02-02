import { render } from 'solid-js/web';
import { attachDevtoolsOverlay } from '@solid-devtools/overlay';
import './index.css';
import { App } from './app';

attachDevtoolsOverlay();

render(() => <App />, document.getElementById('root') as HTMLElement);
