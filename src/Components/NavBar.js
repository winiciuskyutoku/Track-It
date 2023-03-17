import styled from "styled-components"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import {Link} from "react-router-dom"
import UserContext from "../contexts/UserContext";
import { useContext } from "react";

export default function NavBar() {

    const percentage = 30;

    const { user } = useContext(UserContext)

    return (
        <>
            <Top>
                <p>TrackIt</p>
                <img src={user} alt="pfp"></img>
            </Top>
            <Bottom>
                <Link to="/habitos">
                    <p>Hábitos</p>
                </Link>
                
                <p>Histórico</p>
            </Bottom>
            <Link to="/hoje">
                <CircularContainer>
                    <CircularProgressbar value={percentage}
                    text="Hoje"
                    background={true}
                    backgroundPadding={5}
                    styles={buildStyles({
                        textSize: "18px",
                        textColor: "#FFFFFF",
                        pathColor: "#FFFFFF",
                        trailColor: "#52B6FF",
                        backgroundColor: "#52B6FF"
                    })}
                    />
                </CircularContainer>
            </Link>

        </>
    )
}

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;

    background-color: #126BA5;
    width: 100%;
    height: 70px;

    position: fixed;
    top: 0;
    left: 0;

    padding: 10px;
    box-sizing: border-box;
    p{
        font-weight: 400;
        font-size: 39px;
        font-family: "Playball", cursive;
        color: #FFFFFF;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 90px;
    }
    
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #FFFFFF;

    color: #52B6FF;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;

    p{
        margin-left: 20px;
        margin-right: 20px;
        text-decoration: none;
        color: #52B6FF;
    }
    a{
        text-decoration: none;
    }
`

/* const Container = styled.div`
    svg{
        background-color: #52B6FF;
        border-radius: 90px;
        position: fixed;
        width: 90px;
        height: 90px;

        bottom: 0;
        left: 50%;
        transform: translate(-50%, -20%);
        text, path{
            text-align: center;
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
        }
    }
` */

const CircularContainer = styled.div`
    width: 91px;
    height: 91px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -20%);
    border-radius: 90px;
    font-family: "Lexend Deca", sans-serif;

`