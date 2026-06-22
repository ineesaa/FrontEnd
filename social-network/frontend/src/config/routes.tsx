import { createBrowserRouter } from 'react-router-dom'
import { Signin } from '../pages/main/signin'
import { Signup } from '../pages/main/signup'
import { AuthLayout } from '../pages/auth/auth-layout'
import { Profile } from '../pages/auth/profile'
import { PublicProfile } from '../pages/auth/profile/PublicProfile'
import { Followers } from '../pages/auth/followers'
import { Followings } from '../pages/auth/followings'
import { Settings } from '../pages/auth/settings'
import { Messages } from '../pages/auth/messages'
import { Posts } from '../pages/auth/posts'
import { PostDetail } from '../pages/auth/post-detail'

export const routes = createBrowserRouter([
  { path: '/', element: <Signin /> },
  { path: '/signup', element: <Signup /> },
  {
    path: '/profile',
    element: <AuthLayout />,
    children: [
      { path: '', element: <Profile /> },
      { path: 'posts', element: <Posts /> },
      { path: 'posts/:postId', element: <PostDetail /> },
      { path: 'followers', element: <Followers /> },
      { path: 'followings', element: <Followings /> },
      { path: 'messages', element: <Messages /> },
      { path: 'settings', element: <Settings /> },
      { path: 'user/:username', element: <PublicProfile /> },
    ],
  },
])