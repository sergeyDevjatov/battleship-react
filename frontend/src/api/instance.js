import axios from 'axios';
import Cookies from 'universal-cookie';

import { apiUrl } from '../config/config';


const cookies = new Cookies();

let instanceParams = {
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
};

if (cookies.get('cookie')) {
    instanceParams.headers['set-cookie'] = `${cookies.get('cookie')}`;
}

let instance = axios.create(instanceParams);

export default instance;