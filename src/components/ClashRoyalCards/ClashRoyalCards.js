import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import FadeLoader from "react-spinners/FadeLoader";

const Stripe = css`
    display: flex;
    width: 100%;
    height:28px;
    background:white;
`;
const Loader = styled.div`
    transform: translate(-50%, -50%);
    position: absolute;
    display: block;
    margin: 0 auto;
    top:50%;
    left:50%;
    >div{
        transform: translate(26px, 20px);
        top:0px;
        left:0px;
    }
`;
const ImageLoaderWrapper = styled.div`
    background:#ffffff14;
    position: relative;
    width: 277px;
    height:330px;
`;

const IMG = styled.img`
    display: ${({ visible }) => { return (visible ? 'block' : 'none') }};
`;

const Label = styled.div`
    ${Stripe}
    color:black;
    justify-content:center;
    align-items:center;
`;

const StepperMenager = styled.div`
    ${Stripe}
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
        width:96%;
        height:4px;
    }
    ::after{
        content:' ';
        position: absolute;
        justify-self: start;
        display:block;
        height:4px;
        width:90%;
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

export default () => {
    const [imageId, setImageId] = useState(0);
    const [image, setImage] = useState(null);
    const [cardName, setCardName] = useState(null);
    const [cardsAmount, setCardsAmount] = useState(null);
    const [status, setStatus] = useState('LOADING');
    const [mode, setMode] = useState('SLOW');



    const FetchCards = async (id) => {
        const url = `/.netlify/functions/routes/clash?amount=1&page=${id}`;
        const response = await axios.get(url)
        console.log(response);
        return response;
    }

    const fillCard = useCallback(async (response) => {
        const card = response.data.response.cards[0];
        const amount = response.data.response.amount;
        setImage(card['iconUrls']['medium']);
        setCardName(card['name']);
        setCardsAmount(amount);
    }, [])

    const changeCard = id => {
        setStatus('LOADING');
        setImageId(id);
    }

    useEffect(() => {
        FetchCards(imageId)
            .then(fillCard)
            .catch((error) => { console.log(error) });
    }, [imageId, fillCard])


    return (
        <div>
            <Label>{cardName}</Label>
            <ImageLoaderWrapper>
                <IMG alt="card" src={image} visible={status === 'LOADED'} onLoad={() => { console.log(99); setStatus('LOADED') }}></IMG>
                <Loader>
                    <FadeLoader
                        size={150}
                        color={"#9999"}
                        loading={status === 'LOADING'}
                    />
                </Loader>
            </ImageLoaderWrapper>
            <StepperMenager>
                <Button onClick={() => { changeCard(imageId - 1) }}>BACK</Button>
                <Status />
                <Button onClick={() => { changeCard(imageId + 1) }}>NEXT</Button>
            </StepperMenager>
        </div>
    )
}

