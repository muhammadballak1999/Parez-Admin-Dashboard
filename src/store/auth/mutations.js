
export function SIGN_IN (state, payload) {
    if(payload.accessToken) {
        localStorage.setItem('accessToken', `Bearer ${payload.accessToken}`);
        localStorage.setItem('isLoggedIn', true);
        location.reload();
    } 
}

export function SIGN_OUT (state) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isLoggedIn');
        state.accessToken = null;
        state.isLoggedIn = false;
        location.reload();
}