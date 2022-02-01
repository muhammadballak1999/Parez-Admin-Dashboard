import { REQUEST } from '../../../Request';
import { POST, GET } from '../../../Request/requestMethods';
// import { toast } from '../../utils/toast';

export const getUsers = async ({commit}, payload) => {
    let response = await REQUEST('/users', GET);
    if(response.success) {
        commit('GET_ALL_USERS', response.data);
    }
}
