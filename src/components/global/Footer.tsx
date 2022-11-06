import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const [namePath, setNamePath] = useState("");
  const location = useLocation();

  /**
   * Dùng để lấy chats trên url để khi vào chat ko có footer
   */
  useEffect(() => {
    const namePath = window.location.pathname;
    setNamePath(namePath);
  }, [location]);

  const listInfoInFooter = [
    {
      title: "Học Lập Trình Để Đi Làm",
      info: [
        {
          path: "",
          name: "Điện thoại: 0246.329.1102",
        },
        {
          path: "",
          name: "Email: contact@fullstack.edu.vn",
        },
        {
          path: "",
          name: "Địa chỉ: Nhà D9, lô A10, Nam Trung Yên, Trung Hòa, Cầu Giấy, Hà Nội",
        },
      ],
    },

    {
      title: "VỀ WebLearn",
      info: [
        {
          path: "",
          name: "Giới thiệu",
        },
        {
          path: "",
          name: "Cơ hội việc làm",
        },
        {
          path: "",
          name: "Đối tác",
        },
      ],
    },
    {
      title: "HỖ TRỢ",
      info: [
        {
          path: "",
          name: "Liên hệ",
        },
        {
          path: "",
          name: "Bảo mật",
        },
        {
          path: "",
          name: "Điều khoản",
        },
      ],
    },
    {
      title: "CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC",

      info: [
        {
          path: "",
          name: "Mã số thuế: 0109922901",
        },
        {
          path: "",
          name: "Ngày thành lập: 04/03/2022",
        },
        {
          path: "",
          name: "Lĩnh vực: Công nghệ, giáo dục, lập trình. WebLearn xây dựng và phát triển những sản phẩm mạng lại giá trị cho cộng đồng.",
        },
      ],
    },
  ];

  return (
    <>
      {/chats/.test(namePath) ? (
        ""
      ) : (
        <div className="container-style z-30 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-6 gap-y-3 content-end text-color-white">
          {listInfoInFooter.map((item, index) => {
            return (
              <div key={index} className="text-left">
                <ul>
                  <li>
                    <h1 className="uppercase text-[18px]">{item.title}</h1>
                  </li>
                  {item.info.map((value, index) => {
                    return (
                      <li key={index}>
                        <Link to={`${value.path}`}>{value.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Footer;
