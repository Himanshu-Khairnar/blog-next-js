'use client';
import ProfileBlogs from '@/component/ProfileBlogs';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

export default function ProfilePage() {
  const { user } = useUser();
  const name = user?.fullName || 'User Name';
  const email = user?.emailAddresses?.[0]?.emailAddress || 'No email available';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full border-gray-100 border-2">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <Image
            src={user?.imageUrl || 'https://via.placeholder.com/100'}
            alt={user?.fullName || 'User'}
            width={100}
            height={100}
            className="rounded-lg border-none border-gray-200"
          />
        </div>
        
        {/* User Information */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h1>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>
      <ProfileBlogs authorName={name}/>
    </div>
  );
}
