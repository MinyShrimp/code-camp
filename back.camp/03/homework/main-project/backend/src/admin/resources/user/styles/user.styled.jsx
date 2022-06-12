import styled from 'styled-components';

export const LoginCompo = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 80%;

    background: white;
    padding: 1em;

    display: flex;
    flex-direction: column;

    font-size: 15px;
`;

export const InputGroup = styled.div`
    margin-bottom: 1em;
    width: 100%;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 0.5em;
`;

export const Input = styled.input`
    width: 100%;
    height: 30px;
    border: 1px solid black;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 1em;
`;

export const Submit = styled.button`
    width: 100px;
    height: 50px;

    border: 1px solid #4268f6;
    border-radius: 5px;
    background: #4268f6;
    color: white;
    cursor: pointer;
`;
