import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import { StyleProvider } from "@ant-design/cssinjs";
import { ToastMessage } from "./module/ToastMessage";
// slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./i18next.js";
// realTime
import * as signalR from "@aspnet/signalr";
// code connect to server
const root = ReactDOM.createRoot(document.getElementById("root"));
const DOMAIN = "https://movienew.cybersoft.edu.vn/";
export const connection = new signalR.HubConnectionBuilder()
   .withUrl(`${DOMAIN}DatVeHub`)
   .configureLogging(signalR.LogLevel.Information)
   .build();
connection.start().then(function () {
   root.render(
      <Provider store={store}>
         <StyleProvider hashPriority="high">
            <ToastMessage />
            <App />
         </StyleProvider>
      </Provider>
   );
});
// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
