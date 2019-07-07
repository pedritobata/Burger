import React from 'react';

import classes from './Logo.module.css';

//Acá importamos el path del logo , el cual ha sido subido al servidor
//por Webpack en alguna direccion del servidor
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = (props) => (
   <div className={classes.Logo} style={{height:props.height}}>
       <img src={burgerLogo} alt="My Burger"/>
   </div>
);

export default logo;