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
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/ui/Tiptap";
import { useState } from "react";
import Image from "next/image";
import { putdata } from "@/lib/user.action";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters long")
    .max(100, "Title cannot exceed 100 characters"),
  image: z.any().optional(), // Optional field for the image
  description: z.string().min(10, "blog must be at least 10 letter"),
  type: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function UpdateEditor() {
  const { user } = useUser()
  const [imagePreview, setImagePreview] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: null,
      description: "",
      type: ""
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var reader = new FileReader();

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
  };

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    const title = values.title;
    const image = imagePreview || ""; // Ensure image is always a string
    const description = values.description;
    const type = values.type || "";
    const author = user?.fullName || "Anonymous"; // Provide a default value
    const authorImg = user?.imageUrl || ""; // Provide a default value

    const data = {
      title,
      image,
      description,
      type,
      author,
      authorImg,
    };
    const senddata = await putdata(data);
    window.location.reload();

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
                    src={imagePreview}
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
              <FormLabel>Select The type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="lifestyle">LifeStyle</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>


            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog</FormLabel>
              <FormControl>
                <Tiptap
                  {...field}
                  onChange={(content: any) => field.onChange(content)} />
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
