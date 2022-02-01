import { REQUEST } from '../../../Request';
import { DELETE, GET, POST, PUT } from '../../../Request/requestMethods';
import { toast } from '../../../utils/toast';

export const getBlogs = async ({commit}) => {
    let response = await REQUEST('/blogs', GET);
    if(response.success) {
        commit('GET_BLOGS', response.data);
    }else{
        toast('Something went wrong', 'error');
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
    toast('Blog deleted successfully', 'success');
}

export const deleteBlogImage = async ({dispatch}, id) => {

    let response = await REQUEST(`/blogs/${id}/image`, DELETE);
    if(response.success)
    await dispatch('getBlogs');
}
