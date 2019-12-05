import React from 'react';

const Transaction = (props) => {
  const color = props.id && props.id === props.transaction.sender ? 'red' : 'black';

  return (
    <div className='Transaction' style={{color: color}}>
      <div>{props.transaction.sender}</div>
      <div>{props.transaction.recipient}</div>
      <div>{props.transaction.amount}</div>
    </div>
  )
}

export default Transaction;