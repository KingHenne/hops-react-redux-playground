import React from 'react';
import {Provider} from 'react-redux';
import {StaticRouter, createStaticHistory} from 'universal-react-router-redux';

import config from 'hops-config';
import {combineContexts, render} from 'hops-react';

import {App} from './app';
import {ReactContext, ReduxContext} from './context';
import reducers from './reducers';
import {routes} from './routes';

class NodeReduxContext extends ReduxContext {
  constructor(options) {
    super(options);

    this.historyOptions = {
      basename: config.basePath,
      location: options.request && options.request.path,
      context: {},
    };
  }

  createHistory() {
    return createStaticHistory(this.historyOptions);
  }

  getTemplateData(templateData) {
    return {
      ...templateData,
      routerContext: this.historyOptions.context,
    };
  }

  enhanceElement(element) {
    return (
      <Provider store={this.getStore()}>
        <StaticRouter
          context={this.historyOptions.context}
          history={this.getHistory()}
          routes={routes}
        >
          {element}
        </StaticRouter>
      </Provider>
    );
  }
}

const createContext = combineContexts(ReactContext, NodeReduxContext);

export default render(<App />, createContext({reducers}));
