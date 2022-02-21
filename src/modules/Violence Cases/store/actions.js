import { REQUEST } from '../../../Request';
import { POST, GET, PUT } from '../../../Request/requestMethods';
import { toast } from '../../../utils/toast';

export const getViolenceCases = async ({commit}) => {
    let response = await REQUEST('/violence-cases', GET)
    commit('GET_VIOLENCE_CASES', response.data)
}

export const updateViolenceCaseStatus = async ({dispatch}, payload) => {
    let response = await REQUEST(`/violence-cases/${payload.id}/${payload.status}`, PUT)
    dispatch('getViolenceCases');
}

