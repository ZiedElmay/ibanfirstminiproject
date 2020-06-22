/**
 * This is the server middleware which we use
 * to send requests to the server
 */

import axios from 'axios';
import Config from '../Config';

export default class ServerMiddleware {

    static token = "";
    static interceptorLoaded = false;
    
    static loadInterceptor() {
        if(!this.interceptorLoaded) {
            var session = JSON.parse(localStorage.getItem(Config.loginStorageKey) || '');
            this.token = session ? session.token : "";
            axios.interceptors.request.use(
                request => {
                    if (this.token) {
                        request.headers['Authorization'] = 'Bearer ' + this.token;
                    }
                    return request;
                },
                error => {
                    Promise.reject(error)
            });
    
            axios.interceptors.response.use((response) => {
                return response
             }, function (error) {         
                if (error.response.status === 401 || error.response.status === 403 || error.response.status === 400) {
                    localStorage.removeItem(Config.loginStorageKey);
                    //window.location.reload();
                }
                return Promise.reject(error);
             });
             this.interceptorLoaded = true;
        }
    }

    /**
     * Send Get Request
     * @param {*} path 
     * @param {*} cb (hasError, errorMessage, data)
     */
    static get(path: string, cb: (arg0: boolean, arg1: string, arg2: never[] | null) => void) {
        this.loadInterceptor();
        axios.get(Config.apiUrl + path)
        .then(serverResponse => {      
            cb(false, "", serverResponse.data || null);
        })
        .catch(err => {
            if(err.response && err.response.status === 404) {
                cb(false, "", []);
            }
            else {
                cb(true, "There was an error. Please report this.", null);
            }
        });
    }
 
}
