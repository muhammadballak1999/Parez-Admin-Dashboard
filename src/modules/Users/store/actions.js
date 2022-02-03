import { REQUEST } from '../../../Request';
import { POST, GET } from '../../../Request/requestMethods';
// import { toast } from '../../utils/toast';

export const getUsers = async ({commit}, payload) => {
    let response = await REQUEST('/users', GET);
    if(response.success) {
        commit('GET_USERS', response.data);
    }
}

export const getAdmins = async ({commit}, keyword) => {
    let response = await REQUEST(`/users/admins/${keyword}`, GET);
    if(response.success) {
        commit('GET_ADMINS', response.data);
    }
}


export const getPoliceStations = async ({commit}, payload) => {
    let response = await REQUEST('/users/police-stations', GET);
    if(response.success) {
        commit('GET_POLICE_STATIONS', response.data);
    }
}
