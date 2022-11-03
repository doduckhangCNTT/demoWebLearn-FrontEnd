import React, { useCallback, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { alertSlice } from "../../redux/reducers/alertSlice";
import { authSelector } from "../../redux/selector/selectors";
import { checkImg } from "../../utils/Valid";
import { postApi } from "../../utils/FetchData";
import { checkTokenExp } from "../../utils/CheckTokenExp";

interface IProps {
  body: string;
  setBody: (body: string) => void;
}

const Quill: React.FC<IProps> = ({ body, setBody }) => {
  const { authUser } = useSelector(authSelector);
  const dispatch = useDispatch();
  const quillRef = useRef<ReactQuill>(null);
  const modules = { toolbar: { container } };

  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const files = input.files;
      if (!files)
        return dispatch(
          alertSlice.actions.alertAdd({ error: "File not found" })
        );

      const file = files[0];
      const check = checkImg(file);
      if (check) {
        return dispatch(alertSlice.actions.alertAdd({ error: check }));
      }
      if (!authUser.access_token)
        return dispatch(
          alertSlice.actions.alertAdd({ error: "Invalid Authentication" })
        );

      dispatch(alertSlice.actions.alertAdd({ loading: true }));
      const result = await checkTokenExp(authUser.access_token, dispatch);
      const access_token = result ? result : authUser.access_token;
      let formData = new FormData();
      formData.append("file", file);
      const photo = await postApi("upload", formData, access_token);
      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined) {
        quill?.getEditor().insertEmbed(range, "image", `${photo.data.url}`);
      }

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    };
  }, [authUser.access_token, dispatch]);

  useEffect(() => {
    const quill = quillRef.current as ReactQuill;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule("toolbar");
    // toolbar.deleteHandle("image", handleDeleteImage);
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);

  return (
    <div className="mt-2 flex flex-col gap-10">
      <ReactQuill
        theme="snow"
        modules={modules}
        placeholder="Write somethings..."
        onChange={(e) => setBody(e)}
        value={body}
        ref={quillRef}
      />
    </div>
  );
};

let container = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean", "link", "image", "video"], // remove formatting button
];

export default Quill;
