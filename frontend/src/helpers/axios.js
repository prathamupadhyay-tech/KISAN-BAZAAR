import axios from 'axios'

import { apiPrefix } from '../constants/contants'

export const customInstance = () =>{
  console.log(localStorage.getItem("token"))
    return axios.create({
        baseURL : apiPrefix,
        headers : {
          'authorization': localStorage.getItem("token")
        }
    })
}

