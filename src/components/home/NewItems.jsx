import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";
import Timer from "./Timer";

const NewItems = () => {
  const dataURL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";
  const [newItemData, setNewItemData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getNewItemData = async () => {
      const { data } = await axios.get(dataURL);
      setNewItemData(data);
      setIsLoaded(true);
    };
    getNewItemData();
  }, []);

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} slick-slider`} onClick={onClick}></div>
    );
  };
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={`${className} slick-slider`} onClick={onClick}></div>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...sliderSettings}>
            {isLoaded
              ? newItemData.map((nft) => (
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    key={nft.id}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${nft.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={nft.title}
                        >
                          <img className="lazy" src={nft.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {nft.expiryDate ? (
                        <div className="de_countdown"><Timer expiryDate={nft.expiryDate}/></div>
                      ) : null}
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${nft.nftId}`}>
                          <img
                            src={nft.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${nft.nftId}`}>
                          <h4>{nft.title}</h4>
                        </Link>
                        <div className="nft__item_price">{nft.price}</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{nft.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : new Array(4).fill(0).map((_, index) => (
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    key={index}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp skeleton authorImage__loading"></div>
                      <div className="nft__item_wrap skeleton"></div>
                      <div className="nft__item_info">
                        <div className="header--loading skeleton"></div>
                        <div className="nft__item_price item__price--loading skeleton"></div>
                        <div className="nft__item_like item__like--loading skeleton"></div>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
