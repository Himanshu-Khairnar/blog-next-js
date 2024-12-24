'use client';
import { useEffect, useState } from 'react';
import { deleteData, getBlogs } from '@/lib/user.action';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Edit, Pen, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

interface ProfileBlogsProps {
  authorName: string;
}

interface Blog {
  _id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  author: string;
  authorImg: string;
}

export default function ProfileBlogs({ authorName }: ProfileBlogsProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const allBlogs = await getBlogs();
        const filteredBlogs = allBlogs.filter((blog: Blog) => blog.author === authorName);
        setBlogs(filteredBlogs);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [authorName]);

  if (loading) return <p>Loading...</p>;
  const handleSubmit = async(id: string) => {
    const deletedata=await deleteData(id);
    window.location.reload();


  }
  return (
    <div className="p-4">
      {blogs.length === 0 ? (
        <p>No blogs found for this author.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-md rounded-lg p-4">
              <Image
                src={blog.image || 'https://via.placeholder.com/300'}
                alt={blog.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: blog.description }} className="text-gray-600 mb-2 h-[3rem] overflow-hidden"></div>
                <p className="bg-blue-600 text-white font-medium text-sm md:text-md p-[4px] rounded-xl inline">{blog.type}</p>
              </div>
              <div className="mt-4 flex gap-2 items-center">
              
                <Dialog >
                  <DialogTrigger asChild>
                    <Button variant="outline"><Pen className='h-[1rem] text-blue-600 border-none' /></Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Update Your Blog</DialogTitle>
                      <DialogDescription>
                        You Sure, you wanna update it, once updated changes can&apos;t be undo          </DialogDescription>

                    </DialogHeader>
                    <DialogFooter>
                    <Link href={`edit/${blog._id}`}  className='bg-blue-600 hover:bg-blue-900 p-2 font-blod text-white rounded-md' >Update</Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog >
                  <DialogTrigger asChild>
                    <Button variant="outline"><Trash className='h-[1rem] text-red-600 border-none' /></Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Delete Blogs</DialogTitle>
                      <DialogDescription>
                        You Sure, you wanna delete it          </DialogDescription>

                    </DialogHeader>
                    <DialogFooter>
                    <Button type="submit" onClick={() => handleSubmit(blog._id)} className='bg-red-600 hover:bg-red-900' >Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
