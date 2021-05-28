import React from 'react'
import styled from "styled-components"


export const About = () => {


    return (
        <AboutMe>
            <h3>Sobre Mi</h3>

        </AboutMe>
    );
};


const AboutMe = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-color:red;
`;
