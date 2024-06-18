import axios from 'axios'

const baseUrl = axios.create({ baseURL: `https://app.renttoo.net/` });


export default baseUrl; 