import { CrossIcon } from "@/components/icons";
import React from "react";

const Drawer = ({
  onClick,
  children,
  title,
  icon,
}: {
  onClick: () => void;
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}) => {
  return (
    <>
      <div
        onClick={onClick}
        className="fixed left-0 top-0 overflow-hidden w-screen h-screen z-[9998] bg-[#0003] backdrop-blur-sm"
      />
      <div className="fixed top-0 right-0 p-6 box-shadow z-[9999] rounded-l-lg w-full max-w-[400px] bg-[#fbf9f9] h-screen overflow-hidden cart-drawer">
        <div id="heading" className="flex items-center gap-4 pb-2 border-b border-[#ccccd7]">
          {icon}
          <h3 className="text-[24px] text-[#3c3c3c] font-semibold">{title}</h3>
          <button onClick={onClick} className="ms-auto">
            <CrossIcon />
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default Drawer;
