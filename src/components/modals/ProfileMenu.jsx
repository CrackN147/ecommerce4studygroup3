import { useContext } from "react";
import { Link } from "react-router-dom";
import { StaticDataContext } from "global/contexts/StaticDataContext";
import { UserDataContext } from "global/contexts/UserDataContext";
export const ProfileMenu = ({toggle}) => {
  const { lang, langs } = useContext(StaticDataContext);
  const { logoutUser } = useContext(UserDataContext);

  const logoutUserRedirect = () => {
    logoutUser();
    toggle();
  }
  return (
    <div className="profile-menu">
      <h4 className="text-center">
        {langs.profileMenu.title}
      </h4>
      <Link to={`/${lang}/profile`}>
        {langs.profileMenu.profile}
      </Link>
      <button
        type="button"
        onClick={logoutUserRedirect}
      >
        {langs.profileMenu.logout}
      </button>
    </div>
  )
};