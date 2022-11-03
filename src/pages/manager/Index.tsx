import React from "react";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";

const index = () => {
  return (
    <div className="flex justify-center items-center gap-3 h-full ">
      <LazyLoadingImg
        url="https://img.freepik.com/vector-gratis/concepto-ilustracion-analiticas_114360-85.jpg?w=826&t=st=1665040127~exp=1665040727~hmac=868851409da319bdded2b100827e7f7fe00aaaae13385f359d89de807776b9eb"
        className="w-[200px]"
      />
      <h1 className="font-bold text-[30px] mt-[10px]">Page Manager of Admin</h1>
    </div>
  );
};

export default index;
