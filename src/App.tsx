import * as React from 'react';
import {Provider} from 'react-redux';

import {store} from './app/store';

import AppNav from './navigation/AppNav';
export default function App() {
  return (
    <>
      <Provider store={store}>
        <AppNav />
      </Provider>
    </>
  );
}
