import { 
  createContext,
  useState,
  useEffect
} from 'react';
import { getData, removeData } from 'global/storage';
export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {

  const checkUser = (user) => {
    let dateNow = new Date().getTime();
    if (user && user.token && user.date > dateNow) {
      return true;
    }
    return false;
  }

  const [isUser, setIsUser] = useState(
    checkUser(getData('User'))
  );

  const loginUser = () => {
    setIsUser(true);
  }

  const logoutUser = () => {
    setIsUser(false);
    removeData("User");
  }

  useEffect(() => {
    let user = getData('User');
    if (user && checkUser(user)) {
      setIsUser(true);
    }
  }, []);

  return (
    <UserDataContext.Provider value={{
      isUser,
      loginUser,
      logoutUser
    }}>
      {children}
    </UserDataContext.Provider>
  );
}