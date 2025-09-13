import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [dbStatus, setDbStatus] = useState('');

  useEffect(() => {
    // Fetch from the root endpoint
    fetch('http://localhost:5000/')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching root:', error));

    // Fetch from the db endpoint
    fetch('http://localhost:5000/db')
      .then(response => response.text())
      .then(data => setDbStatus(data))
      .catch(error => console.error('Error fetching db status:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Docker React Flask Postgres</h1>
        <div className="card">
          <h2>Mensagem do Back-end:</h2>
          <p>{message || 'Carregando...'}</p>
        </div>
        <div className="card">
          <h2>Status do Banco de Dados:</h2>
          <p>{dbStatus || 'Carregando...'}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
