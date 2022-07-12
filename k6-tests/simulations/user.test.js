import { group } from 'k6';
import Login from '../requests/login.request';
import data from '../data/usuarios.json';
import User from '../requests/user.request';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '5s', target: 50 },
        { duration: '10s', target: 10 },
        { duration: '5s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(99) < 1000']
    }
}

export default function () {

    let login = new Login()             //Chamando a classe Login criada
    let user = new User()               //Chamando a classe User criada

    group('login and get toke', () => {
        login.access(data.userOK.user, data.userOK.pass)          //Chamando metodo access e passar user e pass

    })

    group('list users', () => {
        user.list(login.getToken())     //Passar o user list da classe User, com o parâmetro token q é o getToken da classe login que retorna o token no fim
        
    })
}