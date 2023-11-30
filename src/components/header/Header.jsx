import { useContext } from 'react';
import { StaticDataContext } from 'global/contexts/StaticDataContext';
import { Link } from "react-router-dom";
import logo from 'theme/images/logo.jpg';
import search from 'theme/images/search.png';
import cart from 'theme/images/shopping-cart.png';
import fav from 'theme/images/favorite.png';
export const Header = () => {
  const { lang, langs, changeLanguage } = useContext(StaticDataContext);console.log(langs);
  return (
    <header className='w-100'>
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
        <div className='search-container d-flex justify-content-center align-items-center col col-4'>
          <input type="text" />
          <button>
            <img src={search} alt='search' />
          </button>
        </div>
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
            <div className='col col-4 d-flex justify-content-center align-items-center'>
              <Link to={`/${lang}/cart`}>
                <img width="16" height="16" src={cart} alt='cart' />
              </Link>
            </div>
            <div className='col col-4 d-flex justify-content-center align-items-center'>
              <Link to={`/${lang}/favorites`}>
                <img width="16" height="16" src={fav} alt='fav' />
              </Link>
            </div>
            <div className='col col-4 d-flex justify-content-center align-items-center cursor-pointer'>
              <div onClick={changeLanguage}>
                {lang === 'en' ? 'KA' : 'EN'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}