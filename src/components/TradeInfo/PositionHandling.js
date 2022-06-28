import React, {useState, useEffect} from 'react'
import './PositionHandling.css'
import Button from '@material-ui/core/Button';
import { CancelOutlined } from '@material-ui/icons';
import { Grid } from '@material-ui/core';
import axios from 'axios';


// ackground-color: aquamarine;
const PositionHandling = () => {

  const [Data, setData] = useState([])

  useEffect(() =>{
    axios.get('https://tradingviewsignall.herokuapp.com/v1/bot1/positionhandling')
    .then(res => {      
      setData(res.data);
    })
  },[])

  const deleteBotHandler = (index,ticker) => {
    const encoded = encodeURI(`https://tradingviewsignall.herokuapp.com/v1/bot1/positionhandling?tickerName=${ticker}`);
    let tempList = Data
    Data.splice(index, 1)
    setData(tempList)
    axios.delete(encoded)
         .then(res => {
            window.location.reload()
            console.log(res.data) 
          });
  };

  
  const addCloseHandler = async (tickerName) => {
    await axios.post('https://tradingviewsignall.herokuapp.com/v1/bot1/positionhandling/closeposition', {
      'tickerName': tickerName})
      .then(res => console.log(res))
  };

  
  const dataMap = Data.map((data, index) => {

    const handleDelete = () => {
      deleteBotHandler(index, data.tickerName)
      addCloseHandler(data.tickerName)

  }
    
    
    return (
      <div className='position-handling-container' style={{backgroundColor: 'aquamarine'}}>
    <div className='close-position-header'>
      <span className='ticker-name'>{data.tickerName}</span>
      <Button id='close-position-button' variant="contained" color="secondary" onClick={handleDelete}><b id='close-position-text'>Close Position</b><CancelOutlined id = 'close-position-icon'/></Button>
    </div>
    <div style={{height: '5px', backgroundColor: 'black'}}/>

    <Grid container spacing={2} >
      <Grid item lg={6} sm = {6} xs = {6}><div className='position-grid'><span className='position-grid-text'>Buy Price: {data.buyprice}</span></div></Grid>
      <Grid item lg={6} sm = {6} xs = {6}><div className='position-grid'><span className='position-grid-text'>PNL: <span style={{color: data.pnl > 0 ? "green" : "red"}}>{data.pnl}</span></span></div></Grid>
      <Grid item lg={6} sm = {6} xs = {6}><div className='position-grid'><span className='position-grid-text'>Buy Time: {data.buytime}</span></div></Grid>
      <Grid item lg={6} sm = {6} xs = {6}><div className='position-grid'><span className='position-grid-text'>MSP: {data.msp}</span></div></Grid>
      <Grid item lg={6} sm = {6} xs = {6}><div className='position-grid'><span className='position-grid-text'>Current Price: {data.currentPrice}</span></div></Grid>
      <Grid item lg={6} sm = {6} xs = {6}><div className='position-grid'><span className='position-grid-text'>Expected Profit: <span style={{color: 'green'}}>{data.expectedProfit}</span></span></div></Grid>
    </Grid>
    
    </div>)
  })

  let dataLength = Data.length
  return (
    <div className='position-handling-container-main'>
      

      {dataLength > 0 ? (
        <div className="content">
        
        {dataMap}
        </div>
      ) : (
        <h1>No Position are open</h1>
      )}
    </div>
  )
}

export default PositionHandling