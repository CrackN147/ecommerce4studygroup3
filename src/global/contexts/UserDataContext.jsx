import { 
  createContext,
  useState,
  useEffect
} from 'react';
import { getData, removeData } from 'global/storage';
import { getUserInfo } from 'global/api/endpoints';
export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

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

  const fetchUserData = async () => {
    const data = await getUserInfo();
    if (data) {
      setUserInfo(data);
    }
  }

  useEffect(() => {
    let user = getData('User');
    if (user && checkUser(user)) {
      setIsUser(true);
    }
  }, []);

  useEffect(() => {
    if (isUser) {
      fetchUserData();
    }
  }, [isUser]);

  return (
    <UserDataContext.Provider value={{
      isUser,
      loginUser,
      logoutUser,
      userInfo,
      fetchUserData
    }}>
      {children}
    </UserDataContext.Provider>
  );
}