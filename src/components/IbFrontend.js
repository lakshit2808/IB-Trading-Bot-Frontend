import React from 'react'
import BotList from './botlist';
import TradeHistory from './TradeHistroy';
import {Route, Switch} from 'react-router-dom';

const IbFrontend = () => {
  return (
    <>
    <Switch>
    <Route path='/' component={BotList}/>
    <Route path='/tradeinfo' component={TradeHistory}/>
    </Switch>    
    </>
  )
}

export default IbFrontend