import NavBar from "./NavBar"
import styled from "styled-components"
import { useEffect } from "react"
import axios from "axios"

export default function Today({token}) {

    useEffect(() => {

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const config = {
            headers: { Authorization: `Bearer ${token}`}
        }
        axios.get(url, config)
        .then(sucess => console.log(sucess.data))
        .catch(fail => console.log(fail.response.data))
    }, [])

    return (
        <>
            <NavBar />
            <Container>
                <p>Hoje</p>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: 70px;
    margin-bottom: 70px;
    background-color: #e5e5e5;
    height: calc(100vh - 140px);
`