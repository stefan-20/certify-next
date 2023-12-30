import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login'
    },
    callbacks: {
        authorized({auth, request:{nextUrl}}){
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')

            if(isOnDashboard){
                if (isLoggedIn) return true;
                return false
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }
            return true
        },
        async jwt({token, user, account, profile, isNewUser}) {
           
            return token
        },
        
        async session({session, token}) {
        session.user.id = token.sub
        
        return session
        }
    
          
    },
    providers:[]
} satisfies NextAuthConfig