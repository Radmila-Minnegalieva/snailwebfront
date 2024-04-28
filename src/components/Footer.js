import React from "react";

const Footer = () => {
  return (
    <div className="footer">
        <div className="footer__left-menu">
          <button className="footer__button-info">© 2024 SnailLabs</button>
          <button className="footer__button-info">Условия пользования</button>
          <button className="footer__button-info">FAQ</button>
          <button className="footer__button-info">Поддержка</button>
        </div>
      <div class='social_media_buttons'>
        <button className="footer__button footer__button_exit1" />
        <button className="footer__button footer__button_exit2" />
        <button className="footer__button footer__button_exit3" />
      </div>
    </div>
  );
};

export default Footer;