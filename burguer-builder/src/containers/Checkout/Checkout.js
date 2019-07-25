import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';

import ContactData from './ContactData/ContactData';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component{
    state = {
        ingredients: null,
       /*  price:0 */
    }

    

    /* componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = +param[1];
            }
           
        }
        this.setState({ingredients:ingredients, totalPrice: price});
    } */

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
        //console.log('contact data :' , this.props.match.path);
    }

    render(){
        let summary = <Redirect to="/" />
        const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;

        if(this.props.ings){
            summary = (
                <div>
                {purchaseRedirect}
                
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    CheckoutCancelled={this.checkoutCancelledHandler}
                    CheckoutContinued={this.checkoutContinuedHandler}
                     />
                     <Route path={this.props.match.path + '/contact-data'}  
                     /*  render={(props)=> 
                      (<ContactData ingredients={this.props.ings} 
                          price={this.state.totalPrice}  {...props}/>)} */
                     component={ContactData} />
                </div>
             
            );
        }
        return summary;
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
        price: state.order.totalPrice
    };
}


export default connect(mapStateToProps)(Checkout);