import NavBar from "./NavBar"
import styled from "styled-components"

export default function Historic() {
    return (
        <>
            <NavBar></NavBar>
            <Container>
                <CreateHabits>
                    <h1>Histórico</h1>
                    <h2>Em breve você poderá ver o histórico dos seus hábitos aqui!</h2>
                </CreateHabits>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: 70px;
    margin-bottom: 70px;
    background-color: #e5e5e5;
    height: calc(100vh - 140px);
    padding-left: 10px;
    padding-right: 10px;
    overflow-y: scroll;
`

const CreateHabits = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    margin-bottom: 25px;
    gap: 17px;
    h1{
        font-family: "Lexend Deca", sans-serif;
        font-weight: 400;
        font-size: 22px;
        color: #126ba5;
    }
    h2{
        font-family: "Lexend Deca", sans-serif;
        font-weight: 400;
        font-size: 18px;
        color: #666666; 
    }
`