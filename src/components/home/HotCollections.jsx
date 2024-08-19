import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";

const HotCollections = () => {
  const dataURL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections";
  const [collectionData, setCollectionData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const getCollectionData = async () => {
      const { data } = await axios.get(dataURL);
      setCollectionData(data);
      setIsLoaded(true);
    };
    getCollectionData();
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...sliderSettings}>
            {isLoaded
              ? collectionData.map((nft) => (
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={nft.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${nft.nftId}`}>
                          <img
                            src={nft.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${nft.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={nft.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{nft.title}</h4>
                        </Link>
                        <span>ERC-{nft.code}</span>
                      </div>
                    </div>
                  </div>
                ))
              : new Array(4).fill(0).map((_, index) => (
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap skeleton">
                      </div>
                      <div className="nft_coll_pp skeleton authorImage__loading">
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <div className="skeleton header__loading"></div>
                        <div className="skeleton span__loading"></div>
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

export default HotCollections;
