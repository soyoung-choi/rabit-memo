import { dbService } from "fbase";
import { useState, useRef, useEffect } from "react";

const PostFactory = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    await dbService.collection("posts").add({
      title: title,
      contents: contents,
      createdAt: Date.now(),
    });

    setTitle("");
    setContents("");

    inputRef.current.focus();
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
      <h1 className="logo">Rabit Memo</h1>
      <form onSubmit={onSubmit}>
        <label for="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          placeholder="제목"
          onChange={onChange}
          required
          ref={inputRef}
        />
        <label for="contents">내용</label>
        <textarea
          id="contents"
          name="contents"
          value={contents}
          placeholder="내용"
          onChange={onChange}
          required
        />
        <button>저장</button>
      </form>
    </div>
  );
};

export default PostFactory;
