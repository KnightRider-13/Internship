import React from "react";

const Skeleton = () => {
  return (
    <div className="nft__item" data-aos="fade-left">
                    <div className="author_list_pp skeleton authorImage__loading"></div>
                    <div className="nft__item_wrap skeleton"></div>
                    <div className="nft__item_info">
                      <div className="header--loading skeleton"></div>
                      <div className="nft__item_price item__price--loading skeleton"></div>
                      <div className="nft__item_like item__like--loading skeleton"></div>
                    </div>
                  </div>
  );
};

export default Skeleton;
