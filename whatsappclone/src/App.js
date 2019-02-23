import React,{Component} from 'react';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Routerx} from './components/Routerx';
import firebase from 'firebase';

import reducers from '../src/reducers';


export default class App extends Component{
  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyAFJjEqxtiB05Jn2gIEiI2ObJH1PnQJF44",
      authDomain: "fir-app-eda60.firebaseapp.com",
      databaseURL: "https://fir-app-eda60.firebaseio.com",
      projectId: "fir-app-eda60",
      storageBucket: "fir-app-eda60.appspot.com",
      messagingSenderId: "195135016254"
    });
  }

  render(){
    return(
        <Provider store={createStore(reducers,{},applyMiddleware(ReduxThunk))}>
          <Routerx/>
       </Provider>
    )
  }
}