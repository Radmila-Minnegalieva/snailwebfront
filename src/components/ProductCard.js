import React, { useState, useEffect } from "react";
import like from "../images/favorite.svg";
import repost from "../images/ShareFat.svg";
import follow from "../images/follow.svg";
import save from "../images/ArchiveTray.svg";
import star from "../images/star.svg";
import star_black from "../images/Star-black.svg";
import Printer from "./Printer";
import add from "../images/add.svg";
import { useParams } from 'react-router-dom';

const ProductCard = ({ onDataReceived }) => {
  const data = {
    images: [
      "/images/main-photo.png",
      "../images/photo2.jpeg",
      "../images/photo3.jpeg",
      "../images/photo1.jpeg",
    ],
    name: "cross",
    avatar: "avatar.jpg",
    avatarName: "anlnv",
    description: "3D/Обувь",
    rating_data: "4",
    likes: "6",
    repost: "5",
    save: "1",
    printers: [
      {
        name: "X1 Carbon,P1S,X1,X1E,A1",
        imgSrc: "../images/main-photo.png",
        time: "2,6ч",
        items: ["Прочность", "Качество", "Успех"],
        rating: "4,8",
      },
      {
        name: "X1 Carbon,P1S,X1",
        imgSrc: "../images/main-photo.png",
        time: "2,3ч",
        items: ["Качество", "Успех"],
        rating: "4,1",
      },
      {
        name: "X1 Carbon",
        imgSrc: "../images/main-photo.png",
        time: "1,6ч",
        items: ["Успех"],
        rating: "3,0",
      },
      {
        name: "X1 Carbon",
        imgSrc: "../images/main-photo.png",
        time: "1,6ч",
        items: ["Успех"],
        rating: "3,0",
      },
    ],
  };

  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  console.log('ПОЛУЧЕНО', onDataReceived)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            alias: 'radmilaradmila',
            password: 'radmila05122004'
          })
        });
  
        if (!response.ok) {
          console.error('Ошибка при запросе:', response.statusText);
          return;
        }
  
        const data = await response.json();
        setToken(data.access);
        console.log('Успешный ответ:', data);
      } catch (error) {
        console.error('Произошла ошибка:', error);
      }
    };
  
    fetchToken();
  }, []);
  

  const [date, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/publications/1/`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (!response.ok) {
            throw new Error('Ошибка при запросе:', response.statusText);
          }

          const responseData = await response.json();
          setData(responseData);
          console.log(responseData[0])
        } catch (error) {
          console.error('Произошла ошибка:', error);
        }
      }
    };

    fetchData(); // Вызываем функцию при изменении id или токена
  }, [token]); // Зависимости: id и token


  const [activeIndex, setActiveIndex] = useState(null); // Используем null чтобы ни одно изображение не было активным изначально

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Если текущий индекс равен активному, сбросить активный индекс, иначе установить новый
  };

  const slides = data.images; // Массив со всеми изображениями
  const [slideIndex, setSlideIndex] = useState(0); // Индекс текущего активного слайда

  // Обработчик нажатия кнопки "Назад"
  const handlePrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  // Обработчик нажатия кнопки "Вперед"
  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  // Находим все изображения внутри slider__photo
  const sliderPhotos = document.querySelectorAll(".slider__photo");

  // Добавляем обработчик клика для каждого изображения
  sliderPhotos.forEach((photo) => {
    photo.addEventListener("click", function () {
      // Получаем src изображения, на которое кликнули
      const newImageSrc = this.getAttribute("src");

      // Находим элемент card__img
      const cardImg = document.querySelector(".card__img");

      // Обновляем его src атрибут
      cardImg.setAttribute("src", newImageSrc);
    });
  });

  return (
    <div className="card">
      <div className="slider">
        <div className="card__img-container">
          <button className="slider__button_back" onClick={handlePrev} />
          <img
            className="card__img"
            src={slides[slideIndex]}
            alt="основное фото"
          />
          <button className="slider__button_next" onClick={handleNext} />
        </div>
        <div className="slider__photo-set">
          {data.images.map((imageSrc, index) => (
            <img
              key={index}
              className={`slider__photo ${
                index === activeIndex ? "active_photo" : ""
              }`}
              src={imageSrc}
              alt={`фото${index + 1}`}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
      <div className="card__info">
        <div className="bio">
          <p className="bio__description">{data.description}</p>
          <p className="card__name">{data.name}</p>
          <div className="avatar">
            <img className="avatar__img" src={[data.images[0]]} alt="Avatar" />
            <p className="avatar__name">{data.avatarName}</p>
            <button className="card__button" id="follow">
              <img className="" src={follow} alt="repost button" />
            </button>
          </div>
        </div>
        <div className="printers">
          <div className="printers__menu">
            <p className="printers__text">
              Профили печати ({data.printers.length})
            </p>
            <div className="printers__search-menu">
              <form className="printers__form" action="" method="get">
                <button className="search-button" type="submit" />
                <input
                  className="printers__input"
                  name="printer-search"
                  placeholder="Выбрать принтер"
                  type="text"
                />
              </form>
              <button className="card__button card__button-add">
                <img
                  className="card__button-img"
                  src={add}
                  alt="repost button"
                />
              </button>
            </div>
          </div>
          <Printer />
        </div>
        <div className="printers__options">
          <button className="printers__option">Подготовить к печати</button>
          <button className="printers__option">
            Скачать<p className="printers__option-description">Row model</p>
          </button>
          <button className="printers__option">
            Заказать печать<p className="printers__option-description">от 7$</p>{" "}
          </button>
        </div>
        <div className="card__stat">
          <div className="card__stat_left">
            <button className="card__button">
              <img
                className="card__button-img_stat"
                src={like}
                alt="like button"
              />{" "}
              6
            </button>
            <button className="card__button">
              <img
                className="card__button-img_stat"
                src={repost}
                alt="repost button"
              />{" "}
              5
            </button>
            <button className="card__button">
              <img
                className="card__button-img_stat"
                src={save}
                alt="save button"
              />{" "}
              1
            </button>
          </div>
          <div className="card__mark-container">
            <p className="card__text">4,8</p>
            {Array.from({ length: data.rating_data }, (_, i) => (
              <img src={star} alt="star" key={i} />
            ))}
            {Array.from({ length: 5 - data.rating_data }, (_, i) => (
              <img src={star_black} alt="star_black" key={i} />
            ))}
            <p className="card__text">(3)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
