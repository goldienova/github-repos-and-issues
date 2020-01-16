import React from 'react';
import { render } from '@testing-library/react';
import App from './App';


import { Provider } from 'react-redux'
import storeFactory from './redux'

const store = storeFactory()

test('Renders Api Key Input on First Load', () => {
  const { getByPlaceholderText } = render(<Provider store={store}><App /></Provider>);

  const keyInput = getByPlaceholderText('Enter Api Key Here')
  expect(keyInput).toBeInTheDocument();

});

