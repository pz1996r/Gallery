import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';

import LoadingImg from './LoadingImg';
import Stepper from './Stepper';
import { stripe } from '../Common';

const FetchStatus = {
    LOADED: "LOADED",
    LOADING: "LOADING"
}

const Label = styled.div`
    ${stripe}
    color:black;
    justify-content:center;
    align-items:center;
`;

const ClashRoyalCards = ({ children }) => {
    const [imageId, setImageId] = useState(0);
    const [image, setImage] = useState(null);
    const [cardName, setCardName] = useState(null);
    const [cardsAmount, setCardsAmount] = useState(1);
    const [status, setStatus] = useState(FetchStatus['LOADING']);
    const [mode, setMode] = useState('SLOW');

    const FetchCards = async (id) => {
        const url = `/.netlify/functions/routes/clash?amount=1&page=${id}`;
        const response = await axios.get(url)
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
        if (id <= cardsAmount && id >= 0) {
            setStatus(FetchStatus['LOADING']);
            setImageId(id);
        }
    }

    useEffect(() => {
        FetchCards(imageId)
            .then(fillCard)
            .catch((error) => { console.log(error) });
    }, [imageId, fillCard])

    return (
        <div>
            <Label>{status === FetchStatus['LOADED'] && cardName}</Label>
            <LoadingImg src={image} loading={status !== FetchStatus['LOADED']} callBack={() => { setStatus(FetchStatus['LOADED']) }} />
            <Stepper max={cardsAmount} current={imageId} handleStep={changeCard} />
        </div>
    )
}

export default ClashRoyalCards;