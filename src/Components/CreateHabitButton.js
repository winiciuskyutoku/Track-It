import {useEffect, useState} from "react"
import styled from "styled-components"

export default function CreateHabitButton({e, i, setDays, days, enable}){
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        if(days.length === 0){
            setClicked(false)
        }
    }, [days])


    function click(){
        if(clicked === false){
            setClicked(true)
        } else if (clicked === true){
            setClicked(false)
        }

        if(!days.includes(i)){
            setDays([...days, i])
        } else {
            days.filter((event, index) => {
                if(event === i){
                    days.splice(index, 1, )
                }
            })
        }
        console.log(days)
    }

    return (
        <Button clicked={clicked} enable={enable} onClick={click} disabled={enable}>{e}</Button>
    )

}

const Button = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: ${(props) => props.clicked === false ? "#FFFFFF" : "#CFCFCF"};
    color: ${(props) => props.clicked === false ? "#d4d4d4" : "#FFFFFF"};
    border: 1px solid #d4d4d4;

    font-size: 20px;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
`