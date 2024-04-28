import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header.js';
import ProductCard from './ProductCard.js';
import ProductDetails from './ProductDetails';
import Rewiews from './Rewiews';
import SimilarModelCard from './SimilarModelCard';
import Remixes from './Remixes';
import Profile from './Profile';
import Footer from './Footer';
import ProfileWorks from './ProfileWorks';
import ProfileCollection from './ProfileCollection';
import ProfileFav from './ProfileFavourites';
import MainPageSlider from './MainPageSlider.js'
import MainPageTags from './MainPageTags.js'
import MainPageTop from './MainPageTop.js'
import MainPageNew from './MainPageNew.js';
import MainPageForYou from './MainPageForYou.js'
import MainPageAuthors from './MainPageAuthors.js';
import ProfileReports from './ProfileReports.js';

const CARD_OF_PRODUCT = ({ onDataReceived }) => (
  <div>
    <ProductCard onDataReceived={onDataReceived}/>
    <ProductDetails onDataReceived={onDataReceived}/>
    <Rewiews onDataReceived={onDataReceived}/>
    <Remixes onDataReceived={onDataReceived}/>
    <SimilarModelCard onDataReceived={onDataReceived}/>
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
)

const USER_PROFILE = ({ onDataReceived }) => (
  <div>
    <Profile />
    <ProfileWorks  onDataReceived={onDataReceived} />
  </div>
)

const USER_PROFILE_WORKS = () => ({ onDataReceived }) => (
  <div>
    <Profile />
    <ProfileWorks  onDataReceived={onDataReceived} />
  </div>
)

const USER_PROFILE_COLLECTION = () => (
  <div>
    <Profile />
    <ProfileCollection />
  </div>
)

const USER_PROFILE_FAV = () => (
  <div>
    <Profile />
    <ProfileFav />
  </div>
)

const USER_PROFILE_REP = () => (
  <div>
    <Profile />
    <ProfileReports />
  </div>
)

const App = () => {
  const [responseData, setResponseData] = useState(null);
  const onDataReceived = (data) => {
    console.log('Данные получены:', data);
  }
  return (
    <Router>
      <div className='page'>
        <Header />
        <Routes>
          <Route path="/" element={<CARD_OF_PRODUCT onDataReceived={onDataReceived}/>} />
          <Route path="/profile" element={<USER_PROFILE onDataReceived={onDataReceived}/>} />
          <Route path="/profile/collection" element={<USER_PROFILE_COLLECTION />} />
          <Route path="/profile/favourites" element={<USER_PROFILE_FAV />} />
          <Route path="/profile/works" element={<USER_PROFILE_WORKS/>}/>
          <Route path="/profile/reports" element={<USER_PROFILE_REP />} />
          <Route path="/snailweb" element={<MAIN_PAGE />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};
export default App;