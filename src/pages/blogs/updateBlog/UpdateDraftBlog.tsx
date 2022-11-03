import React from "react";
import { useParams } from "react-router-dom";
import CreateBlog from "../CreateBlog";

const UpdateDraftBlog = () => {
  const { valueId } = useParams();

  return <CreateBlog valueId={valueId} />;
};

export default UpdateDraftBlog;
