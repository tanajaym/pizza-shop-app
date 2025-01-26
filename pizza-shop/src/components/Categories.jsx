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
            key={index}
            onClick={(value) => onClickCategory(index)}
            className={activeIndex === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}
