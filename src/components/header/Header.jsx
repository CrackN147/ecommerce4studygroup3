import { useContext, useState } from 'react';
import { StaticDataContext } from 'global/contexts/StaticDataContext';
import { UserDataContext } from 'global/contexts/UserDataContext';
import { CartDataContext } from 'global/contexts/CartDataContext';
import { Link } from "react-router-dom";
import logo from 'theme/images/logo.jpg';
import shopingCart from 'theme/images/shopping-cart.png';
import fav from 'theme/images/favorite.png';
import profile from 'theme/images/profile.svg';
import userActive from 'theme/images/userActive.svg';
import { SearchBar } from './components';
import { LoginForm } from 'components/modals/LoginForm';
import { ProfileMenu } from 'components/modals/ProfileMenu';
export const Header = () => {
  const { lang, langs, changeLanguage } = useContext(StaticDataContext);
  const { isUser } = useContext(UserDataContext);
  const { cart } = useContext(CartDataContext);
  const [loginModal, setLoginModal] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const toggleLoginForm = () => {
    setLoginModal(!loginModal);
  }
  const toggleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  }
  return (
    <header className='w-100 border-bottom position-relative'>
      <div className='row m-0 p-2'>
        <div className='col col-1'>
          <Link to={`/${lang}`}>
            <img
              src={logo}
              alt='logo'
              className='logo'
            />
          </Link>
        </div>
        <SearchBar />
        <div className='col col-5 d-flex justify-content-center align-items-center'>
          <div className='row w-100'>
            <div className='col col-4'>
              <Link to={`/${lang}/about`}>
                {langs.menu.about}
              </Link>
            </div>
            <div className='col col-4'>
              <Link to={`/${lang}/gallery`}>
                {langs.menu.gallery}
              </Link>
            </div>
            <div className='col col-4'>
              <Link to={`/${lang}/contact`}>
                {langs.menu.contact}
              </Link>
            </div>
          </div>
        </div>
        <div className='col col-2 d-flex justify-content-center align-items-center'>
          <div className='row w-100'>
            <div className='col col-3 d-flex justify-content-center align-items-center'>
              <Link to={`/${lang}/cart`} className='position-relative'>
                {cart.length > 0 ?
                  <span className='cart-count'>{cart.length}</span>  
                : null}
                <img width="16" height="16" src={shopingCart} alt='cart' />
              </Link>
            </div>
            <div className='col col-3 d-flex justify-content-center align-items-center'>
              <Link to={`/${lang}/favorites`}>
                <img width="16" height="16" src={fav} alt='fav' />
              </Link>
            </div>
            <div className='col col-3 d-flex justify-content-center align-items-center cursor-pointer'
              onClick={!isUser ? toggleLoginForm : toggleProfileMenu}
            >
              <img width="16" height="16" src={!isUser ? profile : userActive} alt='profile' />
            </div>
            <div className='col col-3 d-flex justify-content-center align-items-center cursor-pointer'>
              <div onClick={changeLanguage}>
                {lang === 'en' ? 'KA' : 'EN'}
              </div>
            </div>
          </div>
        </div>
      </div>
      {loginModal ? 
        <LoginForm
          toggle={toggleLoginForm}
        />
      : null}
      {profileMenu ? 
        <ProfileMenu
          toggle={toggleProfileMenu}
        />
      : null}
    </header>
  );
}