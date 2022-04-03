import axios from "axios"


const API = ({method , url , data}) => {
    const token = localStorage.getItem('token')
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