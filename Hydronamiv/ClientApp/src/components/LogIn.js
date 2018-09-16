import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import './LogIn.css';
import { actionCreators } from '../store/LogIn';
import { Redirect } from 'react-router-dom';
import { auth } from '../App';

class LogIn extends Component {
    state = {
        credentials: {
            username: '',
            password: ''
        },
        error: '',
        isAuthenticated: false,
        numberOfLogins: 0
    }

    // numberOfLogins каждый раз привавляется на 1,
    // поэтому componentWillReceiveProps после редюсера каждый раз вызывается
    // и обновляет сообщение об ошибке
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({ isAuthenticated: nextProps.isAuthenticated });
        this.setState({ error: nextProps.error });
    }

    dismissError = () => {
        this.setState({ error: '' });
    }

    handleChange = e => {
        const credentials = this.state.credentials;
        credentials[e.target.name] = e.target.value;
        this.setState({ credentials: credentials });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (!this.state.credentials.username) {
            return this.setState({ error: 'Введите e-mail' });
        }

        if (!this.state.credentials.password) {
            return this.setState({ error: 'Введите пароль' });
        }

        console.log(this.state.credentials);
        this.props.requestLogIn(this.state.credentials);
    }

    render() {        
        const { credentials, isAuthenticated } = this.state;

        console.log(isAuthenticated);

        auth.isAuthenticated = this.props.isAuthenticated;

        if (isAuthenticated) {
            const { from } = this.props.location.state || {
                from: { pathname: '/' }
            }

            return (
                <Redirect to={from} />
            )
        }      

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel panel-login">
                            <div className="panel-heading">
                                <div className="row">
                                    <div className="col-xs-6">
                                        <a href="/" className="active" id="login-form-link">Войти</a>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <form onSubmit={this.handleSubmit} style={{ display: 'block' }}>
                                            {
                                                this.state.error &&
                                                <h3 data-test="error" onClick={this.dismissError}>
                                                    <button onClick={this.dismissError}>X</button>
                                                    {this.state.error}
                                                </h3>
                                            }

                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="username"
                                                    tabIndex="1"
                                                    className="form-control"
                                                    placeholder="E-mail / Логин"
                                                    value={credentials.username}
                                                    onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    tabIndex="2"
                                                    className="form-control"
                                                    placeholder="Пароль"
                                                    value={credentials.password}
                                                    onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <div className="row">
                                                    <div className="col-sm-6 col-sm-offset-3">
                                                        <input
                                                            type="submit"
                                                            tabIndex="3"
                                                            className="form-control btn btn-login"
                                                            value="Войти" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.logIn.isAuthenticated,
        error: state.logIn.error,
        token: state.logIn.token,
        numberOfLogins: state.logIn.numberOfLogins
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(LogIn);