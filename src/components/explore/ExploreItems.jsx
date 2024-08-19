import React, { useEffect, useState } from "react";
import axios from "axios";
import NftTile from "../UI/NftTile";

const ExploreItems = () => {
  const dataURL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
  const [exploreData, setExploreData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [slice, setSlice] = useState(8);

  useEffect(() => {
    const getExploreData = async () => {
      const { data } = await axios.get(dataURL);
      setExploreData(data);
      setIsLoaded(true);
    };

    getExploreData();
  }, []);

  const filterNfts = async (event) => {
    const filterValue = event.target.value;
    const { data } = await axios.get(`${dataURL}?filter=${filterValue}`);
    setExploreData(data);
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={filterNfts}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoaded
        ? exploreData.slice(0, slice).map((nft) => (
            <div
              key={nft.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <NftTile nfts={nft} />
            </div>
          ))
        : new Array(8).fill(0).map((_, index) => (
          <div
          className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
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
      <div className="col-md-12 text-center">
        {slice < exploreData.length ? (
            <button
              id="loadmore"
              className="btn-main lead"
              onClick={() => {setSlice(slice + 4)}}
            >
              Load more
            </button>
          ) : null}
      </div>
    </>
  );
};

export default ExploreItems;
