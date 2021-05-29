import React from 'react'
import styled from "styled-components"


export const About = () => {


    return (
        <AboutMe>
            <h3>API hecha con React para la materia Aplicaciones Moviles</h3>
            <h4> Realizada por Silvina Saucedo </h4>
        </AboutMe>
    );
};


const AboutMe = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #22254b;
`;
