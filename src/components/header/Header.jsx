import { useContext } from 'react';
import { StaticDataContext } from 'global/contexts/StaticDataContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import logo from 'theme/images/logo.jpg';
import search from 'theme/images/search.png';
import cart from 'theme/images/shopping-cart.png';
import fav from 'theme/images/favorite.png';
export const Header = () => {
  const { lang, changeLanguage } = useContext(StaticDataContext);
  return (
    <header className=''>
      <Row>
        <Col className='p-2 col-2'>
          <Link to={`/${lang}`}>
            <img
              src={logo}
              alt='logo'
              className='logo'
            />
          </Link>
        </Col>
        <Col className='search-container col-3'>
          <input type="text" />
          <button>
            <img src={search} alt='search' />
          </button>
        </Col>
        <Col className='col-5 p-2 menu'>
          <Row className='w-100'>
            <Col>
              <Link to={`/${lang}/about`}>
                About Us
              </Link>
            </Col>
            <Col>
              Gallery
            </Col>
            <Col>
              Contact Us
            </Col>
          </Row>
        </Col>
        <Col className='col-2 p-2 menu'>
          <Row className='w-100'>
            <Col>
              <img width="16" height="16" src={cart} alt='cart' />
            </Col>
            <Col>
              <img width="16" height="16" src={fav} alt='fav' />
            </Col>
            <Col>
              <div onClick={changeLanguage}>
                {lang === 'en' ? 'KA' : 'EN'}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
}