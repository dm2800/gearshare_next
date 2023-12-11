import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      console.log('session logging', session );

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // Check if a user already exists
        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }

        // If not, create a new user

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


export default authOptions; 