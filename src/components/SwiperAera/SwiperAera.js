import './SwiperAera.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import { Pagination, Mousewheel } from "swiper";
import FunctionAera from '../FunctionAera/FunctionAera';
import Apps from '../Apps/Apps';

export default function SwiperAera(){
    return(
    <div className='swiperaera'>  
     {/* 加swiper-no-swipping可以让swiper不能拖动滑动 */}
     <Swiper className='swiper-no-swiping' 
        spaceBetween={0}
        slidesPerView={1}
        //loop={true}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        //scrollbar={{ draggable: false }}
        
        mousewheel={true}
        navigation={true}
        //loop={true}
        modules={[Pagination,Mousewheel]}
       >
        <SwiperSlide>
            <FunctionAera/>
        </SwiperSlide>
        <SwiperSlide>
            <Apps/>
        </SwiperSlide>
      </Swiper>
      </div>
    )
}