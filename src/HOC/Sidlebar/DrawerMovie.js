import { Drawer } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_DRAWER } from "../../redux/types/DrawerType";

export default function DrawerMovie() {
  const dispatch = useDispatch();
  const { visible, withDrawer, ComponentContent, placement } = useSelector((state) => state.DrawerReducer);

  const onClose = () => {
    dispatch({
      type: CLOSE_DRAWER,
    });
  };
  return (
    <Drawer
      title={
        <a href="/" className="text-theme mb-0 text-3xl font-bold hover:text-transparent">
          Movie start
        </a>
      }
      width={withDrawer}
      onClose={onClose}
      closable={false}
      visible={visible}
      placement={placement}
      bodyStyle={{
        paddingBottom: 80,
        padding: 0,
      }}
    >
      <aside className="w-full" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3  bg-gray-50 rounded dark:bg-gray-800">{ComponentContent}</div>
      </aside>
      {/* Nội dung thay đổi của drawer */}
    </Drawer>
  );
}
