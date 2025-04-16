import { NavLink } from "react-router-dom";
import style from './Navigation.module.css';
import clsx from "clsx";


const Navigation = () => {
    const setActiveClass = ({ isActive }) => {
        return clsx(style.link, isActive && style.active)
    }
  return (
      <nav className={style.section}>
        <NavLink to="/" className={setActiveClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={setActiveClass}>
          Movies
        </NavLink>
      </nav>
  );
};

export default Navigation;
