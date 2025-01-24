import React from "react";

export default function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categiryList = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onClickCategory = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="categories">
      <ul>
        {categiryList.map((value, index) => (
          <li
            onClick={(value) => onClickCategory(index)}
            className={activeIndex === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
        {/*<li*/}
        {/*  onClick={() => onClickCategory(0)}*/}
        {/*  className={activeIndex === 0 ? "active" : ""}*/}
        {/*>*/}
        {/*  Все*/}
        {/*</li>*/}
        {/*<li*/}
        {/*  onClick={() => onClickCategory(1)}*/}
        {/*  className={activeIndex === 1 ? "active" : ""}*/}
        {/*>*/}
        {/*  Мясные*/}
        {/*</li>*/}
        {/*<li*/}
        {/*  onClick={() => onClickCategory(2)}*/}
        {/*  className={activeIndex === 2 ? "active" : ""}*/}
        {/*>*/}
        {/*  Вегетарианская*/}
        {/*</li>*/}
        {/*<li*/}
        {/*  onClick={() => onClickCategory(3)}*/}
        {/*  className={activeIndex === 3 ? "active" : ""}*/}
        {/*>*/}
        {/*  Гриль*/}
        {/*</li>*/}
        {/*<li*/}
        {/*  onClick={() => onClickCategory(4)}*/}
        {/*  className={activeIndex === 4 ? "active" : ""}*/}
        {/*>*/}
        {/*  Острые*/}
        {/*</li>*/}
        {/*<li*/}
        {/*  onClick={() => onClickCategory(5)}*/}
        {/*  className={activeIndex === 5 ? "active" : ""}*/}
        {/*>*/}
        {/*  Закрытые*/}
        {/*</li>*/}
      </ul>
    </div>
  );
}
