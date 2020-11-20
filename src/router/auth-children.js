const authChildren = [
    {
        path: '/auth/login',
        name: 'AuthLogin',
        component: () => import('@/views/auth/login')
    }
]

export default authChildren