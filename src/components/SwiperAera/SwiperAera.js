import "./SwiperAera.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { Pagination, Mousewheel } from "swiper";
import FunctionAera from "../FunctionAera/FunctionAera";
import Apps from "../Apps/Apps";
import { memo } from "react";

const SwiperAera = () => {
  const clear = useSelector(state => state.clear);
  const timePos = useSelector(state => state.timePos);
  let display = clear ? "none" : "block";
  let top = timePos ? "25vh" : "43vh";

  return (
    <div
      className={"swiperaera fade_in"}
      style={{ display: display, top: top }}
    >
      {/* 加swiper-no-swipping可以让swiper不能拖动滑动 */}
      <Swiper
        className='swiper-no-swiping'
        spaceBetween={0}
        slidesPerView={1}
        //   loop={true}
        // FIXME:目前这里天气模块设置了loop后向后滑动时会显示空白
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={swiper => console.log(swiper)}
        pagination={{ clickable: true }}
        //scrollbar={{ draggable: false }}
        mousewheel={true}
        modules={[Pagination, Mousewheel]}
      >
        <SwiperSlide>
          <Apps />
        </SwiperSlide>
        <SwiperSlide>
          <FunctionAera />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default memo(SwiperAera); //memo防止由父组件引发的不必要重复渲染
