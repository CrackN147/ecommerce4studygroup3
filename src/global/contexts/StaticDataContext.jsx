import { 
  createContext,
  useState,
  useEffect
} from 'react';
import { useNavigate } from 'react-router-dom';
import { languageList } from 'global/config';
import { getData, setData } from 'global/storage';
import {
  kaLangs,
  enLangs
} from 'global/langs';
export const StaticDataContext = createContext();

export const StaticDataProvider = ({ children }) => {
  let navigate = useNavigate();
  const [lang, setLang] = useState(
    getData('Lang') || languageList[0]
  );
  const [langs, setLangs] = useState(
    lang === 'en' ? enLangs : kaLangs
  );

  const changeLanguage = () => {
    let newLang = lang === 'en' ? 'ka' : 'en';
    setLang(newLang);
    setData('Lang', newLang);
    navigate(`/${newLang}`);
    setLangs(newLang === 'en' ? enLangs : kaLangs);
  }

  useEffect(() => {
    if (!getData('Lang')) {
      setData('Lang', languageList[0]);
    }
  }, []);

  return (
    <StaticDataContext.Provider value={{
      lang,
      langs,
      changeLanguage
    }}>
      {children}
    </StaticDataContext.Provider>
  );
}