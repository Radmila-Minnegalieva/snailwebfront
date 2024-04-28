import React, { useState } from "react";
import {reviewsClass} from './Rewiews';
import {remixesClass} from './Remixes';
import {similarModelClass} from "./SimilarModelCard";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  function scrollToElement(elementId) {
    const id = document.querySelector(elementId);
    if (id) {
      id.scrollIntoView({ behavior: "smooth", block: "center"});
    }
  }

  const componentData = {
    tabContent: {
      description: `Ищете идеальное сочетание стиля, комфорта и функциональности?
        Представляем вам наш последний продукт - элегантный и
        многофункциональный предмет, который станет незаменимым
        аксессуаром в вашем повседневном образе. Этот товар не просто
        удовлетворяет все ваши потребности, но и делает это с
        непревзойденным стилем и элегантностью. Изготовленный из
        высококачественных материалов, наш товар обещает долговечность и
        надежность. Каждая деталь продумана до мелочей, чтобы обеспечить
        максимальное удобство использования. Эргономичный дизайн и
        инновационные технологии делают этот товар идеальным выбором для
        тех, кто ценит качество и стиль. Независимо от вашего образа жизни
        или повседневных задач, наш товар поможет вам справиться с любыми
        задачами. Он идеально подходит для активного образа жизни, деловых
        встреч, поездок или просто для отдыха. С ним вы будете выглядеть
        стильно и уверенно в любой ситуации. Наш продукт не просто предмет
        обихода, он станет частью вашего стиля и выражением вашей
        личности. Выберите качество, выберите стиль - выберите наш товар,
        и он превзойдет ваши ожидания!`
    },
    tags: [
      "обувь", "спорт", "одежда", "кроссовки", "обувь", "спорт", "одежда", "кроссовки", "обувь", "спорт", "одежда", "кроссовки", "обувь", "спорт", "одежда", "кроссовки"
    ],
    license: {
      imageSrc: "/images/license.jpg",
      type: "Creative Commons Attribution-NonCommercial"
    },
  };

  return (
    <div className="product-details">
      <div className="product-detail">
        <div className="tabs">
          <button
            onClick={() => {
              handleTabChange("description");
            }}
            className={activeTab === "description" ? "active" : ""}
          >
            Описание
          </button>
          <button
            onClick={() => {
              handleTabChange("reviews");
              scrollToElement(reviewsClass);
            }}
            className={activeTab === "reviews" ? "active" : ""}
          >
            Отзывы
          </button>
          <button
            onClick={() => {
              handleTabChange("remixes");
              scrollToElement(remixesClass);
            }}
            className={activeTab === "remixes" ? "active" : ""}
          >
            Ремиксы
          </button>
          <button
            onClick={() => {
              handleTabChange("remixes");
              scrollToElement(similarModelClass);
            }}
            className={activeTab === "similarModels" ? "active" : ""}
          >
            Похожие модели
          </button>
        </div>
        <div className="tab-content">
          <h2>Описание</h2>
          {activeTab === "description" && (
            <p>
              {componentData.tabContent.description}
            </p>
          )}
          {activeTab === "reviews" && (
            <p>
            </p>
          )}
          {activeTab === "remixes" && (
            <p>
            </p>
          )}
          {activeTab === "similarModels" && (
            <p>
            </p>
          )}
        </div>
        <div className="tags">
          {componentData.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        <div className="license">
          <div className="license-image">
            <img src={componentData.license.imageSrc} alt="licence" />
          </div>
          <div className="license-text">
            <p className="license-title">Лицензия</p>
            <p className="license-description">Эта работа под лицензией</p>
            <p className="license-type">{componentData.license.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
