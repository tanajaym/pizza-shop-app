import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PizzaInfoCart.scss";

const PizzaInfoCart: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    image: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://6797b1f3c2c861de0c6daede.mockapi.io/items/` + id,
        );
        setPizza(data);
      } catch (error) {
        console.log("error fetching pizzaInfo");
        alert("error fetching pizzaInfo");
        navigate("/");
      }
    }

    fetchData();
  }, []);

  if (!pizza) return <>Loading...</>;

  console.log(pizza);

  return (
    <div className="containerInfo">
      <div className="containerInfo__img">
        <picture data-type="pizza">
          <img alt="pizza image" src={pizza.image} />
        </picture>
      </div>

      <div className="containerInfo__textInfo">
        <div className="textInfo__title">
          <h2>{pizza.title}</h2>
        </div>
        <div className="textInfo__description">
          <p>This is your pizza description. It's really delicious!</p>
        </div>
        <div className="textInfo__price">
          <h4>{pizza.price} р.</h4>
        </div>
      </div>
    </div>
  );
};

export default PizzaInfoCart;
