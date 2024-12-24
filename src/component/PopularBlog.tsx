import { getBlogs } from '@/lib/user.action';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';
import React from 'react';
import BlogCard from './BlogCard';
import Link from 'next/link';

export default async function PopularBlog() {
  const data = await getBlogs();
  const blog = [data[0], data[1], data[2]];

  return (
    <>
      <div className='text-3xl font-bold my-20 text-gray-900 text-center md:text-left h-auto'>
        Popular Blog ⚡

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blog.map((blog, index) => (
            <Link href={`/blog/${blog._id}`} key={index}>
              <BlogCard blog={blog} />
            </Link>))}
        </div>
      </div>
    </>
  );
}
