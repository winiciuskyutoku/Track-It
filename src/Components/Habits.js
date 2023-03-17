import { Link } from "react-router-dom"
import styled from "styled-components"
import NavBar from "./NavBar"
import { useEffect } from "react"
import axios from "axios"
import plus from "../assets/+.png"
import { useState } from "react"
import CreateHabitButton from "./CreateHabitButton"

export default function Habit({ token }) {

    const [loading, setLoading] = useState(null)
    const [habits, setHabits] = useState([])
    const [visible, setVisible] = useState(false)
    const [days, setDays] = useState([])
    const [name, setName] = useState("")
    const [habitsBody, setHabitsBody] = useState("")

    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

    useEffect(() => {

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        axios.get(url, config)
            .then(sucess => {
                setHabits(sucess.data)
                setLoading(true)
            })
            .catch(fail => console.log(fail.response.data))
    }, [])

    console.log(habits)

    function habitBox() {
        setVisible(true)
    }

    function postHabit(e) {
        e.preventDefault()

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const body = { name: name, days: days }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        axios.post(url, body, config)
            .then(sucess => console.log(sucess.data))
            .catch(fail => console.log(fail.response.data.message))
    }

    if (loading === null) {
        return (
            <>
                <NavBar></NavBar>
                <Container>
                    Carregando...
                </Container>
            </>
        )
    }

    if (habits.length === 0) {
        return (
            <>
                <NavBar />
                <Container>
                    <CreateHabits>
                        <h1>Meus hábitos</h1>
                        <button onClick={habitBox}><img src={plus}></img></button>
                    </CreateHabits>
                    <HabitsContainer>
                        <HabitBox visible={visible}>
                            <input placeholder="nome do hábito" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={false}></input>
                            <DaysButton visible={visible}>
                                {weekDays.map((e, i) => <CreateHabitButton e={e} i={i} setDays={setDays} days={days} />)}
                            </DaysButton>
                            <SaveHabit>
                                <h2 onClick={() => setVisible(false)}>Cancelar</h2>
                                <button onClick={postHabit}><h3>Salvar</h3></button>
                            </SaveHabit>
                        </HabitBox>
                        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                    </HabitsContainer>
                </Container>

            </>
        )
    } else {
        return (
            <>
                <NavBar />
                <Container>
                    <CreateHabits>
                        <h1>Meus hábitos</h1>
                        <button onClick={habitBox}><img src={plus}></img></button>
                    </CreateHabits>
                    <HabitsContainer>
                        <HabitBox visible={visible}>
                            <input placeholder="nome do hábito" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={false}></input>
                            <DaysButton visible={visible}>
                                {weekDays.map((e, i) => <CreateHabitButton e={e} i={i} setDays={setDays} days={days} />)}
                            </DaysButton>
                            <SaveHabit>
                                <h2 onClick={() => setVisible(false)}>Cancelar</h2>
                                <button onClick={postHabit}><h3>Salvar</h3></button>
                            </SaveHabit>
                        </HabitBox>
                        {habits.map(e => {
                            return (
                                <HabitBox>
                                    <h2>{e.name}</h2>
                                </HabitBox>
                            )
                        })}
                    </HabitsContainer>
                </Container>
            </>
        )
    }


}

const Container = styled.div`
    margin-top: 70px;
    margin-bottom: 70px;
    background-color: #e5e5e5;
    height: calc(100vh - 140px);
    padding-left: 10px;
    padding-right: 10px;
`

const CreateHabits = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    margin-bottom: 25px;
    align-items: center;
    h1{
        font-family: "Lexend Deca", sans-serif;
        font-weight: 400;
        font-size: 22px;
        color: #126ba5;
    }
    button{
        width: 40px;
        height: 35px;
        text-align: center;
        background-color: #52b6ff;
        border: none;
        border-radius: 5px; 
    }
`

const HabitsContainer = styled.div`
    p{
        font-family: "Lexend Deca", sans-serif;
        color: #666666;
        font-size: 18px;
    }
`

const HabitBox = styled.div`
    display: ${(props) => props.visible === false ? "none" : "flex"};
    flex-direction: column;
    width: 100%;
    height: 220px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin-bottom: 30px;

    padding: 20px;
    box-sizing: border-box;
    input{
        width: 100%;
        height: 50px;
        border-radius: 5px;
        border: 1px solid #d4d4d4;
        padding-left: 10px;
        box-sizing: border-box;

        font-family: "Lexend Deca", sans-serif;
        font-weight: 400;
        font-size: 20px;
        color: #666666;
    }
    input::placeholder{
        color: #dbdbdb;
        font-family: "Lexend Deca", sans-serif;
        font-weight: 400;
        font-size: 20px;
    }
`

const DaysButton = styled.div`
    display: flex;
    justify-content: flex-start;

    margin-top: 6px;
    gap: 4px;
`

const SaveHabit = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    margin-top: 80px;
    gap: 20px;
    h2{
        color: #52b6ff;
        font-family: "Lexend Deca", sans-serif;
        font-size: 16px;
        font-weight: 400;
    }
    button {
        width: 84px;
        height: 35px;
        color: #FFFFFF;
        background-color: #52b6ff;
        font-family: "Lexend Deca", sans-serif;
        font-size: 16px;
        border:none;
        border-radius: 5px;
    }
`