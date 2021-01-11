import React from "react";
import { Link } from "react-router-dom";
import classes from "./Nav.module.css";
const Nav = () => {
  return (
    <nav className={classes.Navbar}>
      <Link className ={classes.Link} to="/">Home</Link>
      <Link className ={classes.Link} to="/videos">Videos</Link>
      <Link className ={classes.Link} to="/videos/flist">Favourite List</Link>
      <Link className ={classes.Link} to='/none' >AnyWhere</Link>
    </nav>
  );
};

export default Nav;


