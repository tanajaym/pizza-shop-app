import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchPizza } from "../../redux/slices/pizzaSlice";
import { pizzaDataSelector } from "../../redux/slices/pizzaSlice";

import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../redux/slices/filterSlice";

import Categories from "../Categories";
import Sort from "../Sort";
import Index from "../PizzaBlock";
import PizzaBlockSkeleton from "../PizzaBlock/PizzaBlockSkeleton";
import Pagination from "../pagination/Pagination";

import { sortList } from "../Sort";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage, searchValue } =
      useSelector(filterSelector);

  const { items, status } = useSelector(pizzaDataSelector);

  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const sortType = sort?.sortProperty;

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (pageNum: number) => {
    dispatch(setCurrentPage(pageNum));
  };

  const pizzas = Array.isArray(items)
      ? items.map((obj) => (
          // <Link to={`/PizzaInfo/${obj.id}/`} key={obj.id}>
          <Index
              key={obj.id}
              id={obj.id}
              title={obj.title}
              price={obj.price}
              image={obj.image}
              sizes={obj.sizes}
              type={obj.types}
          />
          //       </Link>
      ))
      : [];
  //cheks wether it has a string. If not - place a

  const skeleton = [...new Array(6)].map((_, index) => (
      <PizzaBlockSkeleton key={index} />
  ));

  const getPizza = async () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
        //FIX
        //@ts-ignore
        fetchPizza({
          category,
          search,
          sortType,
          currentPage,
        }),
    );

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
