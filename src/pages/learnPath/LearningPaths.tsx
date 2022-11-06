import React from "react";
import { Outlet } from "react-router-dom";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";
import Common from "./Common";

const LearningPaths = () => {
  const images = [
    {
      alt: "",
      url: "https://img.freepik.com/vector-gratis/ilustracion-concepto-gestion-tiempo_114360-1013.jpg?w=1380&t=st=1663657521~exp=1663658121~hmac=7b34ff04b77024b8e1467823e91b5be585fc072ec2777d050cbdf3bc1730df07",
      className: "",
    },
    {
      alt: "",
      url: "https://img.freepik.com/vector-gratis/concepto-ilustracion-analiticas_114360-85.jpg?w=826&t=st=1663657672~exp=1663658272~hmac=8bd08b5b0bb671c68ab3ac99f3ec6760bef647ff588b487dac54df7e210179a4",
      className: "",
    },
    {
      alt: "",
      url: "https://img.freepik.com/vector-gratis/concepto-ilustracion-internet-sobre-marcha_114360-102.jpg?w=826&t=st=1663657700~exp=1663658300~hmac=0fe7deafb4ed73952b02b209727ff3fec4c8fdaf0e6c536664688a588530d072",
      className: "",
    },
  ];

  return (
    <div>
      <div className="my-2">
        <div className="">
          <h1 className="font-bold text-[30px]">Learn Path</h1>
          <p className="text-[20px] font-mono indent-8">
            Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình
            học. Ví dụ: Để đi làm với vị trí “Lập trình viên Front-end” bạn nên
            tập trung vào lộ trình “Front-end”.
          </p>
        </div>

        <div className="w-full grid gap-x-8 gap-y-4 lg:grid-cols-3 md:grid-cols-1 my-3 sm:grid-cols-1">
          {/* FrontEnd */}
          <div className="">
            <Common
              title="Lộ trình FrontEnd"
              description="Lập trình viên Front-end là người xây dựng ra giao diện
                  websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở
                  thành lập trình viên Front-end nhé."
              image="https://files.fullstack.edu.vn/f8-prod/learning-paths/2/61a0439062b82.png"
              path="fontEnd"
            />
          </div>

          {/* BackEnd */}
          <div className="">
            <Common
              title="Lộ trình BackEnd"
              description="Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé."
              image="https://files.fullstack.edu.vn/f8-prod/learning-paths/3/61a0439cc779b.png"
              path="backEnd"
            />
          </div>

          {/* Devops */}
          <div className="">
            <Common
              title="Devops"
              description="DevOps là một sự kết hợp của các nguyên lý, thực hành, quy trình và các tool giúp tự động hóa quá trình lập trình và chuyển giao phần mềm. Với DevOps, các công ty có thể “release” các tính năng nhỏ rất nhanh và kết hợp các phản hồi mà họ nhận được một cách nhanh chóng."
              image="https://i.pinimg.com/564x/f0/ad/2a/f0ad2af21cfe5a31cfccf06165e52b0e.jpg"
              path="devops"
            />
          </div>
        </div>

        <div className="lg:flex gap-2 mt-5 md:flex-row sm:flex-col flex-col">
          <div className="lg:w-2/3 md:w-2/3 sm:w-full w-full">
            <Outlet />
          </div>
          <div className="w-1/3 md:flex md:flex-col gap-3 mt-3 sm:grid sm:grid-col-2 ">
            {images.map((image, index) => {
              return (
                <div key={index} className="">
                  <LazyLoadingImg
                    url={image.url}
                    alt={image.alt}
                    className={image.className}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;
