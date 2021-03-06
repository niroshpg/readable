const api = process.env.REACT_APP_READABLE_API_URL || 'http://localhost:3001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())

export const removePost = (post) =>
  fetch(`${api}/posts/${post.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.posts)

export const addPost = (body) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())

  export const editPost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    }).then(res => res.json())

  export const getAllCommentsForPost = (post) =>
     fetch(`${api}/posts/${post.id}/comments`, { headers })
       .then(res => res.json())

 export const addCommnent = (body) =>
   fetch(`${api}/comments`, {
     method: 'POST',
     headers: {
       ...headers,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(body)
   }).then(res => res.json())

 export const updateComment = (comment) =>
   fetch(`${api}/comments/${comment.id}`, {
          method: 'PUT',
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(comment)
   }).then(res => res.json())
     .then(data => data.comment)

export const removeComment = (comment) =>
       fetch(`${api}/comments/${comment.id}`, { method: 'DELETE', headers })
         .then(res => res.json())
         .then(data => data.comments)

 export const incrementPostVote = (post) => {
   let upost = post
   upost.voteScore = ++upost.voteScore
       return  fetch(`${api}/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(upost)
         }).then(res => res.json())
           .then(data => data.post)
 }

 export const decrementPostVote = (post) => {
   let upost = post
   upost.voteScore = --upost.voteScore
       return  fetch(`${api}/posts/${post.id}`, {
                method: 'PUT',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(upost)
         }).then(res => res.json())
           .then(data => data.post)
 }

export const incrementCommentVote = (comment) => {
  let ucomment = comment
  ucomment.voteScore = ++ucomment.voteScore
      return  fetch(`${api}/comments/${comment.id}`, {
               method: 'PUT',
               headers: {
                 ...headers,
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify(ucomment)
        }).then(res => res.json())
          .then(data => data.comment)
}

export const decrementCommentVote = (comment) => {
  let ucomment = comment
  ucomment.voteScore = --ucomment.voteScore
    return    fetch(`${api}/comments/${comment.id}`, {
               method: 'PUT',
               headers: {
                 ...headers,
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify(ucomment)
        }).then(res => res.json())
          .then(data => data.comment)
}
