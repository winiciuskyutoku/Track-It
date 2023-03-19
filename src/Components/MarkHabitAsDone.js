import styled from "styled-components"
import { useState, useContext} from "react"
import axios from "axios"
import UserContext from "../contexts/UserContext"
import check from "../assets/Check.png"

export default function MarkHabitAsDone({ token, id, setChange, change, done}) {

    //const [done, setDone] = useState(false)
    const {progress, setProgress} = useContext(UserContext)

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    function asDone(e) {
        e.preventDefault()

        const body = {}
        if (done === false) {
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`
            axios.post(url, body, config)
                .then(sucess => {
                    console.log(sucess.data, "deu certo")
                    //setDone(true)
                    {change === true ? setChange(false) : setChange(true)}
                })
                .catch(fail => console.log(fail.response, "deu errado"))
        } else if (done === true){
            const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`
            axios.post(url, body, config)
                .then(sucess => {
                    console.log(sucess.data, "deu certo")
                    //setDone(false)
                    {change === true ? setChange(false) : setChange(true)}
                })
                .catch(fail => console.log(fail.response, "deu errado"))
        }
    }

    return (
        <Button onClick={asDone} done={done}><img src={check} alt="Check"></img></Button>
    )
}

const Button = styled.button`
    background-color: ${(props) => props.done === false ? "#ebebeb" : "#8FC549"};
    border: 1px solid #e7e7e7;
    box-sizing: border-box;
    border-radius: 5px;
`