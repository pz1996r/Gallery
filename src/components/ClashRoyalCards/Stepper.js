import React, { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { stripe } from '../Common';

const StepperMenager = styled.div`
    ${stripe}
`;

const Status = styled.div`
    flex-grow:2;
    display:flex;
    align-items:center;
    position: relative;

    ::before{
        content:'';
        display:block;
        border-radius:4px;
        background: #c4c4c4;
        width:100%;
        height:4px;
    }
    ::after{
        content:' ';
        position: absolute;
        justify-self: start;
        display:block;
        height:4px;
        width:${({ value }) => { return value + '%' }};
        border-radius: 4px;
        background:#4141d3;
    }

`;

const Button = styled.button`
    padding: 0 20px;
    border:none;
    height:100%;
    cursor: pointer;
    :focus{
        outline:none;
    }
`;

const Stepper = ({ max, current, handleStep }) => {
    return (
        <StepperMenager>
            <Button onClick={() => { handleStep(current - 1) }}>BACK</Button>
            <Status value={(Math.round(current / max * 100))} />
            <Button onClick={() => { handleStep(current + 1) }}>NEXT</Button>
        </StepperMenager>
    )
}

export default Stepper;