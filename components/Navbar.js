import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {RxHamburgerMenu} from 'react-icons/rx'

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
        {/* <Link href='/' className='nav-brand-link'><p className='nav-brand'>VENUM.</p><p className='nav-brand-color-change'>AI</p></Link> */}
        <Link href='/'>
        {/* <h1 className='navbar-brand-name'>venum<span className='ai-color-change'>AI</span></h1> */}
        <h1 className='navbar-brand-name'>VENUM</h1>

        </Link>
        {/* <Search /> */}
        {/* <ul className='nav-menu'>
            <Link href='/stocks' className='nav-link-container'><li className='nav-link'>Stocks</li></Link>
            <Link href='/screener' className='nav-link-container'><li className='nav-link'>Screener</li></Link>
            <Link href='/api' className='nav-link-container'><li className='nav-link'>API</li></Link>
            <Link href='/api' className='nav-link-container'><li className='nav-link'>GPTFinance<span className='beta-badge'>Beta</span></li></Link>
        </ul> */}
        <ul className='nav-menu'>
        {/* {user ? (
      <Link href="/api/auth/logout" className='nav-link-container'><li className='nav-link'>Logout</li></Link>
      ) : (
        <Link href="/api/auth/login" className='nav-link-container'><li className='nav-link'>Login</li></Link>
        )} */}
            <Link href='/' className='nav-link-container'><li className='nav-link'>Home</li></Link>
            <Link href='/stocks' className='nav-link-container'><li className='nav-link'>Stocks</li></Link>
            <Link href='/macro' className='nav-link-container'><li className='nav-link'>Macro</li></Link>
            {/* <Link href='/screener' className='nav-link-container'><li className='nav-link'>Screener</li></Link> */}

            {/* <Link href='/pricing' className='nav-link-container'><li className='nav-link'>Pricing</li></Link>
            <Link href='/screener' className='nav-link-container'><li className='nav-link'>Screener</li></Link> */}
            {/* <Link href='/docs' className='nav-link-container'><li className='nav-link'>API</li></Link>
            <Link href='/blog' className='nav-link-container'><li className='nav-link'>Blog</li></Link> */}
            <Link href='/gpt' className='nav-link-container'><li className='nav-link'>GPTFinance<span className='beta-badge'>Beta</span></li></Link>
            {/* <Link href='/stocks'><li className='nav-link'>Stocks</li></Link> */}
            {/* <Link href='/screener'><li className='nav-link'>Screener</li></Link> */}
            {/* {user ? (
              <div className='nav-user-div'>
                <Link href='/'><li className='nav-link'>Hello, {user.name} &#x1F44B;</li></Link>
                <Link href='/api/auth/logout'><li className='nav-link'>Logout</li></Link>
                </div>
              ):
              (<Link href='/api/auth/login'><li className='nav-link'>Login</li></Link>)
              }  */}
        </ul>

        <div className={`nav-menu-toggle ${hamburgerClass}`}>
          <div className='no-flexer'>
            <h2 className='hamburger-header'>VENUM<span className='ai-color-change'>AI</span></h2>
            <Link href='/' className='nav-link-container'><li className='nav-link mobile-nav-link'>Home</li></Link>
            <Link href='/stocks' className='nav-link-container'><li className='nav-link mobile-nav-link'>Stocks</li></Link>
            <Link href='/macro' className='nav-link-container'><li className='nav-link mobile-nav-link'>Macro</li></Link>
            {/* <Link href='/pricing' className='nav-link-container'><li className='nav-link'>Pricing</li></Link>
            <Link href='/screener' className='nav-link-container'><li className='nav-link'>Screener</li></Link>
            <Link href='/docs' className='nav-link-container'><li className='nav-link'>API</li></Link>
            <Link href='/blog' className='nav-link-container'><li className='nav-link'>Blog</li></Link> */}
            <Link href='/gpt' className='nav-link-container'><li className='nav-link mobile-nav-link'>GPTFinance<span className='beta-badge'>Beta</span></li></Link>
            {/* <Link className='nav-link' href='/stocks'>Stocks</Link> */}
            {/* <Link className='nav-link' href='/screener'>Screener</Link> */}
            {/* {user ? (
              <div className='nav-user-div'>
                <Link href='/'><li className='nav-link'>Hello, {user.name} &#x1F44B;</li></Link>
                <Link href='/api/auth/logout'><li className='nav-link'>Logout</li></Link>
                </div>
              ):
              (<Link href='/api/auth/login'><li className='nav-link'>Login</li></Link>)
              }  */}
            </div>
        </div>
        <div className=''>

        </div>
        <button className='hamburger-menu' type='button' onClick={toggleShow}><RxHamburgerMenu /></button> 
    </nav>
  )
}

export default Navbar