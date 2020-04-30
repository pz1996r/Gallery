import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import LoadingImg from './LoadingImg';
import Stepper from './Stepper';
import Label from './Label';

const FetchStatus = {
    LOADED: "LOADED",
    LOADING: "LOADING"
}

const ClashRoyalCards = (props) => {
    const [imageId, setImageId] = useState(0);
    const [image, setImage] = useState(null);
    const [cardName, setCardName] = useState(null);
    const [cardsAmount, setCardsAmount] = useState(1);
    const [status, setStatus] = useState(FetchStatus['LOADING']);
    const [error, setError] = useState(false);
    // const [mode, setMode] = useState('SLOW');

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
            .catch(() => { setError(true) });
    }, [imageId, fillCard])

    const mapPropsToCardsStepper = (child) => {
        console.log(child.type.name);
        switch (child.type.name) {
            case 'Label': return React.cloneElement(child, {
                value: cardName,
                visible: status === FetchStatus['LOADED']
            })
            case 'LoadingImg': return React.cloneElement(child, {
                src: image,
                loading: status !== FetchStatus['LOADED'],
                callBack: () => { setStatus(FetchStatus['LOADED']) },
                error,
            })
            case 'Stepper': return React.cloneElement(child, {
                max: cardsAmount,
                current: imageId,
                handleStep: changeCard
            })
            default: return React.cloneElement(child, {})
        }
    }

    const children = React.Children.map(props.children, mapPropsToCardsStepper);

    return (
        <div>{children}</div>
    )
}
ClashRoyalCards.Label = Label;
ClashRoyalCards.LoadingImg = LoadingImg;
ClashRoyalCards.Stepper = Stepper;
export default ClashRoyalCards;