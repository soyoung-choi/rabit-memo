import { dbService } from "fbase";
import { useEffect, useState } from "react";

import Post from "components/Post";
import PostFactory from "components/PostFactory";
import rabbit from "assets/images/rabbit.png";

function App() {
  const [posts, setPosts] = useState("");

  useEffect(() => {
    // 실시간 데이터베이스 도입
    dbService
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setPosts(newArray);
      });
  }, []);

  return (
    <>
      <div className="logo">
        <img className="rabbit" src={rabbit} alt="토끼" />
        <h1>Rabit Memo</h1>
      </div>

      <PostFactory />
      <span className="post-length">
        총 <strong>{posts.length}</strong>개
      </span>
      <div className="grid-container">
        {posts && posts.map((post) => <Post key={post.id} postObj={post} />)}
      </div>
    </>
  );
}

export default App;
