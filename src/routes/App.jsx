import { dbService } from 'fbase'
import { useEffect, useState } from 'react'

import Post from 'components/Post'
import PostFactory from 'components/PostFactory'

function App() {
  const [posts, setPosts] = useState('')

  useEffect(() => {
    // 실시간 데이터베이스 도입
    dbService
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }))
        setPosts(newArray)
      })
  }, [])

  return (
    <>
      <PostFactory />
      <div className="grid-container">
        {posts && posts.map((post) => <Post key={post.id} postObj={post} />)}
      </div>
    </>
  )
}

export default App
