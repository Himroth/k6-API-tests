import { check } from "k6"
import http from "k6/http"
import Utils from "../utils/utils"

export default class Login {        //Classe de login
    #token

    access(user, pass) {            //Metodo de login
        let response = http.post(`${Utils.getBaseUrl()}/login`, JSON.stringify(     //Passando todo o corpo  para obter o token
            {
                "username": user,
                "password": pass
            }
        ), {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        this.#token = response.json('accessToken')                  //Aqui pega o access token do response
        check(response, {                                            //Check tirado do script gerado, aqui checamos o status
            "status must be equal 201": (r) => r.status === 201
        });
    }

    getToken() {                        //Metodo criado para usar em outros lugar para retornar apena o token
        return this.#token
    }
}