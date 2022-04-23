import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { FaAutoprefixer } from "react-icons/fa";
import styles from './Layout.module.scss';
import Navigation from '../../components/Nav';
import {Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function Layout() {
  const [goToTop, setGoToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setGoToTop(window.scrollY >= 17)
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])
  const handleGoToTop = () => {
    window.scrollTo(0, 0)
  }
    return (
      <>
        <div className={styles.container}>
        <div>
          <div>
        <Navigation />
        </div>
        <div className={styles.outlet}>
          <Outlet />
        </div>
        {goToTop && (
          <button className={styles.toTop} onClick={handleGoToTop}><FaAutoprefixer color="#FF1A3C" fontSize="25px"/></button>
        )}
      </div>
      </div>
    </>
  );
}
export default Layout;