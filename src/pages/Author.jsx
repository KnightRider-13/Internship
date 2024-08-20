import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const dataURL =
    "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=";
  const [authorData, setAuthorData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [followed, setFollowed] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getAuthorData = async () => {
      const { data } = await axios.get(`${dataURL}${id}`);
      setAuthorData(data);
      setIsLoaded(true);
    };
    getAuthorData();
  }, [id]);

  const authorArray = [authorData];

  const updateFollowers = () => {
    if(followed === false){
      authorData.followers += 1
      setFollowed(true);
    } else{
      authorData.followers -= 1
      setFollowed(false);
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            {isLoaded ? (
              authorArray.map((author) => (
                <div className="row" key={author.id}>
                  <div className="col-md-12">
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <img src={author.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.authorName}
                              <span className="profile_username">
                                {author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {author.followers} followers
                          </div>
                          {!followed ? (
                            <button
                              className="btn-main"
                              onClick={updateFollowers}
                            >
                              Follow
                            </button>
                          ) : (
                            <button
                              className="btn-main"
                              onClick={updateFollowers}
                            >
                              Unfollow
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="de_tab tab_simple">
                      <AuthorItems
                        authorNfts={author.nftCollection}
                        authorImage={author.authorImage}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar skeleton profile__avatar--loading"></div>
                      <div className="profile_name">
                        <span className="profile__name--loading skeleton"></span>
                        <span className="profile_username profile__username--loading skeleton"></span>
                        <span
                          id="wallet"
                          className="profile_wallet profile__wallet--loading skeleton"
                        ></span>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower profile__username--loading skeleton"></div>
                      </div>
                    </div>
                  </div>
                </div>
                {new Array(8).fill(0).map((_, index) => (
                  <div
                    className="col-lg-3 col-md-3 col-sm-12 col-xs-12"
                    key={index}
                  >
                    <Skeleton />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
