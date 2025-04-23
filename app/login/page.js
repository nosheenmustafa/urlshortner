'use client'
import React , {useEffect} from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import {useRouter} from 'next/navigation'

const Login = () => {
    const {data:session} = useSession();
    const router = useRouter();
    useEffect(() => {
     if(session){
     
      router.push('/Shorten')
    }
    }, [session])
    
    
  return (
    <div>
        <button onClick={()=>{signIn('github')}}>sign in using github</button>
    </div>
  )
}

export default Login