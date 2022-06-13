const Post = ({ postObj }) => {
  return (
    <div className="post-card">
      <h3>{postObj.title}</h3>
      <p>{postObj.contents}</p>
    </div>
  );
};

export default Post;
