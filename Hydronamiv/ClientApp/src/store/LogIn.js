const authenticated = 'AUTHENTICATED_USER';
const unauthenticated = 'UNAUTHENTICATED_USER';
const authenticationError = 'AUTHENTICATION_ERROR';

const initialState = {
    isAuthenticated: false,
    error: '',
    token: '',
    numberOfLogins: 0
}

export const actionCreators = {
    requestLogIn: ({ username, password }) => async (dispatch) => {
        try {
            const response = await fetch('api/Authentication/Authenticate',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        username: username,
                        password: password
                    }),
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'same-origin'
                });

            console.log(response.status);

            //const status = response.status;

            if (response.status === 200) {
                const token = await response.text();
                console.log(token);

                dispatch({
                    type: authenticated,
                    token
                });
            }
            else {  // 401 
                dispatch({
                    type: unauthenticated,
                    error: 'Неправильный email или пароль'
                });
            }          

        } catch (e) {
            console.log(e);
            dispatch({
                type: authenticationError,
                error: 'Invalid email or password'
            });
        }
    }
}

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case authenticated:
            return {
                ...state,
                isAuthenticated: true,
                token: action.token,
                numberOfLogins: state.numberOfLogins + 1
            };
        case unauthenticated:
            return {
                ...state,
                isAuthenticated: false,
                error: action.error,
                numberOfLogins: state.numberOfLogins + 1
            };
        case authenticationError:
            return {
                ...state,
                isAuthenticated: false,
                error: action.error,
                numberOfLogins: state.numberOfLogins + 1
            };
    }
    return state;
}