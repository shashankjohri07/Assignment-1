import React from "react";
import ReactDOM from "react-dom";
import ExplorinAcademy from "./ExplorinAcademy";

const testData = {
  name: "Explorin Academy",
  count: 3,
  images: [
    { url: "https://via.placeholder.com/38", ready: true, error: false },
    { url: "https://via.placeholder.com/38", ready: false, error: true },
    { url: "https://via.placeholder.com/38", ready: true, error: false },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <ExplorinAcademy {...testData} />
  </React.StrictMode>,
  document.getElementById("root")
);