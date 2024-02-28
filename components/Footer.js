import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
    <footer className="footer">
      <div className="container-fluid footer-container" id="services">
           <div className='footer-top'>
            <div className='footer-brand-container'>
              <div className='footer-brand-img'>
                  {/* <img src='/logo-home.png' alt="Brand Logo" className='footer-brand-logo' loading="lazy" /> */}
                  <h1 className='footer-brand-name'>VENUM</h1>
              </div>
              
              {/* <div className='social-icons'>
                <Link href='https://twitter.com/ranki_ai' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-twitter social-icon" icon={faTwitter} alt='Social Icon' /></Link>
                <Link href='https://instagram.com/ranki.ai' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-instagram social-icon" icon={faInstagram} alt='Social Icon' /></Link>
                <Link href='https://www.linkedin.com/company/rankiai/' target='_blank' rel='no-referrer' ><FontAwesomeIcon className="fa-brands fa-linkedin social-icon" icon={faLinkedinIn} alt='Social Icon' /></Link>
              </div> */}
              </div>
              
              <div className='footer-links-container'>
                          <div className='footer-links'>
                            <div className='footer-links-header'><p className='footer-link-header'>General</p></div>
                            <Link href='/'><div className='footer-link'>Home</div></Link>
                            <Link href='/stocks'><div className='footer-link'>Stocks</div></Link>
                            <Link href='/macro'><div className='footer-link'>Macro</div></Link>
                            {/* <Link href='/screener'><div className='footer-link'>Screener</div></Link> */}
                            <Link href='/gpt'><div className='footer-link'>GPTFinance</div></Link>
                            {/* <Link href='/login'><div className='footer-link'>Login</div></Link> */}
                            {/* <Link href='/contact'><div className='footer-link'>Contact Us</div></Link> */}
                          </div>
                          <div className='footer-links'>
                            <div className='footer-links-header'><p className='footer-link-header'>Support</p></div>
                            {/* <Link target='_blank' rel='noreferrer' href='https://www.privacypolicygenerator.info/live.php?token=X9rYsibwbs1UKYQ41C7KL0IBJSIEOkts'><div className='footer-link'>Privacy Policy</div></Link>
                            <Link target='_blank' rel='noreferrer' href="https://www.termsofusegenerator.net/live.php?token=WtIAwIaSx5ilU5RgC3s2N2AtWAptbnTh"><div className='footer-link'>Terms of Use</div></Link> */}
                            <div className='footer-link'>Privacy Policy</div>
                            <div className='footer-link'>Terms of Use</div>
                            {/* <Link href='/'><div className='footer-link'>FAQs</div></Link> */}
                          </div>
                          {/* <div className='footer-links contact-links'>
                            <p className='footer-links-header'>Contact</p>
                            <p className='footer-link'><GoMail className='footer-contact-icon' /> info@ranki.ai</p> 
                            <p className='footer-link'><IoIosPhonePortrait className='footer-contact-icon' /> (111) 222-3333</p> 
                          </div> */}
                </div>
              </div>   
              <div className='copyright-footer'>
                  <p className='footer-copyright-content'>Copyright © {new Date().getFullYear()} VENUM - All Rights Reserved.</p>
              </div>
              <div className='copyright-footer'>
                  <p className='footer-phantom'>Powered by <Link className='footer-phantom-brand' rel='no-referrer' target='_blank' href='https://phantomdm.com'>Phantom</Link></p>
              </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer