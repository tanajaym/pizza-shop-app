// import logo from './logo.svg';
import React from "react";
import "./App.css";
import "./scss/app.scss";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import Index from "./components/PizzaBlock";
import PizzaBlockSkeleton from "./components/PizzaBlock/PizzaBlockSkeleton";
function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`https://6797b1f3c2c861de0c6daede.mockapi.io/items`)
        .then((response) => response.json())
        .then((jsonArray) => {
          setItems(jsonArray);
          setIsLoading(false);
        });
  }, []);

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
                { isLoading
                    ? [...new Array(6)].map((item, index) => <PizzaBlockSkeleton key={index} />)
                    : items.map((obj) => (
                        <Index
                            key={obj.id}
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
