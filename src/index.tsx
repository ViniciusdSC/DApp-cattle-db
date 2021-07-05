import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import App from './core';
import Theme from 'config/theme';

require('dotenv').config()

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={(provider) => {
      return new Web3Provider(provider)
    }}>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
);