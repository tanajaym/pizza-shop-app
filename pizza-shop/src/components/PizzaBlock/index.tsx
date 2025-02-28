// import React, { useState } from "react";
//тк я добавила React.useState(0), то не надо импортировать{ useState }
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { addItems, CartItemsType } from "../../redux/slices/cartSlice";
import { getCartItemsByIdSelector } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  image: string;
  sizes: number[];
  type: number[];
};

const pizzaTypes = ["тонкое", "традиционное"];

const Index: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  image,
  sizes,
  type,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(getCartItemsByIdSelector(id));
  //here I get all items from added pizzas

  const addedCount = cartItem ? cartItem.count : 0;

  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);

  const onClickAdd = () => {
    const items: CartItemsType = {
      id,
      title,
      price,
      image,
      type: pizzaTypes[activeType],
      sizes: sizes[activeSize],
      count: 0,
    };
    dispatch(addItems(items));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/PizzaInfo/${id}/`}>
          {/*<img className="pizza-block__image" src={image} alt="Pizza" />*/}
          <picture data-type="pizza" className="sc-1nf33xi-0 kCbxGq">
            {/*<source*/}
            {/*  srcSet="https://media.dodostatic.net/image/r:366x366/0194d4f6904975a5a6427e297591980d.avif 366w,https://media.dodostatic.net/image/r:584x584/0194d4f6904975a5a6427e297591980d.avif 584w,https://media.dodostatic.net/image/r:760x760/0194d4f6904975a5a6427e297591980d.avif 760w,https://media.dodostatic.net/image/r:1875x1875/0194d4f6904975a5a6427e297591980d.avif 1875w"*/}
            {/*  sizes="584px"*/}
            {/*/>*/}
            {/*<source*/}
            {/*  srcSet="https://media.dodostatic.net/image/r:366x366/0194d4f6904975a5a6427e297591980d.webp 366w,https://media.dodostatic.net/image/r:584x584/0194d4f6904975a5a6427e297591980d.webp 584w,https://media.dodostatic.net/image/r:760x760/0194d4f6904975a5a6427e297591980d.webp 760w,https://media.dodostatic.net/image/r:1875x1875/0194d4f6904975a5a6427e297591980d.webp 1875w"*/}
            {/*  sizes="584px"*/}
            {/*/>*/}
            {/*<source*/}
            {/*  srcSet="https://media.dodostatic.net/image/r:366x366/0194d4f6904975a5a6427e297591980d.png 366w,https://media.dodostatic.net/image/r:584x584/0194d4f6904975a5a6427e297591980d.png 584w,https://media.dodostatic.net/image/r:760x760/0194d4f6904975a5a6427e297591980d.png 760w,https://media.dodostatic.net/image/r:1875x1875/0194d4f6904975a5a6427e297591980d.png 1875w"*/}
            {/*  sizes="584px"*/}
            {/*/>*/}
            <img
              alt="Мясной микс с говядиной и колбасками"
              title="Мясной микс с говядиной и колбасками"
              className="img"
              src="https://media.dodostatic.net/image/r:292x292/0194d4f6904975a5a6427e297591980d.jpg"
            />
          </picture>
        </Link>
        <Link to={`/PizzaInfo/${id}/`}>
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {type?.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? "active" : ""}
              >
                {pizzaTypes[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes?.map((size, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price}</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Index;
