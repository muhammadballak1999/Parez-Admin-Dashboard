import axios from 'axios';
import { toast } from '../utils/toast';
import i18n from '../i18n'

export const REQUEST = async (resource, method, payload, noToken) => {
   if(navigator.onLine){
     try {
      let response = null;
      if(noToken) 
      response = await axios[method](`${process.env.VUE_APP_API_URL}${resource}`, method === 'post' ? payload : undefined);
      else if(method === 'get' || method === 'delete')
      response = await axios[method](`${process.env.VUE_APP_API_URL}${resource}`, {headers: {authorization: localStorage.getItem('accessToken')}});
      else 
      response = await axios[method](`${process.env.VUE_APP_API_URL}${resource}`, payload, {headers: {authorization: localStorage.getItem('accessToken')}});
      return response.data
     }catch(err) {
       console.log(err.response)
      return {error: true, ...err.response.data};
     }
  }else{ 

    toast(i18n.messages[i18n.locale].label.noNet, 'error');

    return {
      success:false,
      message: noNet,
      data: null
    }
  }
}
