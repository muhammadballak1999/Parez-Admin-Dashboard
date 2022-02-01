import { REQUEST } from '../../Request';
import { POST, GET } from '../../Request/requestMethods';
import { toast } from '../../utils/toast';

// Auth
export const signIn = async ({commit}, payload) => {
    let response = await REQUEST('/logIn', POST, payload, true);
    if(response.success) {
        commit('SIGN_IN' ,response.data);
    }
    if(response.error) {
        toast('Wrong credentials!', 'error');
    }
}
