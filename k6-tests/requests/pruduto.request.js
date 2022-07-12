import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Produto { 
    postProduto(descricao, preço, nome, token) {
        let response = http.post(`${Utils.getBaseUrl()}/products`, JSON.stringify(
            {
                "description": descricao,
                "itemPrice": preço,
                "name": nome
            }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,                
                    "Accept": "application/json"
                }
            }
        )
        check(response, { 'Post produto deve retornar status 201': r => r && r.status === 201 })
    }
}