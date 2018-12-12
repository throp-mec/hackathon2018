import path from 'path';
import axios from 'axios';

const HOSTNAME = '10.101.12.240';
const PORT = 8081;
const API_URL = `http://${HOSTNAME}:${PORT}/api/`;

export function getTiles() {
    return axios.get(API_URL + 'data').then( response => {
        console.log(response.data.data.frames);
        return response.data.data.frames;
    });
}
