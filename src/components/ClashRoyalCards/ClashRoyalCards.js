import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FadeLoader from "react-spinners/FadeLoader";

const Loader = styled.div`
    position: absolute;
    display: block;
    margin: 0 auto;
    top:50%;
    left:50%;
    >div{
        top:0px;
        left:0px;
    }
`;
const ImageLoaderWrapper = styled.div`
    position: relative;
    width: 277px;
    height:330px;


`;

const IMG = styled.img`
    display: ${({ visible }) => { return (visible ? 'block' : 'none') }};
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
            <br />
            <button onClick={() => { changeCard(imageId - 1) }}>prev</button>
            <label>{cardName}</label>
            <label>{`${imageId}/${cardsAmount}`}</label>
            <button onClick={() => { changeCard(imageId + 1) }}>next</button>
        </div>
    )
}

