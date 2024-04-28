import React from "react";
import { useState } from "react";
import favorite from '../images/favorite.svg';
import follow from '../images/follow.svg';
import download from '../images/download.svg';
import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";


const Profile = () => {

  const data = {
    name: "yaane",
    avatarSrc: "/images/profile.png",
    nickname: "@coemet",
    followers: "150",
    saved: "1",
    like: "6",
    bio: "Привет! Сделанные на базе интернет-аналитики выводы, вне зависимости от их уровня!",
  };

  const [activeButton, setActiveButton] = useState(null); // Состояние для активной кнопки

  // Функция для обработки клика по кнопке
  const handleactive = (index) => {
    setActiveButton(index); // Устанавливаем индекс активной кнопки
  };

  return (
    <div class="profile">
      <div class="profile__background-container">
        <div></div>
      </div>
      <div class="profile__card">
        <img className="profile__avatar" src={data.avatarSrc} alt="Аватар профиля" />
        <div className="profile__info">
          <p className="profile__name">{data.name}</p>
          <p className="profile__nickname">{data.nickname}</p>
          <div className="profile__stat">
            <button className="profile__stat-item">
              <img className="profile__stat-img" src={follow} alt="repost button" /> {data.followers}
            </button>
            <button className="profile__stat-item">
              <img className="profile__stat-img" src={download} alt="save button" />{data.saved}
            </button>
            <button className="profile__stat-item">
              <img className="profile__stat-img" src={favorite} alt="like button" />{data.like}
            </button>
          </div>
          <button className="profile__edit-button">Редактировать профиль</button>
          <div className="profile__bio">
            <h1 className="profile__bio-name">Bio</h1>
            <p className="profile__bio-description">{data.bio}</p>
          </div>
          <div className='social_media_buttons'>
            <button className="footer__button footer__button_exit1" />
            <button className="footer__button footer__button_exit2" />
            <button className="footer__button footer__button_exit3" />
          </div>
        </div>
      </div>
      <div className="profile__objects">
        <div className="profile__objects-info">
          <div className="profile__objects-leftinfo">
            <NavLink className={({ isActive }) => (isActive ? "profile__objects-leftinfo_works_active": "profile__objects-leftinfo_works")} to="/profile/works" >
              <div className="profile__objects-leftinfo_works_block"><a>Работы</a></div>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "profile__objects-leftinfo_fav_active": "profile__objects-leftinfo_fav")} to="/profile/favourites">
            <div className="profile__objects-leftinfo_fav_block"><a>Избранное</a></div>
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? "profile__objects-leftinfo_collections_active": "profile__objects-leftinfo_collections")} to="/profile/collection">
            <div className="profile__objects-leftinfo_collections_block"><a>Коллекции</a></div>
            </NavLink>
            <NavLink className="profile__objects-leftinfo_reviews">
            <div className="profile__objects-leftinfo_reviews_block"><a>Отзывы</a></div>
            </NavLink>
            <NavLink className="profile__objects-leftinfo_complains">
            <div className="profile__objects-leftinfo_complains_block"><a>Жалобы</a></div>
            </NavLink>
          </div>
          <div className="profile__objects-rightinfo">
            <form className="profile__printers__form" action="" method="get">
              <button className="search-button" type="submit" />
              <input
                className="profile__printers__input"
                name="printer-search"
                value="Поиск"
                type="text"
              />
            </form>
            <button class="profile__objects-newfile-button">Новый файл</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

