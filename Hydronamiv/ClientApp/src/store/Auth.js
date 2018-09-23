const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
const IS_NOT_AUTHENTICATED = 'IS_NOT_AUTHENTICATED';
const REQUEST_ERROR = 'REQUEST_ERROR';

const initialState = {
    isAuthenticated: false,
    error: ''
}

export const actionCreators = {
    requestIsAuthenticated: () => async (dispatch) => {
        try {
            let token;
            let allCookies = document.cookie;
            let cookieArray = allCookies.split(';');
            for (let i = 0; i < cookieArray.length; i++) {
                let name = cookieArray[i].split('=')[0];
                let value = cookieArray[i].split('=')[1];

                if (name === 'dgps_token') {
                    token = value;
                }
            }

            console.log(token);

            const response = await fetch('api/Authentication/IsAuthenticated',
                {
                    method: 'POST',
                    headers: { 'Authentication': `Bearer ${token}` },
                    credentials: 'same-origin'
                });

            console.log(response.status);

            if (response.status === 200) {
                dispatch({ type: IS_AUTHENTICATED });
            }
            else {
                dispatch({ type: IS_NOT_AUTHENTICATED });
            }
        }
        catch (e) {
            dispatch({ type: REQUEST_ERROR, error: e });
        }
    }
}

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
                error: ''
            }
        case IS_NOT_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: false,
                error: ''
            }
        case REQUEST_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                error: action.error
            }
    }
    return state;
}