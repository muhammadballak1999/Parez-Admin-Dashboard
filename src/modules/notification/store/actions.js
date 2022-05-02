import { REQUEST } from '../../../Request';
import { DELETE, GET, POST, PUT } from '../../../Request/requestMethods';
import { toast } from '../../../utils/toast';

export const getNotifications = async ({commit}) => {
    let response = await REQUEST('/notifications', GET);
    if(response.success) {
        commit('GET_NOTIFICATIONS', response.data);
    }else{
        toast('Something went wrong', 'error');
    }
}

export const createNotification = async ({dispatch}, payload) => {
    let response = await REQUEST('/notifications', POST, payload);
    if(response.success) {
        dispatch('getNotifications');
    }else{
        toast('Something went wrong', 'error');
    }
}

export const updateNotification = async ({dispatch}, payload) => {
    let response = await REQUEST(`/notifications/${payload.id}`, PUT, payload.body);
    if(response.success) {
        dispatch('getNotifications');
    }else{
        toast('Something went wrong', 'error');
    }
}

export const deleteNotification = async ({dispatch}, id) => {
    let response = await REQUEST(`/notifications/${id}`, DELETE);
    if(response.success) {
        dispatch('getNotifications');
    }else{
        toast('Something went wrong', 'error');
    }
}