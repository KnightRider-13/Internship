import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/style.css";
import NftTile from "../UI/NftTile";
import Skeleton from "../UI/Skeleton";

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
              ? newItemData.map((nft) => <NftTile nfts={nft} key={nft.id} />)
              : new Array(4).fill(0).map((_, index) => (
                  <div
                    className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    key={index}
                  >
                    <Skeleton />
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
