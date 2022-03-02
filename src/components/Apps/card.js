import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./itemTypes";
import "./Apps.css";
import "../../font/iconfont.css";
import { Badge, Button, Image } from "antd";
import { CloseOutlined } from "@ant-design/icons/lib/icons";
import Web from "../../AppIcons/Web.svg";
import { useSelector } from "react-redux";

const style = {
  cursor: "move",
  overflow: "hidden",
};

export const Card = ({ id, index, moveCard, info, deleteApp }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const deleteMode = useSelector((state) => state.deleteApp);

  return (
    <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      <div className="icon">
        <Badge
          count={
            <Button
              shape="circle"
              icon={deleteMode ? <CloseOutlined /> : ""}
              size="small"
              onClick={() => deleteApp(info.name)}
            />
          }
          offset={[-5, 8]}
        >
          <a href={info.href} rel="noreferrer" target={"_blank"}>
            <Image
              width={64}
              height={64}
              style={{ borderRadius: "1em" }}
              alt="icon"
              src={info.imgPath}
              fallback={Web}
              preview={false}
            />
          </a>
        </Badge>
        <p>{info.name}</p>
      </div>
    </div>
  );
};
