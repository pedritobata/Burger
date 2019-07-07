import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliar';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer : true
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
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {this.props.children}
        </main>
      </Aux>
        );
    }

}
   
export default Layout;
