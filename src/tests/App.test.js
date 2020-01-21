import React from 'react';
import { render } from '@testing-library/react';

import App from '../App';
import IssueList from '../IssueList'

import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import storeFactory from '../redux'

import { fetchIssues } from '../redux/actions'
import fetchMock from 'fetch-mock-jest'



const middlewares = []
const mockStore = configureStore(middlewares)
const initialState = {
  repoList: [],
  mappedIssuesToRepos: {},
  apiKey: "",
  selectedRepo: ""
}

const store = mockStore(initialState)

const repoList = []
const mappedIssuestoRepos = {}


describe('App Component', ()=> {
  test('Renders Api Key Input on First Load', () => {

    const AppComponent = render(<Provider store={store}><App /></Provider>);
    const { getByPlaceholderText } = AppComponent

    const keyInput = getByPlaceholderText('Enter Api Key Here')
    expect(keyInput).toBeInTheDocument();

  });

})

describe('Redux Store', ()=> {
  test('Initial State', () => {
    const store = storeFactory()
    const testState = store.getState()

    expect(testState).toEqual(initialState)

  })
})

