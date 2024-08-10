// import React from 'react'
// import { Link } from 'react-router-dom'
// import appwriteService from '../appwrite/config'
// const PostCard = ({$id,title,featured_image}) => {


//   return (
//     <Link to={`/post/${$id}`}>
//         <div className='w-full bg-gray-100 rounded-xl p-4'>
//             <div className='w-full justify-center mb-4'>
//                 <img src={appwriteService.getFilePreview(featured_image)} alt={title}
//                 className='rounded-xl' />
//             </div>
//             <h2
//             className='text-xl font-bold'
//             >{title}</h2>
//         </div>
//     </Link>
//   )
// }

// export default PostCard

import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../appwrite/config'

const PostCard = ({ $id, title, featured_image }) => {
  return (
    <Link to={`/post/${$id}`} className='group'>
      <div className='w-full bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl'>
        <div className='w-full mb-4'>
          <img 
            src={appwriteService.getFilePreview(featured_image)} 
            alt={title}
            className='rounded-t-2xl w-full h-48 object-cover transition duration-300 ease-in-out transform group-hover:scale-110'
          />
        </div>
        <div className='p-4'>
          <h2 className='text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition duration-300'>
            {title}
          </h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard

