import { getBlogs } from '@/lib/user.action';
import React from 'react'
import BlogCard from './BlogCard';
import Link from 'next/link';

export default async function AllBlog() {
  const blogs =await  getBlogs();

  return (
    <div>
 <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center md:text-left">Topic of Blog 📑</h1>
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 my-10'>
      {
        blogs.map((blogs:any,index:number)=>{
          return (
          <Link href={`/blog/${blogs._id}`} key={index}>
          <BlogCard blog={blogs} />
          </Link>
            
          )

        }
      )}
    </div>
    </div>
  )
}
