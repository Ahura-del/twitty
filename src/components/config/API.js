import axios from "axios"

const token = localStorage.getItem('token')

const API = ({method , url , data}) => {
    try {
     return   axios({
            method:method,
            url:url,
            data:method === 'get'  ? null : data ,
            headers:{'authorization': `Bearer ${token}`}
        })
    } catch (error) {
        return console.log(error.respond)
    }
}
export default API