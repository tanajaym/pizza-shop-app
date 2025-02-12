import React from "react";
import axios from "axios";
import qs from "qs";
import { SearchContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../redux/slices/filterSlice";

import Categories from "../Categories";
import Sort from "../Sort";
import Index from "../PizzaBlock/index";
import PizzaBlockSkeleton from "../PizzaBlock/PizzaBlockSkeleton";
import Pagination from "../pagination/Pagination";
import NotFoundPage from "./NotFoundPage";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter,
  );

  const sortType = sort?.sortProperty;

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  // const [currentPage, setCurrentPage] = React.useState(1);

  const { searchValue } = React.useContext(SearchContext);

  ///////
  //calling data from redux
  ///////
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangeCurrentPage = (num) => {
    dispatch(setCurrentPage(num));
  };

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

  ///////
  //skeleton
  ///////

  const skeleton = [...new Array(6)].map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));

  ///////
  //
  ///////
  React.useEffect(() => {
    if (window.location.search) {
      const param = qs.parse(window.location.search.substring(1));
      dispatch(
        setFilters({
          ...param,
        }),
      );
    }
  });
  ///////
  //getting data
  ///////
  React.useEffect(() => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const sortBy = sort?.sortProperty;

    axios
      .get(
        `https://6797b1f3c2c861de0c6daede.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=desc${search}`,
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

  ///////
  //parsing url
  ///////

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sortType,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType, currentPage]);
  //error

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangeCurrentPage}
      />
    </div>
  );
  // }
};
export default Home;
