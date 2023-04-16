import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { localStorageUser } from '../utils/globalConstants';
import { BASE_URL, userEnd } from '../utils/apiRoutes';

const Section = styled.div`
height: 100vh;
display: flex;
align-items: center;
justify-content: center;

form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid red;
}
`

const Login = () => {
    const navigate = useNavigate();

    interface userLoginProps {
        email: string,
        password: string
    }
    
    const [user, setUser] = useState<userLoginProps>()

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, [e.target.name]: e.target.value } as userLoginProps)
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault()
        const {data} = await axios.post(`${BASE_URL}${userEnd}login`, {
            email: user?.email,
            password: user?.password 
        });
        console.log(data);
        if (data.status === 'success') {
            data.user.token = data.token
            localStorage.setItem(localStorageUser, JSON.stringify(data.user))
            navigate('/')
        }
    }

    const handleForgetPassword = async (e : any) => {
        if (!user?.email) {
            console.log("Enter email");
            return
        }
        const {data} = await axios.post(`${BASE_URL}${userEnd}forgotpassword`, {
            email: user?.email
        })
        console.log(data);
    }

  return (
    <Section>
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder='Email' value={user?.email} onChange={(e) => handleChange(e)} />
            <input type="password" name="password" placeholder='Password' value={user?.password} onChange={(e) => handleChange(e)} />
            <button type="submit">Login</button>
        </form>
            <button onClick={handleForgetPassword} >Forgot Password??</button>
    </Section>
  )
}

export default Login

// Error handling