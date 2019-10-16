import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliar';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrawer : false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler = () => {
        //No usar esta forma ya que el setState es asincrono y puede funcionar mal
        //cuando se haga la negacion del state.showSideDrawer
        //this.setState({showSideDrawer:!this.state.showSideDrawer});
        this.setState((prevState)=>{
            return {showSideDrawer:!prevState.showSideDrawer};
        })
    }

    render(){
        return (
      <Aux>
        <Toolbar 
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer 
        isAuth={this.props.isAuthenticated}
        open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {this.props.children}
        </main>
      </Aux>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
   
export default connect(mapStateToProps)(Layout);
