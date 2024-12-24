import { NextApiHandler } from "next";
import { ConnectDB } from "@/lib/ConnectDB";
import { NextRequest, NextResponse } from "next/server";
import { Blog } from "@/Model/CreatePost";

type ResponseData = {
  message: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    await ConnectDB();
    await Blog.create(data);
    return NextResponse.json({ message: "Data received", data });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ message: "Failed to process the request", error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await ConnectDB();
    const data = await Blog.find();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({ message: "Failed to fetch data", error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await ConnectDB();
    await Blog.findByIdAndDelete(id);
    return NextResponse.json({ message: "Data deleted" });
  } catch (error) {
    console.error("Error in DELETE:", error);
    return NextResponse.json({ message: "Failed to fetch data", error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const data = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    await ConnectDB();
    const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });

    if (!updatedBlog) {
      return NextResponse.json({ message: "No data found for the given ID" }, { status: 404 });
    }

    return NextResponse.json({ message: "Data updated", updatedBlog });
  } catch (error) {
    console.error("Error in PUT:", error);
    return NextResponse.json({ message: "Failed to fetch data", error: (error as Error).message }, { status: 500 });
  }
}
