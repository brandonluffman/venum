import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {RxHamburgerMenu} from 'react-icons/rx'
import Search from './Search';

const Navbar = () => {
  const [isActive, setActive] = useState(false);
  const [isActivate, setActivate] = useState(false);
  const [hamburgerClass, setHamburgerClass] = useState('');
  const [navbarClass, setNavbarClass] = useState('');

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
        <h1 className='navbar-brand-name'>VENUM</h1>
        </Link>
        <ul className='nav-menu'>
  
            <Link href='/' className='nav-link-container'><li className='nav-link'>Home</li></Link>
            <Link href='/stocks' className='nav-link-container'><li className='nav-link'>Stocks</li></Link>
            <Link href='/macro' className='nav-link-container'><li className='nav-link'>Macro</li></Link>
            {/* <Link href='/gpt' className='nav-link-container'><li className='nav-link'>GPTFinance<span className='beta-badge'>Beta</span></li></Link> */}
            {/* <div className='nav-login-container'>
              <Link href="/api/auth/login" className='nav-link-container'><li className='nav-link'>Login</li></Link>
            </div> */}
        </ul>

        <div className={`nav-menu-toggle ${hamburgerClass}`}>
          <div className='no-flexer'>
            <h2 className='hamburger-header'>VENUM<span className='ai-color-change'>AI</span></h2>
            <Link href='/' className='nav-link-container'><li className='nav-link mobile-nav-link'>Home</li></Link>
            <Link href='/stocks' className='nav-link-container'><li className='nav-link mobile-nav-link'>Stocks</li></Link>
            <Link href='/macro' className='nav-link-container'><li className='nav-link mobile-nav-link'>Macro</li></Link>
            <Link href='/gpt' className='nav-link-container'><li className='nav-link mobile-nav-link'>GPTFinance<span className='beta-badge'>Beta</span></li></Link>
            </div>
        </div>
        <div className=''>

        </div>
        <button className='hamburger-menu' type='button' onClick={toggleShow}><RxHamburgerMenu /></button> 
    </nav>
  )
}

export default Navbar