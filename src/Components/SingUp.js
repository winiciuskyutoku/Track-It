import logo from "../assets/Group 8.png"
import { Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"

export default function SignUp() {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(<input data-test="signup-btn" type="submit" value="Cadastrar" required></input>)
    const [on, setOn] = useState(false)

    const navigate = useNavigate()

    function signup(e) {
        e.preventDefault()

        setOn(true)

        setLoading(<button data-test="signup-btn"><ThreeDots width="51px" height="15px" color="#FFFFFF" /></button>)

        const body = { email, name, image, password }

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"
        const promise = axios.post(url, body)

        promise.then(() => navigate("/"))
        promise.catch((fail) => {
            setOn(false)
            setLoading(<input data-test="signup-btn" type="submit" value="Cadastrar" required></input>)
            alert(fail.response.data.message)
        })

    }

    return (
        <Container>
            <img src={logo} alt="logo"></img>
            <form onSubmit={signup}>
                <input data-test="email-input" type="email" placeholder="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} disabled={on} required></input>
                <input data-test="password-input" type="password" placeholder="senha" value={password} id="password" onChange={(e) => setPassword(e.target.value)} disabled={on} required></input>
                <input data-test="user-name-input" type="text" placeholder="nome" value={name} id="name" onChange={(e) => setName(e.target.value)} disabled={on} required></input>
                <input data-test="user-image-input" type="url" placeholder="foto" value={image} id="image" onChange={(e) => setImage(e.target.value)} disabled={on} required></input>
                {loading}
            </form>
            <Link to={"/"}>
                <p data-test="login-link">Já tem uma conta? Faça login!</p>
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