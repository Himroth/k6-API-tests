import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class User { 
    list(token) {   //Listagem de usuário sendo feita pedindo o token
        let response = http.get(`${Utils.getBaseUrl()}/users`, {    //Faz get no users
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        check(response, { 'Listagem deve retornar 200': r => r && r.status === 200})
    }
}