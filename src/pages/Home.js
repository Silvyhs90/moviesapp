import React from 'react'
import styled from "styled-components"

export const Home = () => {


    return (
        <HomePage>
            <h3>Estoy en la Home Page</h3>

        </HomePage>
    );
}

const HomePage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("././backgorund.jpg");
  background-size: cover;
`;