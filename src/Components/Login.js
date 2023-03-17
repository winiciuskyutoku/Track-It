import styled from "styled-components"
import logo from "../assets/Group 8.png"
import {Link, useNavigate} from "react-router-dom"
import {useContext, useState} from "react"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner"
import UserContext from "../contexts/UserContext"


export default function Login({setToken}){

    const [loading, setLoading] = useState(<input type="submit" value="Entrar" required></input>)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [on, setOn] = useState(false)
    const navigate = useNavigate()

    const {setUser} = useContext(UserContext)

    function login(e){

        e.preventDefault()

        setOn(true)

        setLoading(<button><ThreeDots width="51px" height="15px" color="#FFFFFF" /></button>)

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"
        const body = {email, password}
        axios.post(url, body)
        .then((sucess) => {
            setToken(sucess.data.token)
            setUser(sucess.data.image)
            navigate("/hoje")
        })
        .catch((fail) => {
            setOn(false)
            alert(fail.response.data.message)
            setLoading(<input type="submit" value="Entrar" required></input>)
        })

    }

    return(
        <Container>
            <img src={logo} alt="logo"></img>
            <form onSubmit={login}>
                <input type="email" placeholder="email" value={email} id="email" disabled={on} onChange={(e) => setEmail(e.target.value)} required></input>
                <input type="password" placeholder="senha" value={password} id="password" disabled={on} onChange={(e) => setPassword(e.target.value)} required></input>
                {loading}
            </form>
            <Link to={"/cadastro"}>
                <p>Não tem uma conta? Cadastre-se!</p>
            </Link>

        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    img{
        width: 180px;
        height: auto;

        margin-top: 68px;
    }
    form{
        display: flex;
        flex-direction: column;

        gap: 6px;
        margin-top: 32px;
    }
    input, button{
        width: 303px;
        height: 45px;
        border-radius: 5px;

        border: 1px solid #D4D4D4;
        box-sizing: border-box;

        padding-left: 10px;
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        font-weight: 400;
    }
    input:disabled{
        background-color: #F2F2F2;
        border: 1px solid #d4d4d4;
        color: #afafaf;
    }
    input[type="submit"]{
        background-color: #52B6FF;
        color: #FFFFFF;
        border: none;

        padding-left: none;
        font-family: "Lexend Deca", "sans-serif";
        font-weight: 400;
        font-size: 21px;
    }
    p{
        text-decoration: underline;
        font-family: "Lexend Deca", "sans-serif";
        color: #52B6FF;
        margin-top: 25px;
    }
    button{
        background-color: #52B6FF;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`