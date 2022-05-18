import { REQUEST } from '../../../Request';
import { DELETE, GET, POST, PUT } from '../../../Request/requestMethods';
import { toast } from '../../../utils/toast';
import i18n from '../../../i18n';

export const getAnnouncementsAndRules = async ({commit}) => {
    let response = await REQUEST('/announcements-and-rules', GET);
    if(response.success) {
        commit('GET_ANNOUNCEMENTS_AND_RULES', response.data);
    }else{
        toast(i18n.messages[i18n.locale].label.somethingWrong, 'error')
    }
}

export const createAnnouncementAndRule = async ({dispatch}, payload) => {

    let response = await REQUEST('/announcements-and-rules', POST, payload);
    if(response.success)
    await dispatch('getAnnouncementsAndRules');
}

export const updateAnnouncementAndRule = async ({dispatch}, payload) => {

    let response = await REQUEST(`/announcements-and-rules/${payload.id}`, PUT, payload.body);
    if(response.success)
    await dispatch('getAnnouncementsAndRules');
}

export const deleteAnnouncementAndRule = async ({dispatch}, id) => {

    let response = await REQUEST(`/announcements-and-rules/${id}`, DELETE);
    if(response.success)
    await dispatch('getAnnouncementsAndRules');
}

export const deleteAnnouncementAndRuleImage = async ({dispatch}, id) => {

    let response = await REQUEST(`/announcements-and-rules/${id}/image`, DELETE);
    if(response.success)
    await dispatch('getAnnouncementsAndRules');
}
