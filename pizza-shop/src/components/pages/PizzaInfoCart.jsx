import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PizzaInfoCart = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState();
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

  if (!pizza) return "Loading...";

  return (
    <div className="contentainer">
      <img src={pizza.img} alt="pizza image" />
      <h2>{pizza.title}</h2>
      <p>This is your pizza description</p>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default PizzaInfoCart;
