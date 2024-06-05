import React, { useState, useEffect } from 'react';
import Pg from './Nav.module.css';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const [mobileView, setMobileView] = useState(false);
 
  const handleToggleNav = () => {
    if (mobileView) {
      setShowNavLinks(!showNavLinks);
    }
  };

  const checkScreenSize = () => {
    setMobileView(window.innerWidth <= 750);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div>
      <div className={Pg.nav}>
        <div className={Pg.navb}>
          <h1>DO Monitor</h1>
          <button className={Pg.navicon} onClick={handleToggleNav}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div
            className={`${Pg.navb1} ${mobileView ? 'flex-column' : ''}`}
            style={{ display: showNavLinks || !mobileView ? 'flex' : 'none' }}
          >
            {/* <Link className={Pg.lk} to="#">
              Home</Link>
             <Link to='about' smooth={true} duration={800} className={Pg.lk} >About</Link>
             <Link to='works' smooth={true} duration={800} className={Pg.lk} >Works</Link>
             <Link to='services' smooth={true} duration={800} className={Pg.lk} >Services</Link>
             <Link to='contact' smooth={true} duration={2000} className={Pg.lk}>Contact</Link> */}
            <Link to='https://www.who.int/' className={Pg.lk}>W.H.O</Link>
            <Link to='https://aistudio.google.com/' className={Pg.lk}>Gemini</Link>
            <Link smooth to='/#about' className={Pg.lk}>About</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
