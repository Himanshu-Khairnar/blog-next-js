import { getBlogs } from '@/lib/user.action';
import Image from 'next/image';
export default async function Page({ params: { id } }: { params: { id: string } }) {
  const blogs = await getBlogs();
  const selectedBlog = blogs.find((blog: any) => blog._id === id);
  
  if (!selectedBlog) {
    return <div className="text-center py-10 text-gray-500">Blog not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Blog Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{selectedBlog?.title}</h1>
        <div className="flex items-center space-x-4">
          <Image

            src={selectedBlog?.authorImg} 
            alt={selectedBlog?.author} 
            width={50}
            height={50}
            className="w-12 h-12 rounded-full object-cover" 
          />
          <div>
            <p className="text-gray-700 font-medium">{selectedBlog?.author}</p>
            <p className="text-gray-500 text-sm">{selectedBlog?.type}</p>
          </div>
        </div>
      </div>

      {/* Blog Image */}
      {selectedBlog?.image && (
        <div className="mb-6">
          <Image 
            src={selectedBlog.image} 
            alt={selectedBlog.title} 
            width={1000}
            height={1000}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedBlog?.description }}>
      </div>
    </div>
  );
}
