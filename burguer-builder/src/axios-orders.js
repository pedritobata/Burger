import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-86531.firebaseio.com/'
})

export default instance;