import { dbService } from "fbase";
import { useState } from "react";

const PostFactory = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await dbService.collection("posts").add({
      title: title,
      contents: contents,
      createdAt: Date.now(),
    });

    setTitle("");
    setContents("");
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "title") {
      setTitle(value);
    } else if (name === "contents") {
      setContents(value);
    }
  };
  return (
    <div>
      <h1>rabit memo</h1>
      <form onSubmit={onSubmit}>
        <label for="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          placeholder="제목"
          onChange={onChange}
        />
        <label for="contents">내용</label>
        <input
          type="text"
          id="contents"
          name="contents"
          value={contents}
          placeholder="내용"
          onChange={onChange}
        />
        <button>저장</button>
      </form>
    </div>
  );
};

export default PostFactory;
