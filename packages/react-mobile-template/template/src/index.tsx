import React from "react";
import ReactDOM from "react-dom";
import rem from 'dylan-rem';
import "./index.less";
import App from "./App";

rem.init({
  designWidth: 375,
  rootValue: 37.5,
  maxRatio: 2
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
