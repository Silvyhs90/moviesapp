import React from 'react'
import styled from "styled-components"


export const PageNotFound = () => {


    return (
        <Error>
             <div>
             <h1>404 - Not Found!</h1>
            </div>

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