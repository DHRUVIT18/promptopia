import User from '@models/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({session}){
            const sessionUser=await User.findOne({email:session.user.email});
            
            session.user.id=sessionUser._id.toString();
            
            return session;
        },
        async signIn({profile}){
            
            try {
                //serverless -> lamba
                await connectToDB();
                console.log(profile);
                //check if user is already exists
                const userExists=await User.findOne({email:profile?.email});
                
                //if not , create new user
              let username=  profile?.name?.replace(" ","").toLowerCase()
                if(!userExists){
                    await User.create({
                        email:profile?.email,
                        username,
                        image:profile?.picture
                    });
                }
                return true;
            } catch (error) {
                console.log(error, 'routejs file in the signin function');
                return false;
            }
        }
    }
})

export {handler as GET,handler as POST}