import * as React from 'react';
import Slider from "react-slick";
import { backUrl } from '../../config/config';

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
        <section className="slick__container">
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
        </section>
    );
};

export default Slick;