// Entry-point for React Native
// Do not move or rename
import {default as App} from 'src/app';
export default App;

declare var module:any;

if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept();
}
