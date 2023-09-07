import { NextAuthOptions } from "next-auth";
import { IAuthCredentialsPromise } from "@/interfaces/auth.interface";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";
import bcrypt from "bcrypt";

const authOptions : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{
                email:{ type:'email' },
                password:{ type:'password' }
            },
            async authorize(credentials) : Promise<IAuthCredentialsPromise | null> {
                const { email , password } = credentials as { email:string,password:string };
                //check if user exists in database
                const findUser = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });
                if(!findUser) {
                    throw new Error("User not found");
                }

                //check user credentials
                const comparePassword = await bcrypt.compare(password,findUser.password);
                if(!comparePassword) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id:findUser.id,
                    email:findUser.email,
                    name:findUser.name,
                };
            }
        }),
        GoogleProvider({
            clientId:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
            
        })
    ],
    callbacks:{
        jwt({ token,account,user }) {

            if(account) {
                return {
                    ...token,
                    provider: account?.provider
                };
            }
           
            return token;
        },
        session({ session,token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id:token.sub,
                    provider:token?.provider
                }
            }
        }
    },
    jwt: {
        maxAge:60 * 60 * 24 * 60  * 60
    },
    session:{
        strategy:"jwt"
    },
    pages:{
        error:"/login",
        signIn:"/login"
    },
    secret:process.env.NEXT_PUBLIC_AUTH_SECRET,
    debug:process.env.NODE_ENV === "development"
}

export default authOptions;