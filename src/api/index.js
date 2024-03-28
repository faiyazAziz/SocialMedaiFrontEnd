import axios from "axios"

const API = axios.create({baseURL: "https://social-api-sdvi.onrender.com"});

export const registerUser = async ({email,name, password, password2, tc})=>{
    await axios.post("/account/register/", {
        email,
        name,
        password,
        password2,
        tc,
    })
}