import { REQUEST } from '../../../Request';
import { POST, GET, PUT } from '../../../Request/requestMethods';
import { toast } from '../../../utils/toast';
import i18n from '../../../i18n';
export const getViolenceCases = async ({commit}) => {
    let response = await REQUEST('/violence-cases', GET)
    commit('GET_VIOLENCE_CASES', response.data)
}

export const updateViolenceCaseStatus = async ({dispatch}, payload) => {
    let response = await REQUEST(`/violence-cases/${payload.id}/${payload.status}`, PUT)
    if(!response.success)
    {
        if(response.error)
        toast(i18n.messages[i18n.locale].label[response.message], 'error');
        else
        toast(i18n.messages[i18n.locale].label.somethingWrong, 'error')
    }
    dispatch('getViolenceCases');
}

