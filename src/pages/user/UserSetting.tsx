import React from "react";
import FormPersonalInfo from "./FormPersonalInfo";

const UserSetting = () => {
  const listInfoPersonal = [
    {
      title: "User name",
      placeholder: "Nguyen van A",
      name: "name",
      description:
        "Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn.",
      type: "text",
    },
    {
      title: "Bio",
      placeholder: "Introduce yourself",
      name: "bio",
      description:
        "Bio hiển thị trên trang cá nhân và trong các bài viết (blog) của bạn.",

      type: "text",
    },
    {
      title: "Avatar",
      placeholder: "",
      name: "avatar",
      description: "Nên là ảnh vuông, chấp nhận các tệp: JPG, PNG hoặc GIF.",
      type: "file",
    },
    {
      title: "Email",
      placeholder: "abc@gmail.com",
      description: "",
      name: "account",
      type: "text",
    },
    {
      title: "Telephone number",
      placeholder: "+84384899367",
      description: "Contact information",
      name: "telephoneNumber",
      type: "text",
    },
    {
      title: "Password",
      placeholder: "Password",
      description: "Nhập password",
      name: "password",
      type: "password",
    },
  ];

  return (
    <div className="w-3/5 mx-auto my-10">
      <div>
        <h1 className="font-bold text-[30px]">Setting Info user</h1>
        <p className="font-bold mt-5">Thông tin cá nhân</p>
      </div>

      <div className="mb-10">
        {/* List Personal information */}
        {listInfoPersonal.map((item, index) => {
          return (
            <div key={index} className="">
              <FormPersonalInfo
                title={item.title}
                placeholder={item.placeholder}
                description={item.description}
                type={item.type}
                nameInput={item.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSetting;
