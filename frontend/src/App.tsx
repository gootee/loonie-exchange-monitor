import React from 'react';
import './App.scss';
import './custom.scss';
// import TestAPI from './components/TestAPI'
import Header from './components/Header'
import Main from './components/Main'

function App() {
  return (
    <div className="App container-fluid vh-100">
      <Header />      
      <Main />
    </div>
  );
}

export default App;
