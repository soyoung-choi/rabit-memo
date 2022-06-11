import { dbService } from 'fbase'
import { useState } from 'react'

const PostFactory = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    await dbService.collection('posts').add({
      title: title,
      contents: contents,
      createdAt: Date.now(),
    })

    setTitle('')
    setContents('')
  }

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e

    if (name === 'title') {
      setTitle(value)
    } else if (name === 'contents') {
      setContents(value)
    }
  }
  return (
    <div>
      <h1>rabit memo</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="제목"
          onChange={onChange}
        />
        <input
          type="text"
          name="contents"
          value={contents}
          placeholder="내용"
          onChange={onChange}
        />
        <button>저장</button>
      </form>
    </div>
  )
}

export default PostFactory
