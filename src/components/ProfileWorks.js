import React, { useState, useEffect} from "react";
import { connect } from 'react-redux';
import { saveCardId } from './actions';
import { selectSavedCardId } from './selectors';

import profile_works_card_photo1 from "../images/profile_card_1.svg";
import profile_works_card_photo2 from "../images/profile_card_2.svg";
import profile_works_card_photo3 from "../images/profile_card_3.svg";
import profile_works_card_photo4 from "../images/profile_card_4.svg";
import profile_works_card_photo5 from "../images/profile_card_5.svg";
import profile_works_card_photo6 from "../images/profile_card_6.svg";

import profile_works_card_avatar1 from "../images/avatarka.jpg";
import profile_works_card_avatar2 from "../images/avatar2.png";
import save from "../images/save.png";
import like from "../images/like.png";
import star from "../images/star.png";

const ProfileWorks = ({ onDataReceived, saveCardId, savedCardId }) => {
  const works = [
    {
      name: "Crocs",
      imgSrc: "../images/profile_card_1.svg",
      star: "2",
      saved: "1",
      like: "6",
      owners: ["../images/avatar.png", "../images/avatar2.png"],
    },
    {
      name: "Монстрик",
      imgSrc: "../images/profile_card_2.svg",
      star: "3",
      saved: "4",
      like: "4",
      owners: ["../images/avatar.png"],
    },
    {
      name: "Девушка в одежде",
      imgSrc: "../images/profile_card_3.svg",
      star: "2",
      saved: "8",
      like: "1",
      owners: ["../images/avatar.png", "../images/avatar2.png"],
    },
    {
      name: "Crocs",
      imgSrc: "../images/profile_card_4.svg",
      star: "4",
      saved: "4",
      like: "4",
      owners: ["../images/avatar.png"],
    },
    {
      name: "Crocs",
      imgSrc: "../images/profile_card_5.svg",
      star: "6",
      saved: "6",
      like: "6",
      owners: ["../images/avatar.png"],
    },
    {
      name: "Crocs",
      imgSrc: "../images/profile_card_6.svg",
      star: "7",
      saved: "7",
      like: "9",
      owners: ["../images/avatar.png"],
    },
  ];

  const [token, setToken] = useState("");
  const [responseDataState, setResponseDataState] = useState(null);
  console.log('onDataReceived:', onDataReceived);

  const handleButtonClick = async (index) => {
    try {
      // First, fetch the token
      const tokenResponse = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alias: "radmilaradmila",
          password: "radmila05122004",
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error(
          "Ошибка при получении токена:",
          tokenResponse.statusText
        );
      }

      const tokenData = await tokenResponse.json();
      setToken(tokenData.access);
      console.log("Успешный ответ (Токен):", tokenData);

      // Once token is fetched, use it to fetch data
      const dataResponse = await fetch(
        `http://127.0.0.1:8000/api/publications/1/`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.access}`,
          },
        }
      );

      if (!dataResponse.ok) {
        throw new Error(
          "Ошибка при получении данных:",
          dataResponse.statusText
        );
      }

      const responseData = await dataResponse.json(); // Используем другое имя для переменной данных
      console.log(responseData);
      setResponseDataState(responseData[index]);
      saveCardId(index);
      console.log("Успешный ответ (Данные):", responseData[index]);
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }

  };

  useEffect(() => {
    if (responseDataState) {
      onDataReceived(responseDataState);
    }
  }, [responseDataState, onDataReceived]);

  useEffect(() => {
    console.log("Saved Card ID:", savedCardId+1);
  }, [savedCardId]);

  return (
    <div class="profile__works">
      {works.map((work, index) => (
        <div
          class="profile__works-card"
          key={work.name}
          onClick={() => handleButtonClick(index)}
        >
          <div class="profile__works-card-maininfo">
            <p>{work.name}</p>
            <div class="profile__works-card-buttons">
              <button className="profile__button profile__button_eye" />
              <button className="profile__button profile__button_choose" />
            </div>
          </div>
          <div class="profile__works-card-photo">
            <img src={work.imgSrc} alt="card_photo" />
          </div>
          <div class="profile__works-card-info">
            <div class="profile__works-card-avatar">
              {work.owners.map((owner) => (
                <img src={owner} key={owner} alt="card_avatar" />
              ))}
            </div>
            <div class="profile__works-card-info-count">
              <div class="profile__works-card-info-saves">
                <img src={save} alt="save" />
                <p>{work.saved}</p>
              </div>
              <div class="profile__works-card-info-likes">
                <img src={like} alt="like" />
                <p>{work.like}</p>
              </div>
              <div class="profile__works-card-info-stars">
                <img src={star} alt="star" />
                <p>{work.star}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    savedCardId: selectSavedCardId(state),
  };
};

const mapDispatchToProps = {
  saveCardId: saveCardId,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWorks);