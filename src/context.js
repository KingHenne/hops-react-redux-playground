import createMemoryHistory from 'history/createMemoryHistory';
import {routerMiddleware, routerReducer} from 'universal-react-router-redux';

import {ReactContext as HopsReactContext} from 'hops-react';
import {ReduxContext as HopsReduxContext} from 'hops-redux';

export class ReactContext extends HopsReactContext {
  enhanceElement(element) {
    return element;
  }
}

export class ReduxContext extends HopsReduxContext {
  constructor(options) {
    super(options);
    this.registerReducer('router', routerReducer);
  }

  createHistory() {
    return createMemoryHistory();
  }

  getHistory() {
    return this.history || (this.history = this.createHistory());
  }

  getMiddlewares() {
    return [routerMiddleware(this.getHistory())];
  }
}
