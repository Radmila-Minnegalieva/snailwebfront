import React from "react";
import profile_works_card_photo1 from "../images/photo1.jpeg";
import profile_works_card_photo2 from "../images/photo2.jpeg";
import profile_works_card_photo4 from "../images/profile_background.jpeg";
import profile_works_card_avatar1 from "../images/avatar.png"
import profile_works_card_avatar2 from "../images/avatar2.png"
import save from "../images/save.png"
import like from "../images/like.png"
import star from "../images/star.png"
import collection1 from "../images/col1.png"
import collection2 from "../images/col1.png"
import collection3 from "../images/col1.png"
import collection4 from "../images/col1.png"
import collection5 from "../images/col1.png"
import collection6 from "../images/col1.png"
import collection7 from "../images/col1.png"
import collection8 from "../images/col1.png"

import collection_png1 from "../images/col.png"
import collection_png2 from "../images/col.png"
import collection_png3 from "../images/col.png"


const ProfileCollection = () => {


    const collection = [
        {
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
            name: "Imagine",
            number: 1,
            like: "6",
            images: [
                "/images/col1.png",
            ]
        },
        {
            name: "Imagine",
            number: 3,
            like: "6",
            images: [
                "/images/col1.png",
                "/images/col1.png",
                "/images/col1.png",
            ]
        },
        {
            name: "Imagine",
            number: 2,
            like: "6",
            images: [
                "/images/col1.png",
                "/images/col1.png",
            ]
        },
        {
            name: "Imagine",
            number: 1,
            like: "6",
            images: [
                "/images/col1.png",
            ]
        },
    ]


    return (
        <div class="collection">

                {collection.map(col => (
                      <div className="collection__card-container">
                      <div className="collection__background" />
                      <div class="collection__card">
                          <div class="profile__works-card-maininfo">
                              <p>{col.name}</p>
                              <div class="profile__works-card-buttons">
                                  <button className="profile__button profile__button_eye" />
                                  <button className="profile__button profile__button_choose" />
                              </div>
                          </div>
                          <div className={`collection__photo-container${col.number >= 3 ? "4" : col.number}`}>
                          {Array.from({ length: col.number>=4 ? 4 : col.number}).map((_, index) => (
                            <img
                                key={index}
                                className={`collection__photo${col.number >= 3 ? "4" : col.number}`}
                                src={col.images[index]}
                                alt='card_photo'
                            />
                        ))}
                          </div>
                          <div class="profile__works-card-info">
                              <div class="profile__works-card-avatar">
                                  {`${col.number}${col.number === 1 ? " модель" : " модели"}`}
                              </div>
                              <div class="collection__card-info-count">
                                  <div class="collection__card-card-info-likes">
                                      <img src={like} alt='like' />
                                      <p>{col.like}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
      
      
      
                  </div>
                ))}

                

        </div>
    );
};

export default ProfileCollection;