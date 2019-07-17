import React,{Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{

    state = {
        name: '',
        email: '',
        address: {
            street:'',
            postalCode:''
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
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading:false});
        }); 
    }


    render(){

        let form = ( <form>
            <input type="text" name="name"  placeholder="Your name" />
            <input type="email" name="email"  placeholder="Your email" />
            <input type="text" name="street"  placeholder="Street" />
            <input type="text" name="postal"  placeholder="Postal code" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);
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