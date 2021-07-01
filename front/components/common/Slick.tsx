import * as React from 'react';
import Slider from "react-slick";
import { backUrl } from '../../config/config';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

interface IImagesProps {
    image: any;
}

const Slick: React.FunctionComponent<IImagesProps> = ({ image }) => {

    const settings = {
        customPaging: function (i) {
            return (
                <a>
                    <img src={`${backUrl}/${image[i].src}`} />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div css={slick}>
            <Slider {...settings}>
                {
                    image && image.length > 1 ?
                        image.map((v, i) => {
                            return (
                                <img key={i} src={`${backUrl}/${image[i].src}`} alt="이미지" />
                            )
                        })
                        :
                        <img src={`${backUrl}/${image[0].src}`} alt="이미지" />
                }
            </Slider>
        </div>
    );
};
const slick = css`
    img{
        width: 100%;
    }
    .slick-dots li{
        border: 1px solid #cccccc;
        box-sizing: border-box;
    }
    .slick-list{
        .slick-track{
            .slick-slide{
            }
        }
    }
    .slick-dots{
        position: relative;
        bottom: 0;
        margin: 10px 0;
        li{
            width: 70px;
            height: 70px;
        }
    }
`
export default Slick;