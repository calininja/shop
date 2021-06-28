import * as React from 'react';

interface IStarprops {
    rate: (star: number) => void | null;
    star: number | string;
}

const Rating: React.FunctionComponent<IStarprops> = ({
    rate,
    star
}) => {

    return (
        <div className="star__container">
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

export default Rating;