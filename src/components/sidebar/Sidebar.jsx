import { Link } from 'react-router-dom';
export const Sidebar = () => {
  return (
    <div className='sidebar col col-3 border-right'>
      <Link to={``}>
        Profile
      </Link>
      <Link to={``}>
        Orders
      </Link>
      <Link to={``}>
        Cart
      </Link>
      <Link to={``}>
        Favorites
      </Link>
      <Link to={``}>
        Settings
      </Link>
      <button type="button">
        Logout
      </button>
    </div>
  )
}