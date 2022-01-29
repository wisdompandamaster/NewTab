import React from 'react';
import { Carousel } from 'antd';
import './style.css';
import imgs from './data';

const Chart: React.FC = () => {

    const settings = {
        dots: true,
        fade: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <>
            <Carousel {...settings} className='carousel'>
                {
                    imgs.map((item, index) => {
                        return (
                            <div className='panel' key={index}>
                                <img width='100%' alt={item.alt} src={item.src} />
                            </div>
                        )
                    })
                }
            </Carousel>
        </>
    )
}


export default Chart;