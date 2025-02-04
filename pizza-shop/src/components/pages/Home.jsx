import React from "react";

import Categories from "../Categories";
import Sort from "../Sort";
import Index from "../PizzaBlock/index";
import PizzaBlockSkeleton from "../PizzaBlock/PizzaBlockSkeleton";

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sort, setSort] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const pizzas = items
    .filter((obj) => {
      if (obj?.title?.includes(searchValue)) return true;
      return false;
    })
    .map((obj) => (
      <Index
        key={obj.id}
        title={obj.title}
        price={obj.price}
        image={obj.image}
        sizes={obj.sizes}
        type={obj.types}
      />
    ));

  const skeleton = [...new Array(6)].map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));

  React.useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    fetch(
      `https://6797b1f3c2c861de0c6daede.mockapi.io/items?${category}&sortBy=${sort.sortProperty}&order=desc`,
    )
      .then((response) => response.json())
      .then((jsonArray) => {
        setItems(jsonArray);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sort} onChangeSort={(sortId) => setSort(sortId)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
    </div>
  );
};
export default Home;
