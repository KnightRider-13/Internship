import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";

const TopSellers = () => {
  const dataURL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";
  const [isLoaded, setIsLoaded] = useState(false);
  const [topSellerData, setTopSellerData] = useState([]);

  useEffect(() => {
    const getTopSellerData = async () => {
      const { data } = await axios.get(dataURL);
      setTopSellerData(data);
      setIsLoaded(true);
    };
    getTopSellerData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row" data-aos="fade-up">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {isLoaded
                ? topSellerData.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index} data-aos="fade-up">
                      <div className="author_list_pp authorImageSeller__loading skeleton"></div>
                      <div className="author_list_info">
                        <span className="item__author--loading skeleton"></span>
                        <span className="item__price--loading skeleton"></span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
