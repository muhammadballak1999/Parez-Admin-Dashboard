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
    let noNet = ""
    if(localStorage.getItem('lang') === 'en'){ 
      noNet = i18n.messages.en.label.noNet;
    } else if(localStorage.getItem('lang') === 'ar') {
      noNet = i18n.messages.ar.label.noNet;
    } else {
      noNet = i18n.messages.ku.label.noNet;
    }

    toast(noNet, 'error');

    return {
      success:false,
      message: noNet,
      data: null
    }
  }
}
