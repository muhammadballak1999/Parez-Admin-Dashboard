import { REQUEST } from '../../../Request';
import { DELETE, GET, POST, PUT } from '../../../Request/requestMethods';
import { toast } from '../../../utils/toast';
import i18n from '../../../i18n';

export const getBlogs = async ({commit}) => {
    let response = await REQUEST('/blogs', GET);
    if(response.success) {
        commit('GET_BLOGS', response.data);
    }else{
        toast(i18n.messages[i18n.locale].label.somethingWrong, 'error')
    }
}

export const createBlog = async ({dispatch}, payload) => {

    let response = await REQUEST('/blogs', POST, payload);
    if(response.success)
    await dispatch('getBlogs');
}

export const updateBlog = async ({dispatch}, payload) => {

    let response = await REQUEST(`/blogs/${payload.id}`, PUT, payload.body);
    if(response.success)
    await dispatch('getBlogs');
}

export const deleteBlog = async ({dispatch}, id) => {

    let response = await REQUEST(`/blogs/${id}`, DELETE);
    if(response.success)
    await dispatch('getBlogs');
}

export const deleteBlogImage = async ({dispatch}, id) => {

    let response = await REQUEST(`/blogs/${id}/image`, DELETE);
    if(response.success)
    await dispatch('getBlogs');
}
