import React, { useState } from "react";
import east from "../images/east.svg";
import telegram from "../images/telegram.svg";
import gmail from "../images/gmail.svg";
import instagram from "../images/instagram.svg";
import west from "../images/west.svg";
import west_dark from "../images/west_dark.svg";

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  const data = JSON.parse(jsonPayload);
  console.log(data.user_id);
  return data.user_id;
};

const AuthModal = ({ show, onCloseButtonClick, handleLoginSuccess  }) => {

  const [profileURL, setProfileURL] = useState('');

  const [isLogin, setIsLogin] = useState(true);
  const [isStep1, setIsStep1] = useState(false);
  const [isStep2, setIsStep2] = useState(false);

  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputValue3, setInputValue3] = useState('');
  const [savedValue1, setSavedValue1] = useState('');
  const [savedValue2, setSavedValue2] = useState('');
  const [savedValue3, setSavedValue3] = useState('');


  const handleSaveValues = () => {
    if (inputValue1){
      setSavedValue1(inputValue1);
    };
    if (inputValue2){
      setSavedValue2(inputValue2);
    };
    if (inputValue3){
      setSavedValue3(inputValue3);
    }
  };


  if (!show) {
    return null;
  }

  const switchToRegistration = () => {
    setIsLogin(!isLogin);
    setIsStep1(!isStep1);
  };

  const switchToRegistration1 = () => {
    setIsLogin(!isLogin);
    setIsStep2(!isStep2);
  };

  const switchToRegistration2 = () => {
    setIsLogin(!isLogin);
  };

  const switchToStep2 = () => {
    setIsStep1(!isStep1);
    setIsStep2(!isStep2);
  };

  const switchToStep3 = () => {
    setIsStep2(!isStep2);
  };

  const Exit = () => {
    [isLogin, setIsLogin] = useState(true);
    [isStep1, setIsStep1] = useState(false);
    [isStep2, setIsStep2] = useState(false);
  };

  const resetState = () => {
    setIsLogin(true);
    setIsStep1(false);
    setIsStep2(false);
  };

  const handleLogin = async() => {
    //http://79.174.92.231/api/schema/swagger-ui/
    const alias = inputValue1;
    const password = inputValue2;
    console.log(alias, password);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alias, password }),
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при аутентификации');
      }
      const auth_data = JSON.stringify(await response.json());
      const data = JSON.parse(auth_data);
      console.log(data);
      const token = data.refresh;
  
      const user_id = parseJwt(token);

      const verifyResponse = await fetch("http://79.174.92.231/api/token/verify/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
      });

      if (!verifyResponse.ok) {
        throw new Error('Ошибка при проверке валидности access токена');
      }
  
      // Дальнейшие действия при успешной авторизации
  
    } catch (error) {
      console.error('Произошла ошибка:', error.message);
      // Дополнительная логика обработки ошибок, например, показ сообщения пользователю
    }
  };

  const handleReg = async() =>{
    //
    const email = inputValue1;
    const password = inputValue2;
    const alias = inputValue3;
    console.log(email, password, alias);
    const body={
      alias: {alias},
      email: {email},
      password: {password}
    }
    console.log(body)

    try {
      console.log(JSON.stringify({ alias, email, password }));
      const response = await fetch("http://79.174.92.231/api/users/register/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({alias, email, password}),
      });
      console.log(response.text());
      //переход на страницу
      
    } catch (error) {
      console.error('Произошла ошибка при регистрации:', error.message);
    }
  }

  return (
    <div class="auth-background">
      {isLogin ? (
        <div class="auth___form-container">
          <div class="auth__login">
            <div class="auth__login__vhod">
              <p>Вход</p>
            </div>
            <div class="auth__login__social">
              <img src={gmail} />
              <img src={instagram} />
              <img src={telegram} />
            </div>
            <div class="auth__login__or">
              <p class="auth__login__or_p">или</p>
            </div>
            <div class="auth__login__forms">
              <form class="auth__login__form_login">
                <input
                  className="auth__login__form__input__login"
                  placeholder="Почта"
                  type="text"
                  onBlur={(e) => setInputValue1(e.target.value)}
                />
                <div class="auth__login__form__up" id="form1">
                  <p>Почта</p>
                </div>
              </form>
              <form class="auth__login__form_password">
                <input
                  className="auth__login__form__input__password"
                  placeholder="Пароль"
                  type="password"
                  onBlur={(e) => setInputValue2(e.target.value)}
                />
                <div class="auth__login__form__down" id="form1">
                  <p>Пароль</p>
                </div>
              </form>
            </div>
            <div class="auth__login__enter" onClick={() => {handleSaveValues();
              handleLogin()}}>
              <p>Войти</p>
            </div>
          </div>        
          <div class="auth__back">
            <button
              onClick={() => {
                onCloseButtonClick();
                resetState();
              }}
            ></button>
            <div class="auth__back__reg" onClick={switchToRegistration}>
              <p>Регистрация</p>
              <img src={east} />
            </div>
          </div>
        </div>
      ) : isStep1 ? (
        <div class="auth___form-container">
          <div class="auth__back_2">
            <div class="auth__back__reg_2" onClick={switchToRegistration}>
              <img src={west} />
              <p>Вход</p>
            </div>
          </div>

          <div class="auth__login_2">
            <button
              onClick={() => {
                onCloseButtonClick();
                resetState();
              }}
            ></button>
            <div class="auth__login__vhod_2">
              <p>Регистрация</p>
            </div>
            <div class="auth__login__social_2">
              <img src={gmail} />
              <img src={instagram} />
              <img src={telegram} />
            </div>
            <div class="auth__login__or_2">
              <p class="auth__login__or_p_2">или</p>
            </div>
            <div class="auth__login__forms_2">
              <form class="auth__login__form_login_2">
                <input
                  className="auth__login__form__input__login_2"
                  name="form_login"
                  placeholder="Почта"
                  type="text"
                  onBlur={(e) => setInputValue1(e.target.value)}
                />
                <div class="auth__login__form__up_2" id="form1">
                  <p>Почта</p>
                </div>
              </form>
            </div>
            <div class="auth__login__enter_2" onClick={() => {switchToStep2(); handleSaveValues()}}>
              <p>Продолжить</p>
            </div>
            <div class="auth__login__text_2">
              <p>
                Продолжая, вы соглашаетесь с нашим Пользовательским соглашением
                и подтверждаете, что понимаете Политику конфиденциальности.
              </p>
            </div>
          </div>
        </div>
      ) : isStep2 ? (
        <div class="auth___form-container">
          <div class="auth__back_3">
            <div class="auth__back__reg_3" onClick={switchToRegistration1}>
              <img src={west} />
              <p>Вход</p>
            </div>
          </div>
          <div class="auth__login_2">
            <button
              onClick={() => {
                onCloseButtonClick();
                resetState();
              }}
            ></button>
            <div class="auth__login__vhod_2">
              <p>Регистрация</p>
            </div>
            <div class="auth__login__forms_3">
              <form class="auth__login__form_alias">
                <input
                  className="auth__login__form__input__login3"
                  name="form_login"
                  placeholder="Придумайте алиас"
                  type="text"
                  onBlur={(e) => setInputValue2(e.target.value)}
                />
                <div class="auth__login__form__up_3" id="form1">
                  <p>Алиас</p>
                </div>
              </form>
              <form class="auth__login__form_password_3">
                <input
                  className="auth__login__form__input__password3"
                  name="form_login"
                  placeholder="Придумайте пароль"
                  type="text"
                  onBlur={(e) => setInputValue3(e.target.value)}
                />
                <div class="auth__login__form__medium_3" id="form1">
                  <p>Пароль</p>
                </div>
              </form>
              <form class="auth__login__form_passwordagain_3">
                <input
                  className="auth__login__form__input__passwordagain3"
                  name="form_login"
                  placeholder="Пароль повторно"
                  type="text"
                />
                <div class="auth__login__form__down_3" id="form1">
                  <p>Пароль повторно</p>
                </div>
              </form>
            </div>

            <div class="auth__login__buttons_3">
              <div class="auth__login__button_back" onClick={switchToStep2}>
                <img src={west_dark} />
              </div>
              <div class="auth__login__button_next" onClick={() => {switchToStep3(); handleSaveValues();}}>
                <p>Продолжить</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="auth___form-container">
          <div class="auth__back_3">
            <div class="auth__back__reg_3" onClick={switchToRegistration2}>
              <img src={west} />
              <p>Вход</p>
            </div>
          </div>
          <div class="auth__login_3">
            <button
              onClick={() => {
                onCloseButtonClick();
                resetState();
              }}
            ></button>
            <div class="auth__login__vhod_3">
              <p>Подтверждение</p>
            </div>
            <div class="auth__login__forms_4">
              <form class="auth__login__form_passwordagain_3">
                <input
                  className="auth__login__form__input__passwordagain3"
                  name="form_login"
                  placeholder="Введите код"
                  type="text"
                />
              </form>
            </div>
            <div class="auth__login__buttons_3">
              <div class="auth__login__button_back" onClick={switchToStep3}>
                <img src={west_dark} />
              </div>
              <div
                class="auth__login__button_next_3"
                onClick={() => {
                  handleReg();
                  resetState();
                  
                }}
              >
                <p>Завершить</p>
              </div>
            </div>
          </div>
        </div>
      )}
      ;
    </div>
  );
};


export default AuthModal;