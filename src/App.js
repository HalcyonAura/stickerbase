import './App.css';
import Catalog from './Catalog'

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
       <h1>StickerBase</h1>
      </header>
      <Catalog/>
      <p className="App-para">Catalog your stickers here!</p>
      <footer className="App-footer">made by sunhacks with &hearts;</footer>
    </div>
  );
}

export default App;
