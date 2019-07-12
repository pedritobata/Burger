import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliar';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error : null,
        }

        //Usamos componentWillMount en vez de componentDidMount porque
        //Este componente es un wrapper general de otros componentes hijos
        //por lo tanto necesitamos definir los interceptors antes que los hijos se hayan cargado
        //para que los interceptors funcionen tambien para ellos!!!
        //Tambien se podría usar el constructor para esto
        componentWillMount(){
            //creamos los interceptors y los guardamos como propiedades del state del componente
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error : null});
                return req;
            })

            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error : error});
            });
        }

        //usamos esta funcion del lifecycle para quitar los interceptors que se hayan creado al usar
        //este componente una vez que el componente ya no se use, ya que si re utilizamos este componente en varias ocasiones para envolver otros
        //componentes, entonces los interceptores se seguirían creando y acumulando en vano!!
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
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