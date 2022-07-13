import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DOMAIN } from "./util/settings/config";
//Import đa ngôn ngữ
import i18n from "./i18n";
// Cấu hình realtime (websocket với signalR)
import * as signalR from "@aspnet/signalr";

// Kết nối đến sever láng nghe sự kiện từ sever
export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${DOMAIN}/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

connection
  .start()
  .then(() => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  })
  .catch((error) => {
    console.log(error);
  });

reportWebVitals();
