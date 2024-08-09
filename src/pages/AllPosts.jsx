import React, { useState } from 'react'
import appwriteService from "../appwrite/config.js"
import PostCard from '../components/index.js'
import Container from '../components/index.js'

function AllPosts() {

    const [posts, setposts] = useState({})
    appwriteService.getPost([]).then((posts) => {
        {
            if (posts) {
                setposts(posts.documents)
            }
        }
    })


    return (
        <div className='w-full p-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => {
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                })}
            </div>
        </Container>
        </div>
    )
}

export default AllPosts;
