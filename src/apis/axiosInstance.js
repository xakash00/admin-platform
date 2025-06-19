import axios from "axios";

const api = axios.create({
    baseURL: 'https://auth-service-wts6.onrender.com/api/v1',
    // withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        'ngrok-skip-browser-warning': 'true'
    }
})


// api.interceptors.response.use(
//     res => res,
//     err => {
//         console.log({ err })
//         if (err.response?.status === 401) {
//             // logout(); // Clear auth state and redirect
//             console.log("logout");
//             api({
//                 url: "/logout", method: "POST", withCredentials: true
//             }).then(() => {
//                 console.log("hello")
//                 localStorage.removeItem('auth');
//             }).catch(err => {

//                 console.log(err)
//             })
//         }
//         return Promise.reject(err);
//     }
// );
export default api