import './SwiperAera.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import { useSelector } from 'react-redux';
import { Pagination, Mousewheel } from "swiper";
import FunctionAera from '../FunctionAera/FunctionAera';
import Apps from '../Apps/Apps';

export default function SwiperAera(){
    const clear = useSelector(state=>state.clear)
    let display = clear? 'none':'block'

    return(
    <div className='swiperaera' style={{display:display}}>  
     {/* 加swiper-no-swipping可以让swiper不能拖动滑动 */}
     <Swiper className='swiper-no-swiping' 
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        // FIXME:目前这里天气模块设置了loop后向后滑动时会显示空白
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        //scrollbar={{ draggable: false }}
        mousewheel={true}
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