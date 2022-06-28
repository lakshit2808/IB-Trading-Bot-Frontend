import React, {useState, useEffect} from 'react'
import Popup from './popupmodal/popup';
import axios from 'axios';
import Card from './Card';
import {Add} from '@material-ui/icons';

const BotList = () => {
  const [modal, setModal] = useState(false);
  const [botList, setBotList] = useState([])

  const deleteBotHandler = (index,ticker) => {
    const encoded = encodeURI(`https://tradingviewsignall.herokuapp.com/v1/bot1/userinput?ticker=${ticker}`);
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
    axios.get('https://tradingviewsignall.herokuapp.com/v1/bot1/userinput')
    .then(res => {
      setBotList(res.data);
    })
  },[])


  const addBotHandler = async (botData) => {
    await axios.post('https://tradingviewsignall.herokuapp.com/v1/bot1/userinput', {
      'ticker': botData.ticker, 'StopLoss': botData.StopLoss, 'TakeProfit': botData.TakeProfit, 'AmountToBeInvested': botData.AmountToBeInvested})
      .then(res => console.log(res))
  };

  const makePutRequest = (ticker,data) => {
    axios({
        method: 'put',
        responseType: 'json',
        url: `https://tradingviewsignall.herokuapp.com/v1/bot1/userinput${ticker}`,
        params: data
      })
        .then(res => {
            console.log(res);
        }
        )
        .catch(err => {
            console.log(err);
        }
        );
    }

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

  const updateListArray = (obj, index) => {
    let tempList = botList
    let newObj = {
      'ticker': obj.ticker,
      'stoploss': obj.StopLoss,
      'takeprofit': obj.TakeProfit,
      'amount': obj.AmountToBeInvested
    }
    makePutRequest(`${newObj.ticker}`, newObj)
    tempList[index] = obj
    setBotList(tempList)
    setTimeout(() => { window.location.reload(); }, 2000);
}


  return (
    <>
    <div className='header text-center'>
    
      <h3 className='header-text'>Interactive Broker's Trading Bots</h3>
      <button className='btn btn-primary mt-2'  onClick = {() => setModal(true)}><Add/> Create Bot</button>
      <a className='btn btn-primary mt-2' rel="noreferrer" href = "https://colab.research.google.com/drive/1iqgvxUCM18UC7lQb6fnfoRv2wsPkEh2L#scrollTo=MJyb52mAy_Yt" target="_blank" style={{position:'relative', left:'10px'}}>Bulk Update</a>
    </div>

    <div className='task-container'>
      {botList && botList.map((obj , index) => <Card Object = {obj} index = {index} deleteBot= {deleteBotHandler} updateListArray = {updateListArray}/>)}
    </div>
    <Popup modal = {modal} toggle = {toggle} save = {saveBot}></Popup>

    </>
    
  );
}

export default BotList