import React from "react";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const categoryList = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
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
