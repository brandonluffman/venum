import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {RxHamburgerMenu, RxLockClosed} from 'react-icons/rx'
import Search from './Search';
import { BsCaretDown, BsCaretDownFill, BsFillLockFill, BsHouseLockFill, BsLock, BsLockFill, BsX } from 'react-icons/bs';
import NavSearch from './NavSearch';

const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const [isActivate, setActivate] = useState(false);
  const [hamburgerClass, setHamburgerClass] = useState('');
  const [navbarClass, setNavbarClass] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn]= useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const toggleShow = () => {
    setActive(!isActive);
  };

  const handleShow = () => {
    if (isActive) {
      setHamburgerClass('nav-menu-toggled');
    } else {
      setHamburgerClass('');
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setNavbarClass('scrolled');

    } else {
      setNavbarClass('');
    }
  };

  useEffect(() => {
    handleShow();
  }, [isActive]);

  useEffect(() => {
    // Your code here
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array, effect runs only once on mount/unmount

  return (
    <nav className={`navbar ${navbarClass}`}>
     
        <Link href='/'>
        <div className='nav-brand-container'>
        <img className='nav-img' src='/favicon.jpeg'></img>
        <h1 className='navbar-brand-name'>VENUM</h1>
        </div>
        </Link>
        <ul className='nav-menu'>
  
            {/* <Link href='/' className='nav-link-container'><li className='nav-link'>Home</li></Link> */}
            <div className="navbar-item has-dropdown">
                  <a className="nav-link">Company <BsCaretDownFill className='nav-drop-icon'/></a>
                  <div className="navbar-dropdown">
                    <h2>Company</h2>
                  <Link href='/'><li className='navbar-item dropdown-nav-item'>About Us</li></Link>
                  <Link href='/'><li className='navbar-item dropdown-nav-item'>Our Mission</li></Link>
                  </div>
            </div>
            {/* <div className="navbar-item has-dropdown">
                  <a className="nav-link">Products <BsCaretDownFill className='nav-drop-icon'/></a>
                  <div className="navbar-dropdown">
                  <h2>Products</h2>
                  <Link href='/'><li className='navbar-item nav-item-glass dropdown-nav-item'>Screeners <RxLockClosed /></li></Link>
                  <Link href='/'><li className='navbar-item nav-item-glass dropdown-nav-item'>Heatmaps <RxLockClosed /></li></Link>
                  <Link href='/'><li className='navbar-item dropdown-nav-item'>Pricing</li></Link>
                  </div>
            </div> */}
            <div className="navbar-item has-dropdown">
                  <a className="nav-link">Tools <BsCaretDownFill className='nav-drop-icon'/></a>
                  <div className="navbar-dropdown">
                  <h2>Tools</h2>
                  <Link href='/news'><li className='navbar-item dropdown-nav-item'>News Screener</li></Link>
                  {/* <Link href='/'><li className='navbar-item nav-item-glass dropdown-nav-item'>DCF Calculator <RxLockClosed /></li></Link>
                  <Link href='/'><li className='navbar-item nav-item-glass dropdown-nav-item'>Equity Research Reports <RxLockClosed /></li></Link> */}
                  </div>
            </div>
            <div className="navbar-item has-dropdown">
                  <a className="nav-link">Markets <BsCaretDownFill className='nav-drop-icon'/></a>
                  <div className="navbar-dropdown">
                  <h2>Markets</h2>
                  <Link href='/stocks'><li className='navbar-item dropdown-nav-item'>Stocks</li></Link>
                  <Link href='/bonds'><li className='navbar-item dropdown-nav-item'>Bonds</li></Link>
                  <Link href='/etfs'><li className='navbar-item dropdown-nav-item'>ETFs</li></Link>
                  <Link href='/futures'><li className='navbar-item nav-item-glass dropdown-nav-item'>Futures</li></Link>
                  <Link href='/forex'><li className='navbar-item nav-item-glass dropdown-nav-item'>Forex</li></Link>
                  <Link href='/indices'><li className='navbar-item nav-item-glass dropdown-nav-item'>Indices</li></Link>
                  {/* <Link href=''><li className='navbar-item nav-item-glass dropdown-nav-item'>Crypto</li></Link> */}
                  <Link href='/macro'><li className='navbar-item dropdown-nav-item'>Economy</li></Link>
                  {/* <Link href='/realestate'><li className='navbar-item dropdown-nav-item'>Real Estate</li></Link> */}
                  </div>
            </div>
            <div className='nav-search-container'><NavSearch /></div>

            {/* <button className='nav-start-btn'>Get Started</button> */}
        
            {/* <Link href='/gpt' className='nav-link-container'><li className='nav-link'>GPTFinance<span className='beta-badge'>Beta</span></li></Link> */}
            {/* <div className='nav-login-container'>
              <Link href="/api/auth/login" className='nav-link-container'><li className='nav-link'>Login</li></Link>
            </div> */}
        </ul>

        <div className={`nav-menu-toggle ${hamburgerClass}`}>
          <div className='no-flexer'>
            <h2 className='hamburger-header'>VENUM<span className='ai-color-change'></span></h2>
            <Link href='/' className='nav-link-container'>
            <li className='nav-link mobile-nav-link'>Company <BsCaretDownFill />
              <ul className='dropdown'>
                <li>About us</li>
                <li>Our Mission</li>
              </ul>
              </li>
            </Link>
           
            <Link href='/stocks' className='nav-link-container'><li className='nav-link mobile-nav-link'>Products <BsCaretDownFill />
            <ul className='dropdown'>
                <li>Screeners</li>
                <li>Heatmaps</li>
                <li>Pricing</li>
              </ul>
              
              </li></Link>
            <Link href='/macro' className='nav-link-container'><li className='nav-link mobile-nav-link'>Tools <BsCaretDownFill />
              <ul className='dropdown'>
                  <li>DCF Calculator</li>
                  <li>Equity Research Reports</li>
                  <li>IPO Listings</li>

              </ul>

              </li></Link>
            <Link href='/gpt' className='nav-link-container'><li className='nav-link mobile-nav-link'>Markets <BsCaretDownFill />
            <ul className='dropdown'>
                <li>Stocks</li>
                <li>Bonds</li>
                <li>ETFs</li>
                <li>Futures</li>
                <li>Forex</li>
                <li>Indices</li>
                <li>Crypto</li>
                <li>Economy</li>
              </ul>

              </li></Link>
            {/* <span className='beta-badge'>Beta</span> */}
            </div>
        </div>
        <div className=''>

        </div>
        <button className='hamburger-menu' type='button' onClick={toggleShow}>{isActive ? <BsX className='close-menu'/>:<RxHamburgerMenu />}</button> 
        <Link href='/account'>        {loggedIn && (
          <div className='log-avatar'>
            <img src='/avatar.png'></img>
          </div>
        )}</Link>               

    </nav>
  )
}

export default Navbar