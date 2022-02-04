import { REQUEST } from '../../../Request';
import { POST, GET } from '../../../Request/requestMethods';
import { toast } from '../../../utils/toast';

export const getUsers = async ({commit}, keyword) => {
    let response = await REQUEST(`/users/${keyword || undefined}`, GET);
    if(response.success) {
        commit('GET_USERS', response.data);
    }
}

export const getAdmins = async ({commit}, keyword) => {
    let response = await REQUEST(`/users/admins/${keyword || undefined}`, GET);
    if(response.success) {
        commit('GET_ADMINS', response.data);
    }
}


export const getPoliceStations = async ({commit}, keyword) => {
    let response = await REQUEST(`/users/police-stations/${keyword || undefined}`, GET);
    if(response.success) {
        commit('GET_POLICE_STATIONS', response.data);
    }
}


export const createUser = async ({dispatch}, payload) => {

    let response = await REQUEST('/users', POST, payload.user);
    if(response.success) {
        if(payload.type === 'admin'){
            dispatch('getAdmins');
        }else if(payload.type === 'user'){
            dispatch('getUsers');
        }else{
            dispatch('getPoliceStations');
        }
    }else{
        toast('Something went wrong!', 'error');
    }
}