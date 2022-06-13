import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPen } from "@fortawesome/free-solid-svg-icons";

const Post = ({ postObj }) => {
  return (
    <div className="post-card">
      <h3>{postObj.title}</h3>
      <p>{postObj.contents}</p>
      <div className="icons">
        <FontAwesomeIcon icon={faEraser} />
        <FontAwesomeIcon icon={faPen} />
      </div>
    </div>
  );
};

export default Post;
