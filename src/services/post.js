import axios from 'axios'
import { nanoid } from 'nanoid'


const apiKey = "$2b$10$Rot7cnaWIyKNK3176hanqu.FWY7eDp.lK2UcbyoUeqT1GiU9ScGBK"

export const getPosts = async () => {
    return await axios.get(process.env.REACT_APP_POST_URL,
        {
            headers: {
                "X-MASTER-KEY": apiKey,
            }
        }
    )
}

const updatePost = async (updatedData) => {
   return await axios.put(process.env.REACT_APP_POST_URL, updatedData,
        {
            headers: {
                "X-MASTER-KEY": apiKey,
                "Content-Type": "application/json"
            }
        })
}

export const getPostByTopic = async (topic) => {
    let { data } = await getPosts()
    // console.log( data.record.filter(v => v.topic === topic))
    return data.record.filter(v => v.topic === topic)
}

export const createPost = async (listPost, post, topicId, profile) => {
    let newPost = {
        "id": nanoid(),
        "post": post,
        "user": profile,
        "topic": topicId
    }

    listPost.unshift(newPost)
    return updatePost(listPost)
}


export const editPost = async (listPost, post) => {
    let updatedData = listPost.map(v => v.id === post.id ? post : v)
    return  updatePost(updatedData)
}

export const deletePost = async (listPost,topicId) => {
    let updatedData = listPost.filter(v => v.id !== topicId)
    return  updatePost(updatedData)
}