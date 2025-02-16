import React from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";

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

import { sortList } from "../Sort";

const Home = () => {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter,
  );
  const dispatch = useDispatch();
  const sortType = sort?.sortProperty;

  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);

  const [hasError, setHasError] = React.useState(false);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (pageNum) => {
    dispatch(setCurrentPage(pageNum));
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

  const skeleton = [...new Array(6)].map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));

  React.useEffect(() => {
    if (window.location.search) {
      const param = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === param.sortProperty,
      );

      dispatch(
        setFilters({
          ...param,
          sort,
        }),
      );
    }
  }, []);

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

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
  // }
};
export default Home;
