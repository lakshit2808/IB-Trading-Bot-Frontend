import './App.css';
import BotList from './components/botlist';
import 'bootstrap/dist/css/bootstrap.min.css';
import TradeHistory from './components/TradeHistroy';
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path='/' component={BotList}/>
      <Route path='/tradehistory' component={TradeHistory}/>
      </Switch>
    </div>
  );
}

export default App;
