import { Link } from "react-router-dom"
import styled from "styled-components"
import NavBar from "./NavBar"
import { useEffect } from "react"
import axios from "axios"
import plus from "../assets/+.png"
import { useState } from "react"
import CreateHabitButton from "./CreateHabitButton"
import trash from "../assets/Vector-2.png"

export default function Habit({ token }) {

    const [loading, setLoading] = useState(null)
    const [habits, setHabits] = useState([])
    const [visible, setVisible] = useState(false)
    const [days, setDays] = useState([])
    const [name, setName] = useState("")
    const [enable, setEnable] = useState(false)

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
    }, [habits])

    function habitBox() {
        setVisible(true)
    }

    function postHabit(e) {
        e.preventDefault()

        setEnable(true)

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const body = { name: name, days: days }
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        axios.post(url, body, config)
            .then(sucess => {
                setHabits([...habits, sucess.data])
                setVisible(false)
                setEnable(false)
                setName("")
                setDays([])
            })
            .catch(fail => alert(fail.response.data.message))
    }

    function deleteHabit(id){
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }

        if(window.confirm("Deseja mesmo remover esse hábito?") === true){
            axios.delete(url, config).then(sucess => console.log(sucess.data)).catch(fail => console.log(fail.response.data.message))
        }
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
                        <button onClick={habitBox} data-test="habit-create-btn"><img src={plus}></img></button>
                    </CreateHabits>
                    <HabitsContainer>
                        <HabitBox visible={visible} data-test="habit-create-container">
                            <input data-test="habit-name-input" placeholder="nome do hábito" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={enable}></input>
                            <DaysButton visible={visible}>
                                {weekDays.map((e, i) => <CreateHabitButton e={e} i={i} setDays={setDays} days={days} enable={enable}/>)}
                            </DaysButton>
                            <SaveHabit>
                                <h2 onClick={() => setVisible(false)} data-test="habit-create-cancel-btn">Cancelar</h2>
                                <button onClick={postHabit} data-test="habit-create-save-btn"><h3>Salvar</h3></button>
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
                        <button onClick={habitBox} data-test="habit-create-btn"><img src={plus}></img></button>
                    </CreateHabits>
                    <HabitsContainer>
                        <HabitBox visible={visible} data-test="habit-create-container">
                            <input data-test="habit-name-input" placeholder="nome do hábito" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={enable}></input>
                            <DaysButton visible={visible}>
                                {weekDays.map((event, i) => <CreateHabitButton e={event} i={i} setDays={setDays} days={days} enable={enable}/>)}
                            </DaysButton>
                            <SaveHabit>
                                <h2 onClick={() => setVisible(false)} data-test="habit-create-cancel-btn">Cancelar</h2>
                                <button onClick={postHabit} data-test="habit-create-save-btn"><h3>Salvar</h3></button>
                            </SaveHabit>
                        </HabitBox>
                        <ContainerList>
                            {habits.map(e => {
                                return (
                                    <HabitsList data-test="habit-container">
                                        <HabitTitle>
                                            <h2 data-test="habit-name">{e.name}</h2>
                                            <img src={trash} alt="lixo" onClick={() => deleteHabit(e.id)} data-test="habit-delete-btn"></img>
                                        </HabitTitle>
                                        <DaysButton>
                                            {weekDays.map((event, i) => <WeekDaysButton data-test="habit-day" grey={e.days.includes(i) ? true : false}>{event}</WeekDaysButton>)}
                                        </DaysButton>
                                    </HabitsList>
                                )
                            })}
                        </ContainerList>
                    </HabitsContainer>
                </Container>
            </>
        )
    }


}

const Container = styled.div`
    margin-top: 70px;
    margin-bottom: 70px;
    //padding-bottom: 50px;
    background-color: #e5e5e5;
    height: calc(100vh - 140px);
    padding-left: 10px;
    padding-right: 10px;
    overflow-y: scroll;
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

const HabitsList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 91px;
    background-color: #FFFFFF;
    border-radius: 5px;
    padding: 15px;
    gap: 8px;
    box-sizing: border-box;
`

const WeekDaysButton = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${(props) => props.grey === false ? "#FFFFFF" : "#CFCFCF"};
    color: ${(props) => props.grey === false ? "#d4d4d4" : "#FFFFFF"};
    border: 1px solid #d4d4d4;

    font-size: 20px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
`

const ContainerList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const HabitTitle = styled.div`
    display: flex;
    justify-content: space-between;
    h2{
        font-family: "Lexend Deca", sans-serif;
        font-size: 20px;
        font-weight: 400;
        color: #666666;
    }
`