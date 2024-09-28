/* eslint-disable react/no-deprecated */
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './AppRouter'; // ไม่จำเป็นต้อง import AppRouter ซ้ำ
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);
