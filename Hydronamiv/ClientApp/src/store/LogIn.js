const authenticated = 'AUTHENTICATED_USER';
const unauthenticated = 'UNAUTHENTICATED_USER';
const authenticationError = 'AUTHENTICATION_ERROR';

const initialState = {
    isAuthenticated: false,
    error: '',
    token: ''
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

            const token = await response.text();

            console.log(token);

            dispatch({
                type: authenticated,
                token
            });

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
                token: action.token               
            };
        case unauthenticated:
            return {
                ...state,
                isAuthenticated: false
            };
        case authenticationError:
            return {
                ...state,
                isAuthenticated: false,
                error: action.error
            };
    }
    return state;
}