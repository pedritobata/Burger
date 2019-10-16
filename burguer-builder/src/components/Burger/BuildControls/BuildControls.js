import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
   {label:'Salad', type: 'salad'},
   {label:'Bacon', type: 'bacon'},
   {label:'Chesse', type: 'cheese'},
   {label:'Meat', type: 'meat'},
];


const buildControls = (props) => (
   <div className={classes.BuildControls}>
        <p>Current price : <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
       
          <BuildControl 
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
          key={ctrl.label}
          label={ctrl.label}/>
      ))}

      <button className={classes.OrderButton}
          disabled={!props.purchaseable}
          onClick={props.ordered}
      >{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER' }</button>
   </div>
);

export default buildControls;