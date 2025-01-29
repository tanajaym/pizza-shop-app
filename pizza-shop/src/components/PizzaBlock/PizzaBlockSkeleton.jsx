import React from "react";
import ContentLoader from "react-content-loader";

const PizzaBlockSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#e6e6e6"
    foregroundColor="#dbdbdb"
    {...props}
  >
    <circle cx="125" cy="126" r="111" />
    <rect x="10" y="260" rx="12" ry="12" width="239" height="19" />
    <rect x="203" y="373" rx="0" ry="0" width="7" height="1" />
    <rect x="9" y="291" rx="9" ry="9" width="239" height="73" />
    <rect x="10" y="377" rx="13" ry="13" width="75" height="25" />
    <rect x="117" y="371" rx="21" ry="21" width="133" height="40" />
  </ContentLoader>
);

export default PizzaBlockSkeleton;
