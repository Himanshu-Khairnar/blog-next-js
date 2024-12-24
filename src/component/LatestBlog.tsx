import { getBlogs } from '@/lib/user.action';
import Image from 'next/image';
import React from 'react';

export default async function LatestBlog() {
  const data = await getBlogs();
  console.log(data)
    const blog = data[0];
  

  return (
    <div className="px-6 h-auto mb-20 ">
      <h1 className="text-4xl font-bold my-10   text-gray-900 text-center md:text-left">Latest Blog 🔥</h1>
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-between bg-neutral-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
        {/* Blog Details Section */}
        <div className="flex flex-col items-start md:w-2/3 space-y-4 h-[60vh]">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">{blog.title}</h2>
          <p className="bg-blue-600 text-white font-medium text-sm md:text-md p-[4px] rounded-xl">{blog.type}</p>
          
          {/* Responsive description with overflow handling */}
          <div className="text-sm md:text-base overflow-hidden text-gray-600 h-[5rem] md:h-[7.8rem]" dangerouslySetInnerHTML={{ __html: blog.description }} ></div>

          {/* Author Info */}
          <div className="flex gap-3 items-center mt-2">
            <Image
              src={blog.authorImg}
              alt="Author Image"
              height={40}
              width={40}
              className="h-10 w-10 md:h-12 md:w-12 border-2 border-gray-800 rounded-full object-cover"
            />
            <p className="text-gray-600">{blog.author}</p>
          </div>
        </div>

        {/* Blog Image Section */}
        <div className="h-[200px] w-[100%] md:w-[500px] lg:h-[300px] lg:w-[700px] rounded-lg overflow-hidden shadow-md">
          <Image
            src={blog.image}
            alt="Blog Image"
            layout="responsive"
            height={300}
            width={700}
            className=" w-full h-full "
          />
        </div>
      </div>
    </div>
  );
}
