import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [dbStatus, setDbStatus] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(res => res.text())
      .then(data => setMessage(data));

    fetch('http://localhost:5000/db')
      .then(res => res.text())
      .then(data => setDbStatus(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Front-end</h1>
        <p>Message from back-end: {message}</p>
        <p>Database status: {dbStatus}</p>
      </header>
    </div>
  );
}

export default App;
