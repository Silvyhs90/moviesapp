import React from 'react'
import styled from "styled-components"
import error from "../../images/notfound.png"


export const PageNotFound = () => {


    return (
        <Error>
             <div>
             <h1>Pagina No encontrada</h1>
             <img src={error} className="imagen-error" alt="error" />
            </div>

        </Error>
    );
};


const Error = styled.div`
    height: 100%;
    width: 100% ;
    text-align: center;

    h1{
        text-align: center;
        font-weight: bolder;
        margin-top: 15px;
        color: white;
        text-shadow: 1px 2px black;
    }
    

`;