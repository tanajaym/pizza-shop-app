import React from "react";

export default function Categories({ value, onClickCategory }) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categiryList = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  // const onClickCategory = (index) => {
  //   setActiveIndex(index);
  // };
  return (
    <div className="categories">
      <ul>
        {categiryList.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
