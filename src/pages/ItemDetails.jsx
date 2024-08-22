import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const dataURL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=";
  const [nftData, setNftData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getNftData = async () => {
      const { data } = await axios.get(`${dataURL}${id}`);
      setNftData(data);
      setIsLoaded(true);
    };
    window.scrollTo(0, 0);
    getNftData();
  }, [id]);

  const nftDataArray = [nftData];

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {isLoaded ? (
              nftDataArray.map((nft) => (
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={nft.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>
                        {nft.title} #{nft.tag}
                      </h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nft.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nft.likes}
                        </div>
                      </div>
                      <p>{nft.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nft.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={nft.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nft.ownerId}`}>
                                {nft.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nft.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={nft.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nft.creatorId}`}>
                                {nft.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nft.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="row">
                <div className="col-md-6 text-center nft__image--loading skeleton"></div>
                <div className="col-md-6">
                  <div className="item_info">
                    <div className="nft__header--loading skeleton"></div>
                    <div className="item_info_counts">
                      <div className="item_info_views skeleton"></div>
                      <div className="item_info_views skeleton"></div>
                    </div>
                    <p></p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author nft__items--loading">
                          <div className="author_list_pp nft__authorImage--loading skeleton"></div>
                        </div>
                        <div className="author_list_info nft__author--loading skeleton"></div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author nft__items--loading">
                          <div className="author_list_pp nft__authorImage--loading skeleton"></div>
                        </div>
                        <div className="author_list_info nft__author--loading skeleton"></div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price nft__price--loading skeleton"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
