import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoginPass from "../../components/auth/LoginPass";
import { postApi } from "../../utils/FetchData";

const ActiveUser = () => {
  const { active_token } = useParams();
  const [checkMessageSuccess, setCheckMessageSuccess] = useState("");
  const [checkMessageError, setCheckMessageError] = useState("");

  useEffect(() => {
    if (active_token) {
      postApi("active", { active_token: active_token })
        .then((res) => setCheckMessageSuccess(res.data.msg))
        .catch((err) => setCheckMessageError(err.message));
    }
  }, [active_token]);
  return (
    <div>
      {checkMessageSuccess && (
        <div className="w-full text-center bg-green-600 text-color-white">
          <h1 className="p-2">{checkMessageSuccess}</h1>
        </div>
      )}

      {checkMessageError && (
        <div className="w-full text-center bg-red-600 text-color-white">
          <h1 className="p-2">{checkMessageError}</h1>
        </div>
      )}
      <div>{checkMessageSuccess && <LoginPass />}</div>
    </div>
  );
};

export default ActiveUser;
