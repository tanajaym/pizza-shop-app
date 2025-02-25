import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: any;
  //FIX
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  // const [activeIndex, setActiveIndex] = React.useState(0);

  const categoryList = [
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
        {categoryList.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Categories;
