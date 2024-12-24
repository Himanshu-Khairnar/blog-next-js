"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/ui/Tiptap";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getBlogs, putdata, UpdateData } from "@/lib/user.action";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
    title: z
        .string()
        .min(10, "Title must be at least 10 characters long")
        .max(100, "Title cannot exceed 100 characters"),
    image: z.any().optional(),
    description: z.string().min(10, "Blog must be at least 10 characters"),
    type: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function Page({ params: { id } }: { params: { id: string } }) {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
    const { user } = useUser();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            image: "",
            description: "",
            type: "",
        },
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const allBlogs = await getBlogs();
                const filteredBlogs = allBlogs.filter((blog: any) => blog._id === id);
                if (filteredBlogs.length > 0) {
                    setBlogs(filteredBlogs);
                    const blog = filteredBlogs[0];
                    form.reset({
                        title: blog.title,
                        image: blog.image,
                        description: blog.description,
                        type: blog.type,
                    });
                    if (blog.image) {
                        setImagePreview(blog.image);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            }
        }

        fetchData();
    }, [id, form]);
    console.log(form.getValues)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
const onSubmit: SubmitHandler<FormData> = async (values) => {
    const data = {
        newtitle: values.title,
        newimage: typeof imagePreview === 'string' ? imagePreview : "", // Ensure it's a string
        newdescription: values.description,
        newtype: values.type || "", // Provide default value if undefined
        newauthor: user?.fullName || "", // Provide default value if undefined
        newauthorImg: user?.imageUrl || "", // Provide default value if undefined
    };
    try {
        await UpdateData(id, data);
        window.location.reload();
    } catch (error) {
        console.error("Failed to update blog:", error);
    }
};

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 w-full">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title for blog" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                        <FormItem>
                            <FormLabel>Upload Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </FormControl>
                            <FormMessage />
                            {imagePreview && (
                                <div className="mt-4">
                                    <Image
                                        height={500}
                                        width={500}
                                        src={imagePreview as string}
                                        alt="Selected preview"
                                        className="max-w-xs max-h-48 object-contain"
                                    />
                                </div>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select The Type</FormLabel>
                            <FormControl>
                                <Select {...field}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                        <SelectItem value="fitness">Fitness</SelectItem>
                                        <SelectItem value="food">Food</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Controller
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Blog</FormLabel>
                            <FormControl>
                                <Tiptap
                                    content={field.value}
                                    onChange={(content: string) => field.onChange(content)}
                                    />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
