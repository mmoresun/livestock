import "./App.css";
import { io } from "socket.io-client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { store } from "./index";
import { v4 as uuidv4 } from 'uuid';

// connect to server
const ENDPOINT = 'https://mytickers.herokuapp.com/';
const socket = io(ENDPOINT);
socket.on("connect", () => console.log(socket.connected));
socket.emit("start");

socket.on("ticker", function (quotes) {

  store.dispatch({ // dispatch new data to the reducer
    type: "NEW_QUOTES",
    payload: quotes
  });

});

function App() {

  const mytickers = useSelector((state) => state); // get access to the state in the store

  useEffect(() => { // re-render the page when mytickers changes

    // console.log("state changed"); 

  }, [mytickers]);

  return (
    <div>
      <div className="wrapper__main">
        <div
          className='tickercolumn__main'>
          Ticker
          {mytickers.map((item) => {
            return <h5
              key={uuidv4()}>
              {item.ticker}
            </h5>
          })}
        </div>

        <div
          className='tickercolumn__main'>
          Exchange
          {mytickers.map((item) => {
            return <h5
              key={uuidv4()}>
              {item.exchange}
            </h5>
          })}
        </div>

        <div
          className='tickercolumn__main'>
          Prices
          {mytickers ?
            mytickers.map((item) => {
              return <h5
                key={uuidv4()}
                style={{ color: item.isIncreased ? 'green' : 'red' }}
              >{item.price}&nbsp;{item.isIncreased ? <i className="fa-solid fa-arrow-up"></i> : <i className="fa-solid fa-arrow-down"></i>}</h5>;
            })
            : 'none'}
        </div>

        <div
          className='tickercolumn__main'>
          Price Change
          {mytickers.map((item) => {
            return <h5
              key={uuidv4()}>
              {item.change}
            </h5>
          })}
        </div>

        <div
          className='tickercolumn__main'>
          Percent Change
          {mytickers.map((item) => {
            return <h5
              key={uuidv4()}>
              {item.change_percent}
            </h5>
          })}
        </div>

        <div
          className='tickercolumn__main'>
          Dividend
          {mytickers.map((item) => {
            return <h5
              key={uuidv4()}>
              {item.dividend}
            </h5>
          })}
        </div>

        <div
          className='tickercolumn__main'>
          Yield
          {mytickers.map((item) => {
            return <h5
              key={uuidv4()}>
              {item.yield}
            </h5>
          })}
        </div>

        <div
          className='tickercolumn__main'>
          Last Trade Time
          {mytickers.map((item) => {
            return <h5
              key={uuidv4()}>
              {item.last_trade_time && new Date(item.last_trade_time).toLocaleString('en', { timeStyle: 'medium', dateStyle: 'medium' })}
            </h5>
          })}
        </div>
      </div>
      <h6>Powered by socket.io, React.js/Redux, HTML/CSS, server side hosted by Heroku. All prices are randomly generated</h6>
    </div>
  );
}

export default App;
