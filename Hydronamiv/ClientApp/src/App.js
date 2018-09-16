import React, { Component } from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Block from './components/Block';
import LogIn from './components/LogIn';

export const auth = {
    isAuthenticated: false
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) =>
        auth.isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    } />    
)

class App extends Component {
    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <PrivateRoute path='/block1' component={Block} />
                <PrivateRoute path='/block2' component={Block} />
                <PrivateRoute path='/block3' component={Block} />
                <PrivateRoute path='/block4' component={Block} />
                <PrivateRoute path='/block5' component={Block} />
                <PrivateRoute path='/block7' component={Block} />
                <Route path='/login' component={LogIn} />
            </Layout>
        )
    }
}

export default App;
