import logo from "./logo.svg";
import "./App.css";
import Speech from "./Speech/Speech";
import { useState } from "react";

function App() {
  const [refrech, setrefrech] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          onClick={() => {
            setrefrech(!refrech);
          }}
          className="App-logo"
          alt="logo"
        />
        <Speech refrech={refrech} />
      </header>
    </div>
  );
}

export default App;
