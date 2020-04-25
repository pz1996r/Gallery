import React from 'react';
import styled, { css } from 'styled-components';
import { stripe } from '../Common';

const StyledLabel = styled.div`
    ${stripe}
    color:black;
    justify-content:center;
    align-items:center;
`;

const Label = ({ value, visible }) => (
    <StyledLabel >
        {visible && <p>{value}</p>}
    </StyledLabel>
);


export default Label;