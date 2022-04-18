import React, {useState, useEffect} from 'react'
import Popup from './popupmodal/popup';
import axios from 'axios';
import Card from './Card';

const BotList = () => {
  const [modal, setModal] = useState(false);
  const [botList, setBotList] = useState([])

  const deleteBotHandler = (index,ticker) => {
    const encoded = encodeURI(`https://api-tradingview.herokuapp.com/v1/bot1/userinput?ticker=${ticker}`);
    let tempList = botList
    botList.splice(index, 1)
    setBotList(tempList)
    axios.delete(encoded)
         .then(res => {
            window.location.reload()
            console.log(res.data) 
          });
  };

  useEffect(() =>{
    axios.get('https://api-tradingview.herokuapp.com/v1/bot1/userinput')
    .then(res => {
      setBotList(res.data);
    })
  },[])


  const addBotHandler = (botData) => {
    axios.post('https://api-tradingview.herokuapp.com/v1/bot1/userinput', {
      'ticker': botData.ticker, 'StopLoss': botData.StopLoss, 'TakeProfit': botData.TakeProfit, 'leverage': botData.AmountToBeInvested})
      .then(res => console.log(res))
  };

  const toggle = () => {
    setModal(!modal);
  }

  const saveBot = (botObj) => {
    let tempList = botList
    tempList.push(botObj)
    console.log(botObj)
    addBotHandler(botObj)
    setBotList(botList)
    setModal(false)
  }



  return (
    <>
    <div className='header text-center'>
      <h3>Interactive Broker's Trading Bots</h3>
      <button className='btn btn-primary mt-2'  onClick = {() => setModal(true)}>Create Bot</button>
    </div>

    <div className='task-container'>
      {botList && botList.map((obj , index) => <Card Object = {obj} index = {index} deleteBot= {deleteBotHandler}/>)}
    </div>
    <Popup modal = {modal} toggle = {toggle} save = {saveBot}></Popup>

    </>
    
  );
}

export default BotList