import React, { useRef, useState, useEffect } from "react";
import author from "../images/avatar_author.svg";
import like from "../images/like.png";
import smallLeft from "../images/left.svg";
import smallRight from "../images/right.svg";

const MainPageAuthors = () => {
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [firstClick, setFirstClick] = useState(false);

  useEffect(() => {
    const updateTotalItems = () => {
      const container = containerRef.current;
      if (container) {
        const cards = container.querySelectorAll(".mainpage__authors-author");
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
  const visibleItems = 10;
  const totalDots = Math.ceil((totalItems - visibleItems) / visibleItems) + 1;
  const itemsPerScroll = 10;

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

  const handleClick = (index) => {
    if (!firstClick) {
      setFirstClick(true);
    }
    setActiveDotIndex(index);
    updateButtonActivity(index);
    // Вычисляем индекс следующей точки
    let nextIndex = activeDotIndex + 1;

    // Если следующий индекс больше или равен общему количеству точек, устанавливаем индекс первой точки
    if (nextIndex >= totalDots) {
      nextIndex = 0;
      scrollLeft(); // Скроллим влево до самого начала
    } else {
      // Иначе, скроллируем вправо, если не последняя точка
      scrollRight();
    }

    // Устанавливаем следующую точку активной
    setActiveDotIndex(nextIndex);

    // Если следующий индекс является последним, делаем кнопку "следующая точка" неактивной
    if (nextIndex === totalDots - 1) {
      document
        .querySelector(".small-right-image")
        .setAttribute("disabled", true);
    } else {
      document.querySelector(".small-right-image").removeAttribute("disabled");
    }

    // Если следующий индекс является первым, делаем кнопку "предыдущая точка" неактивной
    if (nextIndex === 0) {
      document
        .querySelector(".small-left-image")
        .setAttribute("disabled", true);
    } else {
      document.querySelector(".small-left-image").removeAttribute("disabled");
    }
  };

  const updateButtonActivity = (nextIndex) => {
    const leftButton = document.querySelector(".small-left-image");
    const rightButton = document.querySelector(".small-right-image");
    const leftGradient = document.querySelector(".small-left-gradient");
    const rightGradient = document.querySelector(".small-right-gradient");
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
    <div class="mainpage__authors-container">
      <div class="mainpage__authors-container-topic-name">
        <a>Топ авторов</a>
      </div>

      <div
        className={`mainpage__topworks-container-keyboard ${
          isHovered ? "show" : "hide"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div class = {`small-left-gradient ${
          isHovered ? "show" : "hide"
        }`} onClick={handleLeftClick}></div>
        <div class = {`small-right-gradient ${
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
          src={smallLeft}
          alt="left"
          class="small-left-image"
          onClick={handleLeftClick}
        ></img>
        <img
          src={smallRight}
          alt="right"
          class="small-right-image"
          onClick={handleRightClick}
        />
      </div>



      <div
        class="mainpage__authors-author"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>
        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>

        <div class="mainpage__authors-author-container">
          <img src={author} />
          <div class="mainpage__authors-author-info">
            <a>yaane</a>
            <div class="mainpage__authors-author-container-count">
              <img src={like} />
              <a>600k</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageAuthors;
