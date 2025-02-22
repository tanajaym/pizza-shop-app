import React, { useRef } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../App";
import { useSelector, useDispatch } from "react-redux";
import { fetchPizza } from "../../redux/slices/pizzaSlice";
import { pizzaDataSelector } from "../../redux/slices/pizzaSlice";

import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../redux/slices/filterSlice";
import { setItems } from "../../redux/slices/pizzaSlice";

import Categories from "../Categories";
import Sort from "../Sort";
import Index from "../PizzaBlock/index";
import PizzaBlockSkeleton from "../PizzaBlock/PizzaBlockSkeleton";
import Pagination from "../pagination/Pagination";

import { sortList } from "../Sort";

const Home = () => {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage } = useSelector(filterSelector);
  const { items, status } = useSelector(pizzaDataSelector);

  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  // const { items, status } = useSelector((state) => state.pizza);

  const sortType = sort?.sortProperty;

  const { searchValue } = React.useContext(SearchContext);

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
          id={obj.id}
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

  const getPizza = async () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // try {
    //   const response = await axios.get(
    //     `https://6797b1f3c2c861de0c6daede.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=asc${search}`,
    //   );
    dispatch(
      fetchPizza({
        category,
        search,
        sortType,
        currentPage,
      }),
    );
    //   } catch (error) {
    //     console.log(error, "FETCHING ERROR");
    //     // alert("FETCHING ERROR! PLEASE TRY LATER!");
    //   } finally {
    //     setIsLoading(false);
    //   }

    window.scrollTo(0, 0);
  };

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
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizza();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;

    //on frst render, initial, no state will be rewritten
    // but the moment, user change sth (sort, ctegory and etc)
    //it make isMounted true and render the url
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error_info">
          <h2>Произошла ошибка :(</h2>
          <p>Нам очень жаль, попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
  // }
};
export default Home;
