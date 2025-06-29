import axios, { type InternalAxiosRequestConfig } from 'axios'

const baseUrl = `${import.meta.env.VITE_BASE_URL}/api`;

const api = axios.create({baseURL: baseUrl})


api.interceptors.request.use(
	async (config: InternalAxiosRequestConfig ) => {
		const token = await localStorage.getItem('token')
		if(token) {
			if(config.headers){
				config.headers['x-token'] = token
			}
		}
		return config
	}
)
export default api