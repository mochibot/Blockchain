import React, { useState } from 'react';

const IdForm = (props) => {
  const [input, setInput] = useState('');

  const handleChange = event => {
    setInput(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    props.setId(input);
    localStorage.setItem('walletId', input);
    setInput('');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input name='id' value={input} placeholder='Enter ID' onChange={handleChange}/>
      <button>Save</button>
    </form>
  )
}

export default IdForm;