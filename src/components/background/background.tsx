/**
 * 背景组件，包括模糊，遮罩，图片
 */

interface BackgroundProps {
  src: string;
  cover: number;
  blur: number;
}

const Background: React.FC<BackgroundProps> = ({ src, cover, blur }) => {
  // 设置模糊程度，映射 1 - 100
  const filter = "blur(" + blur / 4 + "px)";
  // 隐藏模糊产生的白边，按模糊程度放大
  const transform = "scale(" + (1 + blur * 0.0008) + ")";
  // 设置遮罩浓度
  const opacity = cover * 0.01;

  return (
    <div className="h-screen w-screen absolute z-0">
      {/* 遮罩 opacity */}
      <div
        className="h-full w-full absolute z-10 bg-black"
        style={{ opacity: opacity }}
      ></div>
      {/* 模糊 filter + transform */}
      <div className="h-full w-full absolute z-0 overflow-hidden">
        <img
          src={src}
          className="h-full w-full object-cover"
          style={{ filter: filter, transform: transform }}
        />
      </div>
    </div>
  );
};

export default Background;
