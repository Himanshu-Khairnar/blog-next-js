'use client'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function SearchInput() {
    const [value, setvalue] = useState('');
    return (
        <div className="flex justify-end w-full p-10 ">
            <Input type="search" placeholder="Search Blog or Topic" className="text-black w-[20rem] " 
            value={value} onChange={(e) => setvalue(e.target.value)} />
            <Link href={`/search/${value}`} className="ml-1 border-[1.4px] p-[5px] rounded-lg hover:border-black"><Search /></Link>
            
        </div>
    )
}
