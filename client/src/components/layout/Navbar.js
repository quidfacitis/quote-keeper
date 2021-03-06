import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import newThreeBeers from './new_three_beers.png';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user, isAuthenticated, logout, loadUser } = authContext;

  // By putting loadUser() in the Navbar, which is present througout the app,
  // the variable "isAuthenticated" is reset to "true" every time the app re-renders.
  // This fixes the problem of "isAuthenticated" being reset to "null" when the page
  // was refreshed.
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    // pending -- clear all the beers that are in the user's personal beer library
  }

  const authLinks = (
    <Fragment>
      <li className="no-underline">Hello, {user && user.name}</li>
      <li>
        <Link to='/beerlibrary' className="no-underline">Beer Library</Link>
      </li>
      <li>
        <a href='#!' onClick={onLogout} className="no-underline">Logout</a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login' className="no-underline">Login</Link>
      </li>
      <li>
        <Link to='/register' className="no-underline">Register</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar">
      <Link to='/' className="no-underline title-container"><img src={newThreeBeers} className="small-img" alt=''/>
        <h3>Beer Keeper | Keep track of your favorite beers. Discover new ones.</h3></Link>
      <ul >
        {isAuthenticated ? authLinks : guestLinks}
        <li>
          <Link to='/about' className="no-underline">About</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;
