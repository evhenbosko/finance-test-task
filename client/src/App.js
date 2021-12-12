
import './App.css';
import io from 'socket.io-client'
import React,{useEffect, useState} from 'react';
import Ticker from './components/ticker/ticker';
import { useDispatch, useSelector } from 'react-redux';
function App() {
  
 const dispatch= useDispatch()
 const tickers =useSelector(state=> state.tickers)
 let socket = null;
 let [vals,setVals]=useState(tickers)

    useEffect(()=>{
     socket = io.connect('http://localhost:4000');
     socket.emit('start')
     console.log('connected');
     socket.on('ticker', (data) => {
        setVals(data);
        console.log(data);
});       
},[])


  
 setInterval(() => {
  dispatch({type:"FETCH",payload:vals})
 }, 10000); 


return (
<div >{
tickers.map((values,index)=>{
    return(<div className='field'>
      <p className='ticker'>{values.ticker}</p>
      <p className='price'>{values.price}</p>
      <p className='change'>{values.change}</p>
      <p className='exchange'>{values.exchange}</p>
      <p className='change_percent'>{values.change_percent+"%"}</p>
      <p className='last_trade_time'>{values.last_trade_time}</p>
      <p className='dividend'>{values.dividend}</p>
      <p className='yield'>{values.yield}</p>
    </div>
    )
  })
  }
  <Ticker/>

 <button/>
</div>
  );
}

export default App;
