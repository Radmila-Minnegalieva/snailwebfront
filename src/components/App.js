import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import { selectSavedCardId } from "./selectors.js";
import Header from "./Header.js";
import ProductCard from "./ProductCard.js";
import ProductDetails from "./ProductDetails";
import Rewiews from "./Rewiews";
import SimilarModelCard from "./SimilarModelCard";
import Remixes from "./Remixes";
import Profile from "./Profile";
import Footer from "./Footer";
import ProfileWorks from "./ProfileWorks";
import ProfileCollection from "./ProfileCollection";
import ProfileFav from "./ProfileFavourites";
import MainPageSlider from "./MainPageSlider.js";
import MainPageTags from "./MainPageTags.js";
import MainPageTop from "./MainPageTop.js";
import MainPageNew from "./MainPageNew.js";
import MainPageForYou from "./MainPageForYou.js";
import MainPageAuthors from "./MainPageAuthors.js";
import ProfileReports from "./ProfileReports.js";

const CARD_OF_PRODUCT = () => (
  <div>
    <ProductCard />
    <ProductDetails />
    <Rewiews />
    <Remixes />
    <SimilarModelCard />
  </div>
);

const MAIN_PAGE = () => (
  <div>
    <MainPageSlider />
    <MainPageTags />
    <MainPageTop />
    <MainPageNew />
    <MainPageAuthors />
    <MainPageForYou />
  </div>
);

const USER_PROFILE = ({ onDataReceived, onClickCard }) => (
  <div>
    <Profile />
    <ProfileWorks onDataReceived={onDataReceived} onClick={onClickCard} />
  </div>
);

const USER_PROFILE_WORKS =
  () =>
  ({ onDataReceived }) =>
    (
      <div>
        <Profile />
        <ProfileWorks onDataReceived={onDataReceived} />
      </div>
    );

const USER_PROFILE_COLLECTION = () => (
  <div>
    <Profile />
    <ProfileCollection />
  </div>
);

const USER_PROFILE_FAV = () => (
  <div>
    <Profile />
    <ProfileFav />
  </div>
);

const USER_PROFILE_REP = () => (
  <div>
    <Profile />
    <ProfileReports />
  </div>
);

const App = ({ savedCardId }) => {
  const onDataReceived = (data) => {
    console.log("Данные получены:", data);
  };
  const [cardPath, setCardPath] = useState(null);
  const [cardId, setCardId] = useState(null);

  useEffect(() => {
    console.log("savedCardId:", savedCardId);
    if (typeof savedCardId === "number" && !isNaN(savedCardId)) {
      setCardId(savedCardId);
    }
  }, [savedCardId]);

  const urls = {
    profile: {
      path: "/profile",
      element: <USER_PROFILE onDataReceived={onDataReceived} />,
    },
    profile_collections: {
      path: "/profile/collection",
      element: <USER_PROFILE_COLLECTION />,
    },
    profile_favourites: {
      path: "/profile/favourites",
      element: <USER_PROFILE_FAV />,
    },
    profile_works: {
      path: "/profile/works",
      element: <USER_PROFILE_WORKS />,
    },
    profile_reports: {
      path: "/profile/reports",
      element: <USER_PROFILE_REP />,
    },
    main_page: {
      path: "/snailweb",
      element: <MAIN_PAGE />,
    },
  };

  return (
    <Router>
      <div className="page">
        <Header />
        <Routes>
          {Object.entries(urls).map(([key, { path, element }]) => (
            <Route key={key} path={path} element={element} />
          ))}
          <Route path="/card/:id" element={<CARD_OF_PRODUCT />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  console.log(state.savedCardId);
  return {
    savedCardId: selectSavedCardId(state),
  };
};

export default connect(mapStateToProps)(App);
