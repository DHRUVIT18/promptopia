'use client';
import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
    const router=useRouter()
    const {data:session}=useSession()
    const [posts, setPosts] = useState([])

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
      const hasConfirmed=confirm("Are you sure you want to delete this prompt?")

      if(hasConfirmed){
        try {
          await fetch(`/api/prompts/${post._id.toString()}`,{
            method: 'DELETE',
          })
          const filteredPosts=posts.filter((p)=>p._id!==post._id)

          setPosts(filteredPosts)
        } catch (error) {
          console.log(error);
        }
      }

    }
  
    useEffect(() => {
        const fetchPosts = async () => {
          console.log(session.user.id);
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          console.log(response);
          const data = await response.json();
          setPosts(data);
        };
        
       if(session?.user.id) fetchPosts();
      }, []);
  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile