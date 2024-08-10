// import React, { useState,useEffect} from 'react'
// import appwriteService from "../appwrite/config.js"
// import {PostCard} from '../components/index.js'
// import {Container} from '../components/index.js'

// function AllPosts() {

//     const [posts, setposts] = useState({})
//     useEffect(() => {}, [])
//     const poste = appwriteService.getPosts([]);
//     poste.then((pos) => {
//         if (pos) setposts(pos.documents)
//     })


//     return (
//         <div className='w-full p-8'>
//         <Container>
//             <div className='flex flex-wrap'>
//                 {posts.map((post) => {
//                     <div key={post.$id} className='p-2 w-1/4'>
//                         <PostCard {...post} />
//                     </div>
//                 })}
//             </div>
//         </Container>
//         </div>
//     )
// }

// export default AllPosts;


import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts
