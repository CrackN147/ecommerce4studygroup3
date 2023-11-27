import { 
  createContext,
  useState,
  useEffect
} from 'react';
import { useNavigate } from 'react-router-dom';
import { languageList } from 'global/config';
import { getData, setData } from 'global/storage';
export const StaticDataContext = createContext();

export const StaticDataProvider = ({ children }) => {
  let navigate = useNavigate();
  const [lang, setLang] = useState(
    getData('Lang') || languageList[0]
  );

  useEffect(() => {
    if (!getData('Lang')) {
      setData('Lang', languageList[0]);
    }
  }, []);

  const changeLanguage = () => {
    let newLang = lang === 'en' ? 'ka' : 'en';
    setLang(newLang);
    setData('Lang', newLang);
    navigate(`/${newLang}`);
  }


  return (
    <StaticDataContext.Provider value={{
      lang,
      changeLanguage
    }}>
      {children}
    </StaticDataContext.Provider>
  );
}