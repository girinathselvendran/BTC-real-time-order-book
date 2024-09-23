import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.scss";
import { OrderBook } from "./components/orderBookNew/OrderBook";

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="app__header">
          <h1>Live BTC/USD Order Book</h1>
        </header>
        <main className="app__content">
          <OrderBook />
        </main>
      </div>
    </Provider>
  );
};

export default App;
