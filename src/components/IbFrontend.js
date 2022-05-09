import React from 'react'
import BotList from './botlist';
import {Route, Switch} from 'react-router-dom';

const IbFrontend = () => {
  return (
    <>
    <Switch>
    <Route path='/' component={BotList}/>
    </Switch>    
    </>
  )
}

export default IbFrontend