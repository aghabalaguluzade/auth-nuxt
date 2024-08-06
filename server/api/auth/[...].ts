import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import TwitchProvider from 'next-auth/providers/twitch'
import { NuxtAuthHandler } from '#auth'

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authSecret,
    providers: [
        // @ts-expect-error Use .default here for it to work during SSR.
        GithubProvider.default({
            clientId: runtimeConfig.GITHUB_CLIENT_ID,
            clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET
        }),
        // @ts-expect-error Use .default here for it to work during SSR.
        GoogleProvider.default({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET   
        }),
        // @ts-expect-error Use .default here for it to work during SSR.
        TwitchProvider.default({
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET
        }),
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: '(hint: jsmith@example.com)' },
                password: { label: 'Password', type: 'password', placeholder: '(hint: hunter2)' }
            },
            authorize (credentials: any) {
                const user = { id: '1', name: 'agabala', username: 'agabala', email : 'agabala@gmail.com', password: '2313' }
    
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    debug : process.env.NODE_ENV === 'development',
    pages: {
        signIn: '/',
        error : ''
    }
})