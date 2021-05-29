import React from 'react'
import styled from "styled-components"


export const PageNotFound = () => {


    return (
        <Error>
            <h3>ERROR 404</h3>

        </Error>
    );
};


const Error = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;