import React from "react";
import clock from '../images/Clock.svg';
import star from '../images/star.svg';

const Printer = () => {
  const data = {
    "mainPhoto": "../images/main-photo.png",
    "photo2": "../images/photo2.jpeg",
    "photo3": "../images/photo3.jpeg",
    "name": "cross",
    "avatar": "avatar.jpg",
    "avatarName": "anlnv",
    "description": "3D/Обувь",
    "printers": [
      {
        "name": "X1 Carbon,P1S,X1,X1E,A1",
        "imgSrc": "/images/main-photo.png",
        "time": "2,6ч",
        "items": ["Прочность", "Качество", "Успех"],
        "rating": "4,8"
      },
      {
        "name": "X1 Carbon,P1S,X1",
        "imgSrc": "/images/main-photo.png",
        "time": "2,3ч",
        "items": ["Качество", "Успех"],
        "rating": "4,1"
      },
      {
        "name": "X1 Carbon",
        "imgSrc": "/images/main-photo.png",
        "time": "1,6ч",
        "items": ["Успех"],
        "rating": "3,0"
      },
      {
        "name": "X1 Carbon",
        "imgSrc": "/images/main-photo.png",
        "time": "1,6ч",
        "items": ["Успех"],
        "rating": "3,0"
      }
    ]
  };

  return (
    <div className="printers__list">
    {data.printers.map(printer => (
      <div className="printer" key={printer.name}>
        <img className="printer__img" src={printer.imgSrc} alt="Фото товара" />
        <div className="printer__description">
          <div className="printer__name">{printer.name}</div>
          <div className="printer__items-container">
            <div className="printer__char">
              <p className="printer__item">
                <img className="printer__time-img" src={clock} alt='time' />
                {printer.time}
              </p>
              {printer.items.map(item => (
                <p className="printer__item" key={item}>{item}</p>
              ))}
            </div>
            <p className="printer__item_star">
              {printer.rating}
              <img className="printer__star" alt="star" src={star} />
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
  
  );
};

export default Printer;
