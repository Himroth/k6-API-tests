import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class customerPost {
    postCustomer(id, email, firstName, lastName, phone, token) {
        let response = http.post(`${Utils.getBaseUrl()}/customers`, JSON.stringify(
            {
                "address": {
                    "id": id
                },
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "phone": phone
            }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,                
                    "Accept": "application/json"
                    
                }
            }
        )
        check(response, { 'Post deve retornar status 201': r => r && r.status === 201 })
    }
}