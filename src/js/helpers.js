import {async} from 'regenerator-runtime';
import {TIMEOUT_SEC} from './config.js';
const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };


export const getJASON = async function(url){

    try{

        const fetchPro = fetch(url);

        const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
        const data = await response.json();
        console.log(data);
  
        if (!response.ok) throw new Error(`${data.message} ${response.status}`);
        return data;

    } catch(err){

        throw err;
        

    }
    
}