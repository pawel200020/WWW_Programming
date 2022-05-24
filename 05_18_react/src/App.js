import logo from './logo.svg';
import './App.css';
import TextComponent from "./Text";
import ListComponent from "./List";
import HrefComponent from "./Href";
import List from "./List";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TextComponent/>
        <ListComponent></ListComponent>
        <HrefComponent/>
      </header>
    </div>
  );
}

export default App;
