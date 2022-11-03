import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LazyLoadingImg from "../../components/LazyLoadingImg/LazyLoadingImg";
import userAction from "../../redux/action/userAction";
import { authSelector } from "../../redux/selector/selectors";
import {
  FormSubmit,
  InputChangedEvent,
  IUser,
  IUserProfile,
} from "../../utils/Typescript";

interface IProps {
  title: string;
  placeholder: string;
  description: string;
  type: string;
  nameInput: string;
  // user?: IUserProfile;
  // setUser?: (user: IUserProfile) => void;
}

const FormPersonalInfo: React.FC<IProps> = React.memo(
  ({ title, placeholder, description, type, nameInput }) => {
    const initialState = {
      name: "",
      account: "",
      avatar: "",
      bio: "",
      telephoneNumber: "",
      password: "",
      cf_password: "",
    };

    const [user, setUser] = useState<IUserProfile | any>(initialState);

    const [editInfo, setEditInfo] = useState(false);
    const [edit, setEdit] = useState(false);
    const { authUser }: IUser | any = useSelector(authSelector);
    const dispatch = useDispatch();

    const handleChangeInput = (e: InputChangedEvent) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
    };

    const handleChangeFile = (e: InputChangedEvent) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;

      if (files) {
        const file = files[0];
        setUser({ ...user, avatar: file });
      }
    };

    const handleEdit = () => {
      setEdit(true);
      setEditInfo(!editInfo);
    };

    const handleSubmit = (e: FormSubmit) => {
      e.preventDefault();

      if (nameInput === "password") {
        if (!authUser.access_token) return;
        userAction.resetPassword_noCf(user, authUser.access_token, dispatch);
      } else {
        if (nameInput) {
          if (!authUser.access_token) return;
          userAction.updateSignCmpUser(
            nameInput,
            user,
            authUser.access_token,
            dispatch,
            authUser
          );
        }
      }

      setUser({ ...user, [`${nameInput}`]: "" });
      setEditInfo(!editInfo);
      setEdit(false);
    };

    return (
      <>
        {title === "Avatar" && type === "file" ? (
          <form action="" onSubmit={handleSubmit}>
            <div className="border-t-2 mt-10 flex justify-between  ">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h1 className="text-[20px] font-bold">{title}</h1>
                  <div className="">
                    <LazyLoadingImg
                      url={
                        user.avatar
                          ? URL.createObjectURL(user.avatar)
                          : authUser.user.avatar
                      }
                      alt="Image User"
                      className="w-[100px] h-[100px] rounded-full object-cover border-2"
                    />
                  </div>
                  <input
                    type={type}
                    placeholder={placeholder}
                    name={nameInput}
                    onChange={handleChangeFile}
                  />
                </div>

                <div>
                  <p>{description}</p>
                </div>
              </div>

              {/* Button Save & Cancel */}
              <div className="flex gap-5">
                {editInfo ? (
                  <div className="text-center text-[20px] flex gap-3 items-center">
                    <div>
                      <button
                        type="submit"
                        className="border-2 p-1 rounded-xl hover:bg-sky-600 hover:text-color-white"
                      >
                        Save
                      </button>
                    </div>

                    <div>
                      <button
                        className="border-2 p-1 rounded-xl hover:bg-sky-600 hover:text-color-white"
                        onClick={() => setEditInfo(!editInfo)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-[20px] flex items-center ">
                    <button
                      className="border-2 rounded-xl p-1 hover:bg-sky-600 hover:text-color-white"
                      onClick={() => setEditInfo(!editInfo)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        ) : (
          <form action="" onSubmit={handleSubmit}>
            <div className="border-t-2 mt-10 flex justify-between">
              <div className="flex flex-col w-[500px] gap-3">
                <div className="flex flex-col gap-2 ">
                  <h1 className="text-[20px] font-bold">{title}</h1>
                  {edit || nameInput === "cf_password" ? (
                    <input
                      className={`outline-0 p-2`}
                      type={type}
                      placeholder={authUser.user[`${nameInput}`]}
                      name={nameInput}
                      onChange={handleChangeInput}
                    />
                  ) : (
                    <input
                      disabled
                      className={`outline-0 p-2`}
                      type={type}
                      placeholder={authUser.user[`${nameInput}`]}
                      name={nameInput}
                      onChange={handleChangeInput}
                    />
                  )}
                </div>

                <div>
                  <p>{description}</p>
                </div>
              </div>

              {/* Button Save & Cancel */}
              {nameInput === "cf_password" ? (
                ""
              ) : (
                <div className="flex gap-5">
                  {editInfo ? (
                    <div className="text-center text-[20px] flex gap-3 items-center">
                      <div>
                        <button
                          type="submit"
                          className="border-2 p-1 rounded-xl hover:bg-sky-600 hover:text-color-white"
                          // onClick={() => setEditInfo(!editInfo)}
                        >
                          Save
                        </button>
                      </div>

                      <div>
                        <button
                          className="border-2 p-1 rounded-xl hover:bg-sky-600 hover:text-color-white"
                          onClick={() => {
                            setEditInfo(!editInfo);
                            setEdit(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-[20px] flex items-center ">
                      <button
                        className="border-2 rounded-xl p-1 hover:bg-sky-600 hover:text-color-white"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        )}
      </>
    );
  }
);

export default FormPersonalInfo;
