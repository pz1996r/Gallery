import React from 'react';
import FadeLoader from "react-spinners/FadeLoader";
import styled, { css } from 'styled-components';

const ImageLoaderWrapper = styled.div`
    background:#ffffff14;
    position: relative;
    width: 277px;
    height:330px;
`;

const IMG = styled.img`
    display: ${({ visible }) => { return (visible ? 'block' : 'none') }};
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

const LoadingImg = ({ src, loading, callBack, error = false }) => {
    return (
        <ImageLoaderWrapper>
            <IMG alt="card" src={src} visible={!loading && !error} onLoad={callBack} />
            <Loader>
                {error ? 'Error' : <FadeLoader
                    loading={loading}
                    size={150}
                    color={"#9999"}
                />}

            </Loader>
        </ImageLoaderWrapper>
    )
};

export default LoadingImg;