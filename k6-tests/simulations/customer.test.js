import { group } from 'k6';
import Login from '../requests/login.request'
import customerPost from '../requests/customerPost.request'
import customerData from '../data/customer.json'
import data from '../data/usuarios.json'


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
    let customer = new customerPost()

    group('login and get token', () => {
        login.access(data.user.user, data.user.pass)          //Chamando metodo access e passar user e pass

    })

    group('criar cliente', () => {
        customer.postCustomer(customerData.address.id, customerData.data.email, customerData.data.firstName, customerData.data.lastName, customerData.data.phone, login.getToken())
    })

}