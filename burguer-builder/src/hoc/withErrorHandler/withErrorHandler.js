import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliar';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error : null
        }

        //Usamos componentWillMount en vez de componentDidMount porque
        //Este componente es un wrapper general de otros componentes hijos
        //por lo tanto necesitamos definir los interceptors antes que los hijos se hayan cargado
        //para que los interceptors funcionen tambien para ellos!!!
        //Tambien se podría usar el constructor para esto
        componentWillMount(){
            axios.interceptors.request.use(req => {
                this.setState({error : null});
                return req;
            })

            axios.interceptors.response.use(res => res, error => {
                this.setState({error : error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render(){
            return (
                <Aux>
                    <Modal 
                    modalClosed={this.errorConfirmedHandler}
                    show={this.state.error}>

                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
   
}

export default withErrorHandler;