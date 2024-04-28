import React, { useState, useRef, useEffect } from "react";
import slider from "../images/slider.svg";
import arrow from "../images/arrow.svg";
import dotActive from "../images/dot_active.svg";
import dotUnactive from "../images/dot_unactive.svg";

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
import left from "../images/left.svg";
import right from "../images/right.svg";

const MainPageNew = () => {
  const containerRef = useRef(null);
  const [totalItems, setTotalItems] = useState(0);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    const updateTotalItems = () => {
      const container = containerRef.current;
      if (container) {
        const cards = container.querySelectorAll(".mainpage__works-card");
        setTotalItems(cards.length);
      }
    };

    updateTotalItems();

    // Добавляем прослушиватель событий на изменение размеров окна, чтобы обновлять количество элементов при изменении размера экрана
    window.addEventListener("resize", updateTotalItems);

    // Очищаем прослушиватель событий при размонтировании компонента
    return () => {
      window.removeEventListener("resize", updateTotalItems);
    };
  }, []);

  // Вычисление количества точек
  const visibleItems = 5;
  const totalDots = Math.ceil((totalItems - visibleItems) / visibleItems) + 1;
  const itemsPerScroll = 5;

  const scrollRight = () => {
    const container = containerRef.current;
    if (!container) return;

    const itemWidth = container.scrollWidth / totalItems;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const nextScrollLeft = Math.min(
      container.scrollLeft + itemWidth * itemsPerScroll,
      maxScrollLeft
    );
    container.scrollTo({
      left: nextScrollLeft,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  // Генерация точек
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < totalDots; i++) {
      if (i === activeDotIndex) {
        dots.push(<img key={i} src={dotActive} />);
      } else {
        dots.push(<img key={i} src={dotUnactive} />);
      }
    }
    return dots;
  };

  const updateButtonActivity = (nextIndex) => {
    const leftButton = document.querySelector(".left-image-new");
    const rightButton = document.querySelector(".right-image-new");
    const leftGradient = document.querySelector(".left-gradient-new");
    const rightGradient = document.querySelector(".right-gradient-new");
    const container = containerRef.current;

    if (firstClick) {
      leftButton.style.visibility = "visible";
      leftGradient.style.visibility = "visible";
    }

    if (!container) return;

    const firstCardVisible = container.scrollLeft === 0;
    const lastCardVisible =
      container.scrollLeft + container.clientWidth === container.scrollWidth;

    // Если обе кнопки видны или если это последняя точка, скрываем правую кнопку
    if ((firstCardVisible && lastCardVisible) || nextIndex === totalDots - 1) {
      rightButton.style.visibility = "hidden";
      rightGradient.style.visibility = "hidden";
    } else {
      rightButton.style.visibility = "visible";
      rightGradient.style.visibility = "visible";
    }

    // Если это первая точка и не обе кнопки видны, скрываем левую кнопку
    if (nextIndex === 0 && !firstCardVisible) {
      leftButton.style.visibility = "hidden";
      leftGradient.style.visibility = "hidden";
    } else {
      leftButton.style.visibility = "visible";
      leftGradient.style.visibility = "visible";
    }
  };

  const handleRightClick = () => {
    const nextIndex = activeDotIndex + 1;
    setActiveDotIndex(nextIndex);
    updateButtonActivity(nextIndex);
    scrollRight();
  };

  const handleLeftClick = () => {
    setActiveDotIndex(0);
    updateButtonActivity(0);
    scrollLeft();
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div class="mainpage__topworks-container">
      <div class="mainpage__topworks-container-topic">
        <div class="mainpage__newworks-container-topic-name">
          <a>Новое</a>
          <img src={arrow} />
        </div>

        <div class="mainpage__topworks-container-topic-bound">
          {renderDots()}
        </div>
      </div>

      <div
        className={`mainpage__topworks-container-keyboard ${
          isHovered ? "show" : "hide"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div class = {`left-gradient-new ${
          isHovered ? "show" : "hide"
        }`} onClick={handleLeftClick}></div>
        <div class = {`right-gradient-new ${
          isHovered ? "show" : "hide"
        }`} onClick={handleRightClick}></div>
      </div>

      <div
        className={`mainpage__topworks-container-keyboard ${
          isHovered ? "show" : "hide"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={left}
          alt="left"
          class="left-image-new"
          onClick={handleLeftClick}
        ></img>
        <img
          src={right}
          alt="right"
          class="right-image-new"
          onClick={handleRightClick}
        ></img>
      </div>

      <div
        class="mainpage__topworks-container-cards"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div class="mainpage__works-card" id="new">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo1} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo2} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo2} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo2} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo2} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo2} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo2} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo2} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo2} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo2} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo2} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo6} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo3} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo5} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mainpage__works-card">
          <div class="mainpage__works-card-maininfo">
            <p>Монстр кибер железный человек</p>
          </div>
          <div class="mainpage__works-card-photo">
            <img src={profile_works_card_photo4} alt="card_photo" />
          </div>
          <div class="mainpage__works-card-info">
            <div class="mainpage__works-card-avatar">
              <img src={profile_works_card_avatar1} alt="card_avatar" />
              <img src={profile_works_card_avatar2} alt="card_avatar" />
            </div>

            <div class="mainpage__works-card-info-count">
              <div class="mainpage__works-card-info-likes">
                <img src={like} alt="like" />
                <p>6</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageNew;
