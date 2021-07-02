import * as React from 'react';
import { css } from '@emotion/react';

interface IStarprops {
    rate: (star: number) => void | null;
    star: number | string;
}

const Rating: React.FunctionComponent<IStarprops> = ({
    rate,
    star
}) => {

    return (
        <div css={ratingWrapper}>
            {
                [1, 2, 3, 4, 5].map((v) => {
                    return (
                        <div key={v} className="star" onClick={() => { rate(v) }} >
                            {
                                star < v ?
                                    <img src="/images/star_bg.png" alt="" />
                                    :
                                    <img src="/images/star.png" alt="" />
                            }
                        </div>
                    )
                })
            }
        </div>
    );
};

const ratingWrapper = css`
    >div{
        display: inline-block;
        width: 20px;
        height: 20px;
        img{
            width: 100%;
        }
    }
`

export default Rating;