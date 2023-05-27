import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Router from "./router";
import "./fontawesome.js";

function App() {
   return (
      <BrowserRouter>
         {/* <Route path="home" element={<>Home</>} /> */}
         <Router />
      </BrowserRouter>
   );
}

export default App;
