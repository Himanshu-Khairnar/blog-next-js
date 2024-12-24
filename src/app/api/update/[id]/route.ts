import { ConnectDB } from "@/lib/ConnectDB";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Blog } from "@/Model/CreatePost";
export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const {newtitle:title, newdescription:description, newimage:image, newtype:type,newauthor:author,newauthorImg:authorImg} = await req.json();
  try {
    await ConnectDB();
    const data = await Blog.findByIdAndUpdate(id,{title,description, image, type,author,authorImg});
    return NextResponse.json({ message:'updated',status:200});
  } catch (err) {
    console.log("can't find data", err);
  }
}
