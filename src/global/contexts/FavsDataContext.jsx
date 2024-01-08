import { createContext, useState, useEffect, useContext } from "react";
import {existsData, getData, setData} from 'global/storage';
export const FavsDataContext = createContext();

export const FavsDataProvider = ({ children }) => {
  const [favs, setFavs] = useState(getData('Favs') ?? []);

  const isInFavorites = (id) => {
    return favs.includes(id);
  }

  const switchFavorite = (id) => {
    let newFavs = [...favs];
    let index = favs.findIndex((fav) => fav === id);
    if (index !== -1) {
      newFavs.splice(index, 1);
    } else {
      newFavs.push(id);
    }
    setFavs(newFavs);
    setData('Favs', newFavs);
  }

  useEffect(() => {
    if (!existsData('Favs')) {
      setData('Favs', []);
    }
  }, []);


  return (
    <FavsDataContext.Provider value={{
      favs,
      isInFavorites,
      switchFavorite
    }}>
      {children}
    </FavsDataContext.Provider>
  );
}