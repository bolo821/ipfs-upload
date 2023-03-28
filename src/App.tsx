import React from 'react';
import logo from './logo.svg';
import './App.css';

import * as IPFS from 'ipfs-core';

function App() {
  React.useEffect(() => {
    const fun = async () => {
      const ipfs = await IPFS.create({ repo: 'bolo' + Math.random() })
      const { path } = await ipfs.add('Hello world')
      console.info("https://ipfs.io/ipfs/" + path)
    }

    fun();
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
