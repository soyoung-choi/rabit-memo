const Post = ({ postObj }) => {
  return (
    <>
      <h3>{postObj.title}</h3>
      <p>{postObj.contents}</p>
    </>
  )
}

export default Post
