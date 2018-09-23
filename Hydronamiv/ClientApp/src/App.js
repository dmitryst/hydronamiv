import React, { Component } from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Block from './components/Block';
import LogIn from './components/LogIn';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest, isAuthenticated }) => (
    <Route {...rest} render={props =>
        isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
    } />    
)

const App = (props) => (
    <Layout>
        <Route exact path='/' component={Home} />
        <PrivateRoute path='/block1' component={Block} isAuthenticated={props.isAuthenticated} />
        <PrivateRoute path='/block2' component={Block} isAuthenticated={props.isAuthenticated} />
        <PrivateRoute path='/block3' component={Block} isAuthenticated={props.isAuthenticated} />
        <PrivateRoute path='/block4' component={Block} isAuthenticated={props.isAuthenticated} />
        <PrivateRoute path='/block5' component={Block} isAuthenticated={props.isAuthenticated} />
        <PrivateRoute path='/block7' component={Block} isAuthenticated={props.isAuthenticated} />
        <Route path='/login' component={LogIn} />
    </Layout>
)

const mapStateToProps = state => ({
    isAuthenticated: state.logIn.isAuthenticated
});

export default connect(mapStateToProps, null, null, {
    pure: false,
})(App);