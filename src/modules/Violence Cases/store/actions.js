import { REQUEST } from '../../../Request';
import { POST, GET } from '../../../Request/requestMethods';
import { toast } from '../../../utils/toast';

export const getViolenceCases = async ({commit}) => {
    let response = await REQUEST('/violence-cases', GET)
    commit('GET_VIOLENCE_CASES', response.data)
}
