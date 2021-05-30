import React from 'react'
import styled from "styled-components"
import aboutme from "../../images/woman.svg"


export const About = () => {


    return (
        <AboutMe>
            <img src={aboutme} className="imagen2" alt="about me" />
            <h1>API hecha con React para la materia Aplicaciones Moviles</h1>
            <h2> Realizada por Silvina Saucedo </h2>
            <h3>API usada: https://www.themoviedb.org/ </h3>
        </AboutMe>
    );
};


const AboutMe = styled.div`
    height: 100%;
    width: 100% ;
    text-align: center;

    h1,h2,h3{
        text-align: center;
        font-weight: bolder;
        margin-top: 15px;
        color: white;
        text-shadow: 1px 2px black;
    }
  background-color: #22254b;
`;
