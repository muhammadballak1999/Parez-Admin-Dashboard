import { REQUEST } from '../../../Request';
import { POST, PUT, GET, DELETE } from '../../../Request/requestMethods';
import { toast } from '../../../utils/toast';
import i18n from '../../../i18n'

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
    }else  {
       if(response.error) {
        toast(i18n.messages[i18n.locale].label[response.message], 'error');
        }
    }
    return response;
}


export const updateUser = async ({dispatch}, payload) => {

    let response = await REQUEST(`/users/${payload.id}`, PUT, payload.user);
    if(response.success) {
        if(payload.type === 'admins'){
            dispatch('getAdmins');
        }else if(payload.type === 'users'){
            dispatch('getUsers');
        }else{
            dispatch('getPoliceStations');
        }
    }else{
        if(response.error) {
            toast(i18n.messages[i18n.locale].label[response.message], 'error');
        }
    }
    return response;
}

export const deactivate = async ({dispatch}, payload) => {

    let response = await REQUEST(`/users/${payload.id}/deactivate`, PUT);
    if(response.success) {
        if(payload.type === 'admins'){
            dispatch('getAdmins');
        }else if(payload.type === 'users'){
            dispatch('getUsers');
        }else{
            dispatch('getPoliceStations');
        }
        toast(i18n.messages[i18n.locale].label.userDeactivate, 'error');
    }else{
        toast(i18n.messages[i18n.locale].label.deactivateFail, 'error');
    }
}

export const activate = async ({dispatch}, payload) => {

    let response = await REQUEST(`/users/${payload.id}/activate`, PUT);
    if(response.success) {
        if(payload.type === 'admins'){
            dispatch('getAdmins');
        }else if(payload.type === 'users'){
            dispatch('getUsers');
        }else{
            dispatch('getPoliceStations');
        }
        toast(i18n.messages[i18n.locale].label.userActivate, 'error');
    }else{
        toast(i18n.messages[i18n.locale].label.somethingWrong, 'error')
    }
}