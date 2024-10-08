// import React from 'react'
// // import {Container} from '../index.js'
// import Container from '../container/Container.jsx'
// import LogoutBtn from './LogoutBtn.jsx'
// import { Link } from 'react-router-dom'
// import {useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom'


// function Header() {
//   const authStatus = useSelector((state) => state.auth.status)
//   const navigate = useNavigate()

//   const navItems = [
//     {
//       name: 'Home',
//       slug: "/",
//       active: true
//     }, 
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//   },
//   {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//   },
//   {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: authStatus,
//   },
//   {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//   },
//   ]


//   return (
//     <header className='py-3 shadow bg-gray-500'>
//       <Container>
//         <nav className='flex'>
//           <div className='mr-4'>
//             <Link to='/'>
//               {/* <Logo width='70px'   /> */}
//                 Logo
//               </Link>
//           </div>
//           <ul className='flex ml-auto'>
//             {navItems.map((item) => 
//             item.active ? (           // checking if item is active or not if not then do not proceed
//               <li key={item.name}>
//                 <button
//                 onClick={() => navigate(item.slug)}
//                 className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//                 >{item.name}</button>
//               </li>
//             ) : null
//             )}
//             {authStatus && (
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//         </Container>
//     </header>
//   )
// }

// export default Header;

import React from 'react'
import {Logo} from '../index.js'
import Container from '../container/Container.jsx'
import LogoutBtn from './LogoutBtn.jsx'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]

  return (
    <header className='py-4 shadow-md bg-gradient-to-r from-blue-500 to-purple-500 text-white'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='text-2xl font-bold'>
            <Link to='/'>
              <Logo width='80px'/>
            </Link>
          </div>
          <ul className='flex space-x-6'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-block px-4 py-2 rounded-full text-lg font-medium hover:bg-white hover:text-gray-900 transition duration-300 ease-in-out transform hover:scale-105'
                >
                  {item.name}
                </button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header;
