import React from "react";
import ContentLoader from "react-content-loader";

const PizzaBlockSkeleton = () => (
  <ContentLoader
    className="pizza-block-skeleton"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#e6e6e6"
    foregroundColor="#dbdbdb"
  >
    <circle cx="136" cy="145" r="114" />
    <rect x="6" y="279" rx="5" ry="5" width="269" height="22" />
    <rect x="6" y="316" rx="5" ry="5" width="267" height="84" />
    <rect x="7" y="416" rx="5" ry="5" width="82" height="25" />
    <rect x="153" y="417" rx="5" ry="5" width="121" height="40" />
  </ContentLoader>
);

export default PizzaBlockSkeleton;
