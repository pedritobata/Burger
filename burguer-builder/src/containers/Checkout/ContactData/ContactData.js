import React,{Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{

    state = {
       orderForm:{
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country : {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod : {
                elementType: 'select',
                elementConfig: {
                   options: [
                       {value:'fastest', displayValue: 'Fastest'},
                       {value:'cheapest', displayValue: 'Cheapest'},
                   ]
                },
                value: ''
            }
       },
        loading : false
    }


    orderHandler = (event) => {
        event.preventDefault();
         this.setState({loading:true});

        const order = {
            ingredients : this.props.ingredients,
            //En producción se debe calcular el precio total  EN EL SERVIDOR!!
            //para que no vaya a ser manipulado por alguien en el frontend
            price : this.props.price,
            //agrego un poco de dummy data extra:
           
        }


        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading:false});
        }); 
    }

    inputChangedHandler = (event, inputIdentifier) => {
        //usamos un clon del state ya que con setState no podemos llegar a la
        //profundidad de la propiedad que queremos actualizar , por los objetos anidados
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        //sigo clonando mas profundo
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        //recien uso setState
        this.setState({orderForm: updatedOrderForm});
    }


    render(){

        const formElementsArray = [];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = ( 
            <form>
                {formElementsArray.map(formElement => {
                    return (
                        <Input 
                            key={formElement.id}
                            elementType={formElement.config.elementType} 
                            elementConfig={formElement.config.elementConfig} 
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
                    )
                })}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter youy Contact Data</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;