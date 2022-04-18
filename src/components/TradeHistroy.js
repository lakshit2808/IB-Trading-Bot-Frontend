import React from 'react'
import { Link } from 'react-router-dom'

const TradeHistroy = () => {
  return (
    <>
    <div className='header text-center'>
      <h3>Interactive Broker's Trading Bots</h3>
      <Link to='/' className='btn btn-primary mt-2' style={{marginLeft: "5px"}}>Create Bots</Link>
    </div>    
    </>
  )
}

export default TradeHistroy