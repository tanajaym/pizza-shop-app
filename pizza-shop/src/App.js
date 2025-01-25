// import logo from './logo.svg';
import React from "react";
import "./App.css";
import "./scss/app.scss";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";

import pizzaDataBase from "./assets/pizzaDataBase.json";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzaDataBase.map((obj) => (
                <PizzaBlock
                  title={obj.title}
                  price={obj.price}
                  image={obj.image}
                  sizes={obj.sizes}
                  type={obj.types}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
