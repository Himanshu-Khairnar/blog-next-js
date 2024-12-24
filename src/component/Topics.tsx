import Link from 'next/link';
import { DevicePhoneMobileIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { AppleIcon, PersonStanding, ThumbsUp } from 'lucide-react';

export default function Topics() {
  return (
    <div className="px-4 py-10 my-10 w-full">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center md:text-left">Topic of Blog 📚</h1>
      <div className="flex flex-wrap gap-6 justify-around">
        <Link href={'/search/all'} passHref>
          <div className="flex items-center p-7 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 cursor-pointer w-full sm:w-auto">
            <p className="w-6 h-6 text-gray-700 mr-3" >☠️</p>
            <span className="text-lg font-semibold text-gray-800">All</span>
          </div>
        </Link>
        <Link href={'/search/technology'} passHref>
          <div className="flex items-center p-7 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 cursor-pointer w-full sm:w-auto">
            <p className="w-6 h-6 text-gray-700 mr-3" >🤖</p>
            <span className="text-lg font-semibold text-gray-800">Technology</span>
          </div>
        </Link>
        <Link href={'/search/lifestyle'} passHref>
          <div className="flex items-center p-7 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 cursor-pointer w-full sm:w-auto">
          <p className="w-6 h-6 text-gray-700 mr-3" >👨‍👩‍👧‍👦</p>
          <span className="text-lg font-semibold text-gray-800">Lifestyle</span>
          </div>
        </Link>
        <Link href={'/search/fitness'} passHref>
          <div className="flex items-center p-7 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 cursor-pointer w-full sm:w-auto">
          <p className="w-6 h-6 text-gray-700 mr-3" >💪</p>
          <span className="text-lg font-semibold text-gray-800">Fitness</span>
          </div>
        </Link>
        <Link href={'/search/food'} passHref>
          <div className="flex items-center p-7 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition duration-300 cursor-pointer w-full sm:w-auto">
          <p className="w-6 h-6 text-xl mr-3" >🍌</p>
          <span className="text-lg font-semibold text-gray-800">Food</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
