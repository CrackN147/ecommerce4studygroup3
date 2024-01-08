import { useContext } from 'react';
import { FavsDataContext } from 'global/contexts/FavsDataContext';
import favImage from 'theme/images/favs.svg';
import favImageHover from 'theme/images/favsHover.svg';
export const SwitchFavsButton = ({ productId }) => {
  const { isInFavorites, switchFavorite } = useContext(FavsDataContext);
  const toggleFavs = () => {
    switchFavorite(productId);
  }
  return (
    <button className='switch-favs-button'
      onClick={toggleFavs}
    >
      {
        isInFavorites(productId) ?
          <img src={favImageHover} alt='fav' />
        :
          <img src={favImage} alt='fav' />
      }
    </button>
  );
}