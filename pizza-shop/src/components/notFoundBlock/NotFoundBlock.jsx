import React from "react";

import styles from "../notFoundBlock/NotfoundBlock.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span> 🥲</span>
        <br></br>
        Oops.. Page Not Found..
      </h1>

      <p className={styles.descriprion}>Let's choose Pizza in our catalogue!</p>
    </div>
  );
};

export default NotFoundPage;
