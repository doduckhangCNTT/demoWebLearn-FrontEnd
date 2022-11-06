import CompactParam from "../../../components/CompactParam";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import LazyLoadingImg from "../../../components/LazyLoadingImg/LazyLoadingImg";

const SlideShow = () => {
  const contentSlideShow = [
    {
      index: 1,
      title: "Khóa học miễn phí",
      imageBackground:
        "https://plus.unsplash.com/premium_photo-1661692759400-15aa4e2de6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      imgCartoon:
        "https://img.freepik.com/vector-gratis/concepto-ilustracion-analiticas_114360-85.jpg?w=826&t=st=1663661695~exp=1663662295~hmac=3efd85beb77c7014f23f5e365aa583b00fc5b1ff56acdd282a2c73e9b6182be7",
      description:
        "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of theprinting and typesetting industry. Lorem Ipsum has been theindustry's standard dummy text ever since the 1500s, when anunknown printer took a galley of type and scrambled it to make atype specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release ofLetraset sheets containing Lorem Ipsum passages, and more recentlywith desktop publishingare like Aldus PageMaker includingversions of Lorem Ipsum.",
      contentButton: "Access to show details",
    },
    {
      index: 2,
      title: "Các bài kiểm tra miễn phí",
      imageBackground:
        "https://images.unsplash.com/photo-1665512983234-5053c892365b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1709&q=80",
      imgCartoon:
        "https://img.freepik.com/vector-gratis/lista-verificacion-o-concepto-encuesta_74855-6987.jpg?w=1060&t=st=1667701168~exp=1667701768~hmac=72b25e945ab5804a0b20a0da1fc5f54eb270f92ad6d5ea6a01a35a9f256d75e7",
      description:
        "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of theprinting and typesetting industry. Lorem Ipsum has been theindustry's standard dummy text ever since the 1500s, when anunknown printer took a galley of type and scrambled it to make atype specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release ofLetraset sheets containing Lorem Ipsum passages, and more recentlywith desktop publishingare like Aldus PageMaker includingversions of Lorem Ipsum.",
      contentButton: "Access to show details",
    },
    {
      index: 3,
      title: "Blog chi tiết, đầy đủ kiến thức",
      imageBackground:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      imgCartoon:
        "https://img.freepik.com/vector-gratis/blogueando-divertido-creacion-contenido-streaming-online-videoblog-chica-joven-haciendo-selfie-red-social-compartir-comentarios-estrategia-autopromocion_335657-2386.jpg?w=826&t=st=1667701281~exp=1667701881~hmac=6a44b561ae1987791e7cd52ab9dfe85547e69826c0c63f481fc7acc8488fdb7b",
      description:
        "What is Lorem Ipsum? Lorem Ipsum is simply dummy text of theprinting and typesetting industry. Lorem Ipsum has been theindustry's standard dummy text ever since the 1500s, when anunknown printer took a galley of type and scrambled it to make atype specimen book. It has survived not only five centuries, butalso the leap into electronic typesetting, remaining essentiallyunchanged. It was popularised in the 1960s with the release ofLetraset sheets containing Lorem Ipsum passages, and more recentlywith desktop publishingare like Aldus PageMaker includingversions of Lorem Ipsum.",
      contentButton: "Access to show details",
    },
  ];

  const buttonStyle = {
    width: "30px",
    background: "none",
    border: "0px",
    display: "none",
  };

  const properties = {
    prevArrow: <button style={{ ...buttonStyle }}></button>,
    nextArrow: <button style={{ ...buttonStyle }}>{/*  */}</button>,
  };

  return (
    <div className="-z-20">
      <Slide autoplay={true} {...properties}>
        {contentSlideShow.map((content) => {
          return (
            <div
              key={content.index}
              className="border-2 rounded-lg relative w-full"
            >
              <LazyLoadingImg
                url={content.imageBackground}
                className="rounded-lg h-[300px] w-full object-cover"
              />

              <div
                className="
                  absolute flex justify-between 
                  top-2 bottom-2 left-2 right-2 w-full
                "
              >
                <div className="top-3 bottom-3 left-5 bg-slate-50 rounded-lg p-3 opacity-75 max-w-3xl">
                  <h1 className="font-bold text-[30px]">{content.title}</h1>
                  <div className="indent-8">
                    <CompactParam
                      param={content.description}
                      quantitySlice={200}
                    />
                  </div>
                  <button className="border-2 rounded-full hover:opacity-80 p-3 mt-5 text-white bg-cyan-500">
                    {content.contentButton}
                  </button>
                </div>

                <div className="h-full  items-center pr-[80px]">
                  <LazyLoadingImg
                    url={content.imgCartoon}
                    className="w-full h-full md:block hidden"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default SlideShow;
