import Styled from "styled-components"

export const Container = Styled.div`
    width: 80% ;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border: 1px solid;
    border-radius: 20px;
    position:absolute ;
    top: 50%;
    transform: translateY(-50%);
    overflow: hidden;
`

export const Input = Styled.input`
    flex-grow: 1;
    border: 0;
    outline: 0;
    padding: 5px 10px;
    overflow: hidden;
    color: #444;
    :focus{
        border: 5px;
    }
    @media only screen and (min-width: 675px) {
        display: hidden ;
    }
`

export const Icon = Styled.div`
    padding: 0 10px;
`