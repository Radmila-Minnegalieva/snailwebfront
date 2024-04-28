import React from "react";
import logo from "../images/logo.svg";
import AuthModal from "./Auth";
import { useState, useEffect, useRef } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
    if (!isShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  function closeModal() {
    setIsShowing(false);
    document.body.style.overflow = "auto";
  }

  return [isShowing, toggle, closeModal];
};

const Header = ({ isAuthenticated, onLogout }) => {
  const [headerClass, setHeaderClass] = useState("header");

  const [isShowingModal, toggleModal, closeModal] = useModal();

  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, closeModal]);

  return (
    <div className={headerClass}>
      <div className="header__menu">
        <img src={logo} alt="Логотип" className="logo" />
        <div className="left-menu-container">
          <a className="header__button">3D модели</a>
          <a className="header__button">Слайсер</a>
          <a className="header__button">Печать</a>
        </div>
      </div>
      <AuthModal
        show={isShowingModal}
        onCloseButtonClick={closeModal}
      ></AuthModal>
      <button
        className="header__button header__button_exit"
        onClick={toggleModal}
      ></button>
      {isAuthenticated && <button>Кнопка</button>}
    </div>
  );
};

export default Header;
