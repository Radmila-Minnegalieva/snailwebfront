import React, { useState, useEffect } from "react";
import star from "../images/Star-white-fill.svg";
import star_black from "../images/Star-white.svg";
import star_yellow_fill from "../images/star.svg";
import star_yellow from "../images/Star-black.svg";
import like from "../images/like.svg";

const Reviews = () => {
  const data = {
    reviews: [
      {
        name: "Иван Иванов",
        date: "15 февраля 2024",
        text: "Я впервые попробовал 3D печать, и это был настоящий переворот для меня. Возможность создавать трехмерные объекты прямо на моем столе просто поражает воображение. Я уже использовал ее для создания прототипов для моих проектов и даже для персональных подарков. Это такая удивительная технология, которая точно изменит будущее производства!",
        rating: 5,
        likes: 6,
        mainPhoto: "/images/photo4.jpg",
        photos: [
          "/images/photo4.jpg",
          "/images/photo2.jpeg",
          "/images/photo3.jpeg",
        ],
      },
      {
        name: "Пётр Петров",
        date: "14 февраля 2024",
        text: "Были проблемы",
        rating: 4,
        likes: 4,
        mainPhoto: "/images/photo4.jpg",
        photos: [
          "/images/photo4.jpg",
          "/images/photo2.jpeg",
          "/images/photo3.jpeg",
          "/images/photo1.jpeg",
        ],
      },
      {
        name: "Пётр Петров",
        date: "14 февраля 2024",
        rating: 5,
        text: "Были проблемы",
        likes: 1,
        mainPhoto: "/images/photo4.jpg",
        photos: [],
      },
      {
        name: "Пётр Петров",
        date: "14 февраля 2024",
        rating: 5,
        text: "Были проблемы",
        likes: 1,
        id: "no_photo",
        mainPhoto: null,
        photos: [],
      },
      {
        name: "Пётр Петров",
        date: "14 февраля 2024",
        rating: 5,
        text: "Были проблемы",
        likes: 1,
        id: "no_photo",
        mainPhoto: null,
        photos: [],
      },
      {
        name: "Пётр Петров",
        date: "14 февраля 2024",
        rating: 5,
        text: "Были проблемы",
        likes: 1,
        mainPhoto: "/images/photo4.jpg",
        photos: [],
      },
      {
        name: "Пётр Петров",
        date: "14 февраля 2024",
        text: "Были проблемы",
        rating: 4,
        likes: 4,
        mainPhoto: "/images/photo4.jpg",
        photos: [
          "/images/photo4.jpg",
          "/images/photo2.jpeg",
          "/images/photo3.jpeg",
          "/images/photo1.jpeg",
        ],
      }
    ],
  };

  const [reviewState, setReviewState] = useState({});

  useEffect(() => {
    if (data.reviews) {
      const initialState = {};
      data.reviews.forEach((review, index) => {
        initialState[index] = {
          mainPhoto: review.mainPhoto,
          activePhotoIndex: Array(review.photos.length).fill(0),
          smallPhotos: Array(review.photos.length).fill(false),
        };
      });
      setReviewState(initialState);
    }
  }, []);

  const handlePhotoClickGenerator = (reviewIndex, photoIndex) => {
    return () => {
      setReviewState((prevState) => {
        const newState = { ...prevState };
        newState[reviewIndex] = {
          ...prevState[reviewIndex],
          mainPhoto: data.reviews[reviewIndex].photos[photoIndex],
          activePhotoIndex: Array(data.reviews[reviewIndex].photos.length).fill(-1).map((_, idx) => idx === photoIndex ? idx : -1),
        };
        return newState;
      });
    };
  };

  const handleReviewClick = (event) => {
    event.preventDefault();
    const starButtons = document.querySelectorAll(".submit");
    const clickedButtonIndex = Array.from(starButtons).indexOf(event.target);
    for (let i = 0; i <= clickedButtonIndex; i++) {
      starButtons[i].style.backgroundImage = `url(${star})`;
    }
  };

  return (
    <div className="reviews-container">
      <div className="reviews">
        <div class="rewiew-name">
          <h2>Отзывы 4,9</h2>
          <div class="rating-stars">
            <img src={star_yellow_fill} alt="star"></img>
            <img src={star_yellow_fill} alt="star"></img>
            <img src={star_yellow_fill} alt="star"></img>
            <img src={star_yellow_fill} alt="star"></img>
            <img src={star_yellow} alt="star"></img>
          </div>
          <h2>({data.reviews.length})</h2>
          <div class="rating-up">
            <img src="/images/up.png" alt="up" />
          </div>
        </div>
        <div className="container">
          <div className="feedback-form">
            <form>
              <div className="input-and-buttons">
                <a href="http://example.com" className="attach-file">
                  <img src="/images/skrepka.png" alt="skrepka" />
                </a>
                <textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Нам важен ваш отзыв!"
                ></textarea>
                <div class="submit-button"></div>
                <div class="star-button">
                  <button class="submit" onClick={handleReviewClick}></button>
                  <button class="submit" onClick={handleReviewClick}></button>
                  <button class="submit" onClick={handleReviewClick}></button>
                  <button class="submit" onClick={handleReviewClick}></button>
                  <button class="submit" onClick={handleReviewClick}></button>
                </div>
                <a href="http://example.com" className="submit-button">
                  <img src="/images/send.png" alt="send" />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="review-list">
          {data.reviews.map((review, reviewIndex) => (
            <div
              className={
                review.id === "no_photo" ? "review no_photo" : "review"
              }
              key={reviewIndex}
              id={review.id === "no_photo" ? "no_photo" : undefined}
            >
              <div className="maininfo">
                <div className="info">
                  <div className="left-info">
                    <div className="avatar">
                      <img src="/images/photo3.jpeg" alt="Аватар" />
                    </div>
                    <div className="details">
                      <span>{review.name}</span>
                      <span className="date">{review.date}</span>
                    </div>
                  </div>
                  <div className="rating">
                    {[
                      ...Array.from({ length: review.rating }, (_, i) => (
                        <img src={star} alt="star" key={`star-${i}`} />
                      )),
                      ...Array.from({ length: 5 - review.rating }, (_, i) => (
                        <img
                          src={star_black}
                          alt="empty-star"
                          key={`empty-star-${i}`}
                        />
                      )),
                    ]}
                  </div>
                </div>
                <div className="text">
                  <p>{review.text}</p>
                  <div
                    className="rewiew_likes"
                    id={review.id === "no_photo" ? "no_photo" : undefined}
                  >
                    <img
                      src={like}
                      alt="like"
                      id={review.id === "no_photo" ? "no_photo1" : undefined}
                    />
                    <div
                      className="count_likes"
                      id={review.id === "no_photo" ? "no_photo2" : undefined}
                    >
                      {review.likes}
                    </div>
                  </div>
                </div>
              </div>
              {review.id !== "no_photo" && (
                <div className="rewiew_photo">
                  {reviewState[reviewIndex] &&
                    reviewState[reviewIndex].mainPhoto && (
                      <img
                        src={reviewState[reviewIndex].mainPhoto}
                        alt="Фото"
                      />
                    )}
                  <div className="small-photos">
                    {review.photos.map((photo, photoIndex) => (
                      <img
                        src={photo}
                        alt={`Маленькое фото ${photoIndex + 1}`}
                        onClick={handlePhotoClickGenerator(
                          reviewIndex,
                          photoIndex
                        )}
                        className={
                          reviewState[reviewIndex] &&
                          reviewState[reviewIndex].activePhotoIndex[
                            photoIndex
                          ] === photoIndex
                            ? "active"
                            : ""
                        }
                        id={`reviewPhoto-${reviewIndex}-${photoIndex}`}
                        key={photoIndex}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const reviewsClass = ".review";
export default Reviews;
