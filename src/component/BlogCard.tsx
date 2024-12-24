import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

interface Blog{
  title:string
  description:string
  image:string
  author:string
  authorImg:string
}
export default function BlogCard({blog}:{blog:Blog}) {
  return (
    <div
    
    className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden max-w-[280px] mx-auto "
  >
    {/* Blog Image */}
    <div className="relative h-48">
      <Image
        src={blog.image}
        alt={blog.title}
        layout="fill"
        objectFit="cover"
        className="w-full h-full"
      />
    </div>

    {/* Blog Content */}
    <div className="p-4 flex flex-col justify-between flex-grow">
      <div>
        <h5 className="text-xl font-semibold mb-2 text-gray-900 h-[5.1rem] overflow-clip">
          {blog.title}
        </h5>
        <div
          dangerouslySetInnerHTML={{ __html: blog.description }}
          className="text-gray-700 text-sm leading-relaxed line-clamp-2 overflow-hidden font-light"
        />
      </div>

      {/* Author and Button */}
      <div className="mt-4 flex items-center justify-between">
        {/* Author */}
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={blog.authorImg} alt={blog.author} />
            <AvatarFallback>{blog.author.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-600">{blog.author}</span>
        </div>

        {/* Read More Button */}
        <button
          className="bg-gray-900 text-white font-bold py-1 px-2 rounded-lg text-xs uppercase transition hover:bg-gray-800"
          type="button"
        >
          Read More
        </button>
      </div>
    </div>
  </div>
  )
}
