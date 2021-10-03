import axios from 'axios'

const baseURL = 'http://10.174.10.105:8000/'

export const getExistingCasemapAPI = (body) => axios.post(baseURL + 'get_casemap', body.payload)

export const getExistingWellnessAPI = (body) => axios.post(baseURL + 'get_template', body.payload)

export const runAutomation = (body) => axios.post(baseURL + 'store_input_values', body)

export const runTestCase = (body) => axios.post(baseURL + 'start_automation', body)
 