import axios from 'axios';

const apiInstance = axios.create({
   baseURL: 'http://localhost:5000',
   timeout: 5000,
   headers: {
	  'X-Test-Header': 'Hello, World!'
   }
})

export default apiInstance
