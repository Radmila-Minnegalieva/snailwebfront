import React from "react";

import profile_works_card_photo1 from "../images/profile_card_1.svg";
import profile_works_card_photo2 from "../images/profile_card_2.svg";
import profile_works_card_photo3 from "../images/profile_card_3.svg";
import profile_works_card_photo4 from "../images/profile_card_4.svg";
import profile_works_card_photo5 from "../images/profile_card_5.svg";
import profile_works_card_photo6 from "../images/profile_card_6.svg";


import profile_works_card_avatar1 from "../images/avatar.png";
import profile_works_card_avatar2 from "../images/avatar2.png";

import collection1 from "../images/col1.png"
import collection2 from "../images/col1.png"
import collection3 from "../images/col1.png"
import collection4 from "../images/col1.png"
import collection5 from "../images/col1.png"



import save from "../images/save.png";
import like from "../images/like_on.png";
import star from "../images/star.png";

const ProfileFav = () => {

  const favourites = [
    {
      type: "collection",
      name: "Imagine",
      number: 6,
      like: "6",
      images: [
        "/images/col1.png",
        "/images/col1.png",
        "/images/col1.png",
        "/images/col1.png",
        "/images/col1.png",
        "/images/col1.png",
      ]
    },
    {
      type: "work",
      name: "Crocs",
      imgSrc: "../images/profile_card_1.svg",
      star: "2",
      saved: "1",
      like: "6",
      owners: [
        "../images/avatar.png",
        "../images/avatar2.png"
      ]
    },
    {
      type: "collection",
      name: "Imagine",
      number: 1,
      like: "6",
      images: [
        "/images/col1.png",
      ]
    },
    {
      type: "work",
      name: "Монстрик",
      imgSrc: "../images/profile_card_2.svg",
      star: "3",
      saved: "4",
      like: "4",
      owners: [
        "../images/avatar.png"
      ]
    },
    {
      type: "work",
      name: "Девушка в одежде",
      imgSrc: "../images/profile_card_3.svg",
      star: "2",
      saved: "8",
      like: "1",
      owners: [
        "../images/avatar.png",
        "../images/avatar2.png"
      ]
    },
    {
      type: "work",
      name: "Crocs",
      imgSrc: "../images/profile_card_4.svg",
      star: "4",
      saved: "4",
      like: "4",
      owners: [
        "../images/avatar.png"
      ]
    },
    {
      type: "work",
      name: "Crocs",
      imgSrc: "../images/profile_card_5.svg",
      star: "6",
      saved: "6",
      like: "6",
      owners: [
        "../images/avatar.png"
      ]
    },
    {
      type: "work",
      name: "Crocs",
      imgSrc: "../images/profile_card_6.svg",
      star: "7",
      saved: "7",
      like: "9",
      owners: [
        "../images/avatar.png"
      ]
    },
  ];

    return (
      <div class="profile__works">
          {favourites.map(item => {
              if (item.type === "work") {
                  return (
                      <div class="profile__works-card" key={item.name}>
                          <div class="profile__works-card-maininfo">
                              <p>{item.name}</p>
                              <div class="profile__works-card-buttons">
                                  <button className="profile__button profile__button_eye" />
                                  <button className="profile__button profile__button_choose" />
                              </div>
                          </div>
                          <div class="profile__works-card-photo">
                              <img src={item.imgSrc} alt='card_photo' />
                          </div>
                          <div class="profile__works-card-info">
                              <div class="profile__works-card-avatar">
                                  {item.owners.map(owner => (
                                      <img src={owner} key={owner} alt='card_avatar' />
                                  ))}
                              </div>
                              <div class="profile__works-card-info-count">
                                  <div class="profile__works-card-info-saves">
                                      <img src={save} alt='save' />
                                      <p>{item.saved}</p>
                                  </div>
                                  <div class="profile__works-card-info-likes">
                                      <img src={like} alt='like' />
                                      <p>{item.like}</p>
                                  </div>
                                  <div class="profile__works-card-info-stars">
                                      <img src={star} alt='star' />
                                      <p>{item.star}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  );
              } else {
                  return (
                    <div className="collection__card-container">
              <div className="collection__background" />
              <div class="collection__card">
                <div class="profile__works-card-maininfo">
                  <p>{item.name}</p>
                  <div class="profile__works-card-buttons">
                    <button className="profile__button profile__button_eye" />
                    <button className="profile__button profile__button_choose" />
                  </div>
                </div>
                <div className={`collection__photo-container${item.number >= 3 ? "4" : item.number}`}>
                  {Array.from({ length: item.number >= 4 ? 4 : item.number }).map((_, index) => (
                    <img
                      key={index}
                      className={`collection__photo${item.number >= 3 ? "4" : item.number}`}
                      src={item.images[index]}
                      alt='card_photo'
                    />
                  ))}
                </div>
                <div class="profile__works-card-info">
                  <div class="profile__works-card-avatar">
                    {`${item.number}${item.number === 1 ? " модель" : " модели"}`}
                  </div>
                  <div class="collection__card-info-count">
                    <div class="collection__card-card-info-likes">
                      <img src={like} alt='like' />
                      <p>{item.like}</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
                  );
              }
          })}
      </div>
  );


};
      export default ProfileFav;   