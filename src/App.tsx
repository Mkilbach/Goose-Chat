import './App.css';
import './vars.css';

import { Chat } from './components/Chat';
import { Header } from './components/Header';

function App() {
  return (
    <>
      <Header />
      <h1 style={{textAlign: 'center'}}>Welcome to Goose Chat!</h1>
      <Chat />
    </>
  );
}

export default App;
