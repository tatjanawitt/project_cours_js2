import axios from 'axios'
import Contact from '../../types/Contact'

const baseUrl = 'http://localhost:3000/api/contacts'

export const getContacts = () => axios.get(baseUrl)
export const getContact = (id: number) => axios.get(`${baseUrl}/${id}`)
export const findContacts = (search: string) => axios.get(`${baseUrl}/search/${search}`)
export const addContact = (data: Contact) => axios.post(baseUrl, data);
export const editContact = (data: Contact) => axios.put(`${baseUrl}/${data.id}`, data)
export const deleteContact = (id: number) => axios.delete(`${baseUrl}/${id}`)
