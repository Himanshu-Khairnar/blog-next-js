import AllBlog from '@/component/AllBlog';
import BlogCard from '@/component/BlogCard';
import { getBlogs } from '@/lib/user.action';
import Link from 'next/link';
import React from 'react'

export default async function page({ params: { type } }: { params: { type: string } }) {
  const data = await getBlogs();
  let filterdata = data.filter((item: any) => item.title === type);

  if (!filterdata.length) {
    filterdata = data.filter((item: any) => item.type === type);
  }

  const blogs = filterdata.length ? filterdata : [];

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center md:text-left">Topic of Blog 📑</h1>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 my-10'>
          {
            blogs.map((blogs: any, index: number) => {
              return (
                <Link href={`/blog/${blogs._id}`} key={index}>
                  <BlogCard blog={blogs} />
                </Link>

              )

            }
            )}
        </div>
      </div>
    </div>
  )
}
