import React from "react";

import styles from "./search.module.scss";

export const Search = () => {
  return (
    <>
      <input className={styles.root} placeholder="Найди пиццу..." />
    </>
  );
};
