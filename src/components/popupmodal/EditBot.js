import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';

const EditBot = ({modal, toggle, updateTask, taskObj}) => {

    const [ticker, setTicker] = useState('');
    const [stoploss, setStoploss] = useState('');
    const [amount, setAmount] = useState('');
    const [takeprofit, setTakeprofit] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target

        if(name === "ticker"){
            setTicker(value)
        }else if(name === "stoploss"){
            setStoploss(value)
        }else if(name === "amount"){
            setAmount(value)
        }else if(name === "takeprofit"){
            setTakeprofit(value)
        }
    }

    
    useEffect(() => {
        setTicker(taskObj.ticker)
        setStoploss(taskObj.StopLoss)
        setTakeprofit(taskObj.TakeProfit)
        setAmount(taskObj.AmountToBeInvested)
    }, [taskObj])



    const handleUpdate = (e) => {
        e.preventDefault()
        let tempObj = {}
        tempObj["ticker"] = ticker
        tempObj["StopLoss"] = stoploss
        tempObj["TakeProfit"] = takeprofit
        tempObj["AmountToBeInvested"] = amount
        updateTask(tempObj)

    }

  return (
    <div>
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Bot</ModalHeader>
            <ModalBody>
            
                <form>
                    <div className = "form-group" style={{marginBottom: "10px"}}>
                        <label>Ticker:</label>
                        <input type="text" className = "form-control" placeholder='AAPL' value = {ticker} onChange = {handleChange} name = "ticker" disabled/>
                    </div>
                    <div className = "form-group" style={{marginBottom: "10px"}}>
                        <label>Stop Loss:</label>
                        <input type="number" step="0.001" className = "form-control" placeholder='2.0' value = {stoploss} onChange = {handleChange} name = "stoploss"/>
                    </div>
                    <div className = "form-group" style={{marginBottom: "10px"}}>
                        <label>Take Profit:</label>
                        <input type="number" step="0.001" className = "form-control" placeholder='4.0' value = {takeprofit} onChange = {handleChange} name = "takeprofit"/>
                    </div>
                    <div className = "form-group" style={{marginBottom: "10px"}}>
                        <label>Investment:</label>
                        <input type="number" step="0.001" className = "form-control" placeholder='1000' value = {amount} onChange = {handleChange} name = "amount"/>
                    </div>
                </form>
                
            </ModalBody>
            <ModalFooter>

            <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>

            </ModalFooter>
        </Modal>
    </div>
  )
}

export default EditBot;
