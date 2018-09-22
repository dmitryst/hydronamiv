const AUTHENTICATED_USER = 'AUTHENTICATED_USER';
const UNAUTHENTICATED_USER = 'UNAUTHENTICATED_USER';
const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

const initialState = {
    isAuthenticated: false,
    error: '',
    token: '',
    numberOfLogins: 0
}

export const actionCreators = {
    requestLogIn: ({ username, password }) => async (dispatch) => {
        try {
            const response = await fetch('api/Authentication/LogIn',
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
                    type: AUTHENTICATED_USER,
                    token
                });
            }
            else {  
                let errorMsg;
                switch (response.status) {
                    case 401: // unathorized
                        errorMsg = 'Неправильный пароль';         
                        break;
                    case 403: // forbidden
                        errorMsg = 'Истёк срок лицензии';         
                        break;
                    case 404: // not found
                        errorMsg = 'Неправильный email / логин';  
                        break;
                    default:
                        errorMsg = 'Попробуйте снова';
                }

                dispatch({
                    type: UNAUTHENTICATED_USER,
                    error: errorMsg
                });
            }          

        } catch (e) {
            console.log(e);
            dispatch({
                type: AUTHENTICATION_ERROR,
                error: e
            });
        }
    }
}

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case AUTHENTICATED_USER:
            return {
                ...state,
                isAuthenticated: true,
                token: action.token,
                numberOfLogins: state.numberOfLogins + 1
            };
        case UNAUTHENTICATED_USER:
            return {
                ...state,
                isAuthenticated: false,
                error: action.error,
                numberOfLogins: state.numberOfLogins + 1
            };
        case AUTHENTICATION_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                error: action.error,
                numberOfLogins: state.numberOfLogins + 1
            };
    }
    return state;
}