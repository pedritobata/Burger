import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliar';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { timingSafeEqual } from 'crypto';

import {connect} from 'react-redux';

//cuando referencio a un index.js, este nombre se puede omitir del path porque
//react lo reconoce por defecto
import * as burgerBuilderActions from '../../store/actions/index';
import { throwStatement } from '@babel/types';



class BurgerBuilder extends Component{

    /*constructor(props){
        super(props);
        this.state = {

        }
    }*/

    state = {
        /* ingredients : null, */
        /* totalPrice: 4, */
       /*  purchaseable: false, */
        purchasing : false
     /*    loading : false,
        error: false */
    }

    componentDidMount(){

        this.props.onInitIngredients();
        /* axios.get('https://react-my-burger-86531.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients : response.data});
            console.log(response.data)
        })
        .catch( error => {
            this.setState( { error: true } );
        } ); */
    }

    updatePurchaseState(ingredients){
        
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey]
        }).reduce((sum,el)=>{
            return sum + el;
        },0);

        /* this.setState({purchaseable: sum > 0}) */

        return sum > 0;
    }

    /* addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduction;
        this.setState({totalPrice: newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
 */
    //Usamos Arrowfunction para todos los metodos que se invocarán al dispararse algun evento en el html
    //Si usamos funciones normales, el this no puede hacer referencia a la clase en la que estamos y nos arrojaria error
    //porque setState estaría tratando de acceder a un objeto Undefined
    //En arrow functions, ellas sí guardan el contexo en el this!!
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }else{
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
       
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        //alert('You continue!!');
        //Firebase usa una BD tipo MongoDB
        //para firebase el recurso o nodo se define con un nombre seguido del .json!
        /* this.setState({loading:true});

        const order = {
            ingredients : this.state.totalPrice,
            //En producción se debe calcular el precio total  EN EL SERVIDOR!!
            //para que no vaya a ser manipulado por alguien en el frontend
            price : this.state.totalPrice,
            //agrego un poco de dummy data extra:
            customer : {
                name:'Pedro Martinez',
                address:{
                    street:'Trinidad Moran 1011',
                    zipCode: '150101',
                    country : 'Peru'
                },
                email: 'pericolospalotes@gmail.com',

            },
            deliveryMethod : 'fastest'
        }


        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading:false, purchasing:false});
        })
        .catch(error => {
            this.setState({loading:false,purchasing:false});
        }); */

       /*  const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname : '/checkout',
            search: '?' + queryString
        }); */

        this.props.onInitPurchase();
        this.props.history.push('/checkout');
        

    }


    render(){

        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
      
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger  ingredients={this.props.ings}/>
                    <BuildControls 
                       ingredientAdded={this.props.onIngredientAdded}
                       ingredientRemoved={this.props.onIngredientRemoved}
                       disabled = {disabledInfo}
                       purchaseable={this.updatePurchaseState(this.props.ings)}
                       ordered={this.purchaseHandler}
                       price={this.props.price}
                       isAuth={this.props.isAuthenticated}
                     />
                </Aux>
                 );

        orderSummary =  <OrderSummary 
                 price={this.props.price}
                 purchaseCancelled={this.purchaseCancelHandler}
                 purchaseContinued={this.purchaseContinueHandler}
                 ingredients={this.props.ings} />;
        }
/* 
        if(this.state.loading){
            orderSummary = <Spinner />
        } */
        

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
               {burger}
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        /* onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT,ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT,ingredientName: ingName})
 */
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));