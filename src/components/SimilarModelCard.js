import React from "react";
import save from "../images/save.png"
import like from "../images/like.png"
import star from "../images/star.png"

const SimilarModelCard = ({ model = [
  {
    title: "Crocs",
    imageUrl: '/images/profile_card_1.svg',
    author: {
      name: "eelliizzaf",
      avatar: '../images/ava.svg'
    },
    likes: 2,
    comments: 6,
    rating: 2
  },
  {
    title: "Nike Air Max",
    imageUrl: "/images/profile_card_2.svg",
    author: {
      name: "eelliizzaf",
      avatar: '../images/ava.svg'
    },
    likes: 2,
    comments: 6,
    rating: 2
  },
  {
    title: "Adidas Superstar",
    imageUrl: "/images/profile_card_3.svg",
    author: {
      name: "eelliizzaf",
      avatar: '../images/ava.svg'
    },
    likes: 2,
    comments: 6,
    rating: 2
  },
  {
    title: "Puma Suede",
    imageUrl: "/images/profile_card_4.svg",
    author: {
      name: "eelliizzaf",
      avatar: '../images/ava.svg'
    },
    likes: 2,
    comments: 6,
    rating: 2
  },
  {
    title: "Vans Old Skool",
    imageUrl: "/images/profile_card_5.svg",
    author: {
      name: "eelliizzaf",
      avatar: '../images/ava.svg'
    },
    likes: 2,
    comments: 6,
    rating: 2
  },
  {
    title: "Nike Air Max",
    imageUrl: "/images/profile_card_6.svg",
    author: {
      name: "eelliizzaf",
      avatar: '../images/ava.svg'
    },
    likes: 2,
    comments: 6,
    rating: 2
  }
] }) => {
  return (
    <div className="similarmodellist">
      <div className="similar-text">Похожие модели</div>
      <div className="similar-model-container">
        {model.map((model, index) => (
          <div className="profile__works-card" key={index}>
            <div className="profile__works-card-maininfo">
              <p>{model.title}</p>
            </div>
            <div className="profile__works-card-photo">
              <img src={model.imageUrl} alt="logo" />
            </div>
            <div className="similarmodels-card-info">
              <div className="similarmodels-card-authors">
                <div className="similarmodels-card-avatar">
                  <img src={model.author.avatar} alt="Аватар" />
                </div>
                <a>{model.author.name}</a>
              </div>
              <div className="profile__works-card-info-count">
                <div className="profile__works-card-info-saves">
                  <img src={save} alt="save" />
                  <p>{model.likes}</p>
                </div>
                
                <div className="profile__works-card-info-likes">
                  <img src={like} alt="like" />
                  <p>{model.comments}</p>
                </div>
                
                <div className="profile__works-card-info-stars">
                  <img src={star} alt="star" />
                  <p>{model.rating}</p>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const similarModelClass = ".similarmodellist"
export default SimilarModelCard;
