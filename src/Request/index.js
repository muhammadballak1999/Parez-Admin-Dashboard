import axios from 'axios';
import { toast } from '../utils/toast';

export const REQUEST = async (resource, method, payload, noToken) => {
   if(navigator.onLine){
     try {
      let response = null;
      if(noToken) 
      response = await axios[method](`${process.env.VUE_APP_API_URL_MOBILE}${resource}`, method === 'post' ? payload : undefined);
      else if(method === 'get' || method === 'delete')
      response = await axios[method](`${process.env.VUE_APP_API_URL_MOBILE}${resource}`, {headers: {authorization: localStorage.getItem('accessToken')}});
      else 
      response = await axios[method](`${process.env.VUE_APP_API_URL_MOBILE}${resource}`, payload, {headers: {authorization: localStorage.getItem('accessToken')}});
      return response.data
     }catch(err) {
      return {error: true, ...err.response.data};
     }
  }else{  
    toast('No internet connection is available!', 'error');
    return {
      success:false,
      message: 'No internet connection is available!',
      data: null
    }
  }
}
