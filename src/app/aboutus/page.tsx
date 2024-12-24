import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Github, User, Info } from 'lucide-react'; // Importing icons from Lucide

export default function AboutPage() {
    return (
        <div className='m-10 p-6  rounded-lg'>
            {/* Logo and Page Title */}
            <div className="flex items-center gap-4 mb-8">
                <Image src='/logo.png' alt='logo' width={50} height={50} className='w-10 h-fit' />
                <h1 className='text-3xl font-mono font-semibold text-gray-800'>Blogger</h1>
            </div>

            {/* About Us Section */}
            <div className='mb-10'>
                <div className="flex items-center gap-2 mb-4">
                    <Info className='text-blue-500' /> {/* About Us Icon */}
                    <h1 className='underline text-2xl text-gray-700 font-semibold'>About Us</h1>
                </div>
                <p className='text-lg text-gray-600'>
                    Welcome to Blogger, a platform where we share insights, tutorials, and articles on 
                    various tech topics including web development, software engineering, and modern tools.
                    Our mission is to provide valuable content that helps developers and tech enthusiasts stay 
                    updated and inspired. From beginner guides to advanced techniques, we&apos;ve got you covered!
                </p>
            </div>

            {/* About Me Section */}
            <div className='mb-10'>
                <div className="flex items-center gap-2 mb-4">
                    <User className='text-green-500' /> {/* About Me Icon */}
                    <h2 className='underline text-2xl text-gray-700 font-semibold'>About Me</h2>
                </div>
                <p className='text-lg text-gray-600'>
                    Hi, I&apos;m <span className='font-bold'>Himanshu Khairnar</span>, a passionate software engineer and tech enthusiast. I love building 
                    applications using React.js, Next.js, and Tailwind CSS. I also enjoy experimenting with 
                    new technologies and sharing my experiences through writing. When I&apos;m not coding, you 
                    can find me exploring the latest in tech trends or contributing to open-source projects.
                </p>
            </div>

            {/* GitHub Section */}
            <div className='mb-10'>
                <div className="flex items-center gap-2 mb-4">
                    <Github className='text-black' /> {/* GitHub Icon */}
                    <h2 className='underline text-2xl text-gray-700 font-semibold'>GitHub</h2>
                </div>
                <p className='text-lg text-gray-600'>
                    You can check out my GitHub profile to explore some of the projects I&apos;ve been working on. 
                    Feel free to contribute or give feedback on any of them. 
                </p>
                <Link href="https://github.com/Himasnhu-Khairnar" className='text-blue-500 underline flex items-center gap-2'>
                    <Github className='w-5 h-5' />
                    Visit my GitHub
                </Link>
            </div>
        </div>
    );
}
