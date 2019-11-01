import React, {Component} from 'react';

import Aux from '../../../hoc/Auxiliar';
import Button from '../../UI/Button/Button';

//Este componente lo hemos vuelto del tipo class solo para usar los metodos del lifecycle
//En realidad debería ser un componente funcional!!!
class OderSummary extends Component {

    //Implementamos este metodo solo para debuggear
    componentWillUpdate(){
        //console.log('[OrderSummary] willUpdate');
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igkey => {
           return (<li key={igkey}>
               <span style={{textTransform: 'capitalize'}}>{igkey}</span>: {this.props.ingredients[igkey]}
               </li>)
        }) ;

        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        );
    }
}


export default OderSummary;