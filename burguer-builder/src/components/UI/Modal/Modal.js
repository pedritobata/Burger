import React, {Component} from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliar';
import Backdrop from '../Backdrop/Backdrop';

//Este componente lo hemos vuelto del tipo class solo para usar los metodos del lifecycle
class Modal extends Component{

  shouldComponentUpdate(nextProps, nextState){
     //trataremos de hacer que el modal no se actualice cuando no se esté visualizando
     //ya que no tiene sentido
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate(){
    console.log('[Modal] willUpdate');
  }

  render(){

    return(
      <Aux>
      <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
   
       <div className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity : this.props.show? '1' : '0'
          }}>
         {this.props.children}
       </div>
     </Aux>
    );
  }
} 

export default Modal;