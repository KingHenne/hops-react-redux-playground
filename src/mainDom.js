import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'universal-react-router-redux';

import config from 'hops-config';
import {combineContexts, render} from 'hops-react';

import {App} from './app';
import {ReactContext, ReduxContext} from './context';
import reducers from './reducers';
import {routes} from './routes';

class DomReduxContext extends ReduxContext {
  createHistory() {
    return createBrowserHistory({basename: config.basePath});
  }

  enhanceElement(element) {
    return (
      <Provider store={this.getStore()}>
        <ConnectedRouter history={this.getHistory()} routes={routes}>
          {element}
        </ConnectedRouter>
      </Provider>
    );
  }
}

const createContext = combineContexts(ReactContext, DomReduxContext);

export default render(<App />, createContext({reducers}));
