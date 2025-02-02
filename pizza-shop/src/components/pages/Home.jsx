import React from "react";

import Categories from "../Categories";
import Sort from "../Sort";
import Index from "../PizzaBlock/index";
import PizzaBlockSkeleton from "../PizzaBlock/PizzaBlockSkeleton";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sort, setSort] = React.useState(0);

  React.useEffect(() => {
    fetch(`https://6797b1f3c2c861de0c6daede.mockapi.io/items`)
      .then((response) => response.json())
      .then((jsonArray) => {
        setItems(jsonArray);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((item, index) => (
              <PizzaBlockSkeleton key={index} />
            ))
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
  );
};
export default Home;
