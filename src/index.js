import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import ScrollToTop from './ScrollToTop'
const store = createStore(reducers, compose(applyMiddleware(thunk)))
// , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
ReactDOM.render(

  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop />

      <App />
    </Provider>
  </BrowserRouter>




  ,
  document.getElementById('root')
);


