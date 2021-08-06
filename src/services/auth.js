import axios from 'axios'
import { nanoid } from 'nanoid'


const apiKey = "$2b$10$Rot7cnaWIyKNK3176hanqu.FWY7eDp.lK2UcbyoUeqT1GiU9ScGBK"

const getAllUsers = () => {
    return axios.get(process.env.REACT_APP_AUTH_URL,
        {
            headers: {
                "X-MASTER-KEY": apiKey,
            }
        }
    )
}

export const getUser = () => {
    return localStorage.getItem('users')
}

export const login = async (email, password) => {

    let { data } = await getAllUsers()
    let user = data.record.filter(v => v.email === email && v.password === password)

    if (user.length > 0) {
        alert("status")
        localStorage.setItem('logged', true)
        localStorage.setItem('users', user[0].email.split('@')[0])
        return ({
            status: 200,
            success: true,
            errMsg: "login success"
        })
    }

    return ({
        status: 400,
        success: false,
        errMsg: "email and password invalid"
    })

}


export const register = async (email, password) => {

    let { data } = await getAllUsers()
    if (data.record.map(v => v.email).includes(email)) return ({
        status: 400,
        success: false,
        errMsg: "email and password invalid"
    })

    let newUser = {
        id: nanoid(),
        email: email,
        password: password,
    }

    data.record.push(newUser)

    return await axios.put(process.env.REACT_APP_AUTH_URL, data.record,
        {
            headers: {
                "X-MASTER-KEY": apiKey,
                "Content-Type": "application/json"
            }
        })
}

export const logout = () => {
    // delete logged 
    localStorage.removeItem('logged');
    localStorage.removeItem('users');
    // redirect to login
    return window.location = "/"
}



