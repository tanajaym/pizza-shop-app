import React from "react";
import axios from "axios";
import { SearchContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../../redux/slices/filterSlice";

import Categories from "../Categories";
import Sort from "../Sort";
import Index from "../PizzaBlock/index";
import PizzaBlockSkeleton from "../PizzaBlock/PizzaBlockSkeleton";
import Pagination from "../pagination/Pagination";
import NotFoundPage from "./NotFoundPage";

const Home = () => {
  const { categoryId, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const sortType = sort?.sortProperty;

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [hasError, setHasError] = React.useState(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  // const onChangeSort = (sort) => {
  //   dispatch(setCategoryId(sort));
  // };

  const pizzas = Array.isArray(items)
    ? items.map((obj) => (
        <Index
          key={obj.id}
          title={obj.title}
          price={obj.price}
          image={obj.image}
          sizes={obj.sizes}
          type={obj.types}
        />
      ))
    : [];
  //cheks wether it has a string. If not - place a

  const skeleton = [...new Array(6)].map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));

  React.useEffect(() => {
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    axios
      .get(
        `https://6797b1f3c2c861de0c6daede.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=asc${search}`,
      )
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      })

      .catch((error) => {
        console.error("Ошибка при запросе данных:", error);
        setIsLoading(false);
        setHasError(true);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination onChangePage={(pageNum) => setCurrentPage(pageNum)} />
    </div>
  );
  // }
};
export default Home;
