import { group } from 'k6';
import Login from '../requests/login.request'
import produtoData from '../data/produto.json'
import data from '../data/usuarios.json'
import Produto from '../requests/pruduto.request'


/* export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5s', target: 50 },
        { duration: '10s', target: 10 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99) < 1000']
    }
} */

export default function () {
    
    let login = new Login()
    let produto = new Produto()

    group('login and get token', () => {
        login.access(data.user.user, data.user.pass)          //Chamando metodo access e passar user e pass

    })

    group('criar produto', () => {
        produto.postProduto(produtoData.description, produtoData.itemPrice, produtoData.name, login.getToken())
    })

}