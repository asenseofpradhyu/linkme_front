import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

// Local File Imports
import { API_URL } from '../../../_helper/config';
import Utility from '../../../_helper/util';

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const user = await axios.post(API_URL+'login',
        {
            password: credentials.password,
            email: credentials.email
         
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        })

        if (user) {
          axios.defaults.headers.common['Authorization'] = "Bearer "+user.data.token;
          console.log(user.data.token);
          return {status: 'success', data: user.data.token}
        } 
      } catch (e) {
        console.log(e);
        const errorMessage = e.response.data.message
        // Redirecting to the login page with error messsage in the URL
        throw new Error(errorMessage)
      }

    }
  })
]

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.data
    }

    return token
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    return session
  }
}

const options = {
  providers,
  callbacks,
  pages: {
    error: 'user/login' // Changing the error redirect page to our custom login page
  }
}

export default (req, res) => NextAuth(req, res, options)