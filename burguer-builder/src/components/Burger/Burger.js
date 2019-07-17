import React from 'react';

import {withRouter} from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
    .map(igkey => {
       return [...Array(props.ingredients[igkey])].map((_, i) =>{
          return <BurgerIngredient key={igkey + i} type={igkey} />
       });
    })
    .reduce((arr, el) => {//arr: es el acumulador, el: es el current value
        return arr.concat(el);
    }, []);// el segundo parámetro es el valor inicial del acumulador, en este caso es []

   //validamos que se hayan agregado elementos al Burger
   if(transformedIngredients.length ==0){
       transformedIngredients = <p>Please start adding ingredients!</p>
   }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
           {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default withRouter(burger);