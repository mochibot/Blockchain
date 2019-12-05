import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Transaction from './Transaction';

const Transactions = (props) => {
  const [wallet, setWallet] = useState([]);
  const [balance, setBalance] = useState(0);
  const [page, setPage] = useState(0);
  
  useEffect(() => {
    if (props.id) {
      fetchWallet(props.id);
    }
  }, [props.id])

  const fetchWallet = (id) => {
    axios.get('http://localhost:5000/chain')
      .then(response => {
        let transactions = [];
        let newBalance = 0
        response.data.chain.forEach(block => {
          block.transactions.forEach(transaction => {
            if (transaction.recipient === props.id || transaction.sender === props.id) {
              transactions.push(transaction);
              let amount = transaction.recipient === props.id ? transaction.amount : transaction.amount * -1;
              newBalance += amount
            }
          })
        })
        console.log(transactions);
        setWallet(transactions);
        setBalance(newBalance);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const refresh = () => {
    if (props.id) {
      fetchWallet(props.id);
    }
  }

  const changePage = (num) => {
    setPage(page + num);
  }

  return (
    <div>
      <h2>Wallet for ID: {props.id ? props.id : 'Not set' }</h2>
      <button onClick={refresh}>Refresh</button>
      <div className='Transaction'>
        <div>Sender</div>
        <div>Recipient</div>
        <div>Amount</div>
      </div>
      {wallet.length > 0 && wallet.slice(page, page + 10).map((item, index) => <Transaction key={index} transaction={item} id={props.id}/>)}
      <button onClick={() => changePage(-10)} disabled={page <= 0}>Previous</button>
      <button onClick={() => changePage(10)} disabled={wallet.length < page + 10}>Next</button>
      <h2>Total Balance: {balance}</h2>
    </div>
  )
}

export default Transactions;