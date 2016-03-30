console.log('React is up and running!');
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import HrsApp from './containers/HrsApp';
//import CustomerSelect from './components/CustomerSelect';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(
    <HrsApp />,
    document.getElementById('app')
);