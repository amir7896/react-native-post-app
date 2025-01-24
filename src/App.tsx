import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import {store} from './app/store';

import AppNav from './navigation/AppNav';
export default function App() {
  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <AppNav />
        </Provider>
      </NavigationContainer>{' '}
    </>
  );
}
