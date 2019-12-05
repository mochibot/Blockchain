import React, { useState, useEffect } from 'react';
import IdForm from './components/IdForm';
import Transactions from './components/Transactions';
import './App.css';

const App = () => {
  const [id, setId] = useState(localStorage.getItem('walletId') || '')

  return (
    <div>
      <IdForm setId={setId} />
      <Transactions id={id} />
    </div>
  );
}

export default App;
