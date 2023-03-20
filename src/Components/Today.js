import NavBar from "./NavBar"
import styled from "styled-components"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday.js"
import "dayjs/locale/pt-br.js"
import MarkHabitAsDone from "./MarkHabitAsDone"
import UserContext from "../contexts/UserContext"

export default function Today({ token }) {

    const {progress, setProgress} = useContext(UserContext)

    const [loading, setLoading] = useState(null)
    const [tasks, setTasks] = useState([])
    const [change, setChange] = useState(false)

    let arrayHabits = tasks.filter(e => {
        if(e.done === true){
            return true
        } else if (e.done === false){
            return false
        }
    })

    useEffect(() => {
        setProgress(Number(arrayHabits.length/tasks.length * 100))
    }, [arrayHabits])

    console.log(tasks)
    console.log(arrayHabits)

    dayjs.extend(weekday)
    let dayOfWeek = dayjs();
    let upperCase = dayOfWeek.weekday(0).locale("pt-br").format("dddd").charAt(0).toUpperCase() + dayOfWeek.weekday(0).locale("pt-br").format("dddd").slice(1).toLowerCase()

    useEffect(() => {

        if(arrayHabits.length === 0){
            setProgress(0)
        }

        const url = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today"
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        axios.get(url, config)
            .then(sucess => {
                setTasks(sucess.data)
                setLoading(true)
            })
            .catch(fail => console.log(fail.response.data))
    }, [change])

    console.log(progress)

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
    return (
        <>
            <NavBar />
            <Container>
                <CreateHabits>
                <h1 data-test="today">{upperCase}{dayOfWeek.weekday(0).locale("pt-br").format(", DD/MM")}</h1>
                <H2 data-test="today-counter" arrayHabits={arrayHabits.length}>{arrayHabits.length === 0 ? "Nenhum hábito concluído ainda" : (arrayHabits.length/tasks.length * 100).toFixed(0) + "% dos hábitos concluidos"} </H2> 
                </CreateHabits>
                <HabitsContainer>
                    {tasks.map(e => {
                            return (
                                <HabitList data-test="today-habit-container">
                                    <Title>
                                        <h2 data-test="today-habit-name">{e.name}</h2>
                                        <div>
                                            <Subtitle>
                                                Sequência atual: <P data-test="today-habit-sequence" done={e.done}>{e.currentSequence} {e.currentSequence > 1 ? "dias" : "dia"}</P>
                                            </Subtitle>
                                            <Subtitle>
                                                Seu recorde:  <P2 data-test="today-habit-record" currentSequence={e.currentSequence} highestSequence={e.highestSequence}>{e.highestSequence} {e.currentSequence > 1 ? "dias" : "dia"}</P2>
                                            </Subtitle>
                                        </div>
                                    </Title>
                                    <MarkHabitAsDone token={token} id={e.id} setChange={setChange} change={change} done={e.done}></MarkHabitAsDone>
                                </HabitList>
                            )
                        })}
                </HabitsContainer>
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
    &::-webkit-scrollbar{
        display: none;
    }
`

const CreateHabits = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    text-align: left;
    padding-top: 20px;
    margin-bottom: 25px;
    gap: 5px;
    h1{
        font-family: "Lexend Deca", sans-serif;
        font-weight: 400;
        font-size: 22px;
        color: #126ba5;
    }
`

const H2 = styled.h2`
    font-family: "Lexend Deca", sans-serif;
    font-size: 18px;
    font-weight: 400;
    color: ${(props) => props.arrayHabits === 0 ? "#BABABA" : "#8FC549"  }
`

const HabitList = styled.div`
    width: 100%;
    height: 95px;
    display: flex;

    background-color: #FFFFFF;
    font-family: "Lexend Deca", sans-serif;
    padding: 12px;
    box-sizing: border-box;

    button{
        width: 70px;
        height: 70px;
    }
    justify-content: space-between;
    border-radius: 5px;
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    h2{
        color: #666666;
        font-size: 20px;
        font-weight: 400;
    }
    font-size: 13px;
    font-weight: 400;
    color: #666666;
`

const HabitsContainer = styled.div`
    gap: 8px;
    display: flex;
    flex-direction: column;
`
const Subtitle = styled.div`
    display: flex;
`

const P = styled.p`
    color: ${(props) => props.done === true ? "#8fc549" : "#666666"};
    margin-left: 5px;
`

const P2 = styled.p`
    color: ${(props) => props.currentSequence === props.highestSequence &&  props.highestSequence > 0 ? "#8fc549" : "#666666"};
    color: ${(props) => props.currentSequence > props.highestSequence && "#666666"};
    margin-left: 5px;   
`