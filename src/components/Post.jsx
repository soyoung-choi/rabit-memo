import { dbService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faPen } from "@fortawesome/free-solid-svg-icons";

const Post = ({ postObj }) => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [newTitle, setNewTitle] = useState(postObj.title);
  const [newContents, setNewContents] = useState(postObj.contents);
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onDeletePost = async () => {
    await dbService.doc(`posts/${postObj.id}`).delete();
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setNewTitle(value);
    } else if (name === "contents") {
      setNewContents(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`posts/${postObj.id}`).update({
      title: newTitle,
      contents: newContents,
    });

    setEditing(false);
  };

  return (
    <>
      <div className="post-card">
        <h3>{postObj.title}</h3>
        <p>{postObj.contents}</p>

        {editing ? (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                name="title"
                value={newTitle}
                placeholder="제목"
                onChange={onChange}
                autoFocus
              />
              <textarea
                id="contents"
                name="contents"
                value={newContents}
                placeholder="내용"
                onChange={onChange}
              />
              <button type="submit">저장</button>
            </form>
            <p onClick={toggleEditing}>닫기</p>
          </>
        ) : (
          <>
            <div className="icons">
              <FontAwesomeIcon icon={faEraser} onClick={onDeletePost} />
              <FontAwesomeIcon icon={faPen} onClick={toggleEditing} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Post;
