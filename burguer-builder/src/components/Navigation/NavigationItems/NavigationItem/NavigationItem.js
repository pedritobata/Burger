import React from 'react';

import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName={classes.active}>{props.children}</NavLink></li>
        /* NavLink ya tiene definida la clase active por defecto para el css 
        pero OJO que la clase active NO será la misma que está el modulo css, este modulo le pone
        un nombre específico diferente!!
        className={props.active ? classes.active : null}>{props.children}</NavLink> </li> */
   
);

export default navigationItem;