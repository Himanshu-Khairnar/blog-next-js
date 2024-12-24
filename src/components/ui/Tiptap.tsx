"use client";
import "./style.css";
import { Editor } from '@tiptap/core'; 
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useRef, useState } from "react";
import FixedSizeImage from "./FixedSizeImage"; // Custom extension for handling fixed-size images.
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Code,
  Highlighter,
  Image as ImageIcon,
  Type,
} from "lucide-react";

const MenuBar = ({ editor }: { editor: Editor }) => {
  const [isSticky, setIsSticky] = useState(false);
  const menuBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (menuBarRef.current) {
        const { top } = menuBarRef.current.getBoundingClientRect();
        setIsSticky(top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!editor) {
    return null;
  }

  // Handle image upload and convert to base64
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result; // Base64 string
        editor
          .chain()
          .focus()
          .setImage({ src: result as string, alt: "Image"
           }) // Insert the image with fixed size
          .run();
      };
      reader.readAsDataURL(file); // Convert image to Base64
    }
  };

  const buttonClass =
    "w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-1";
  const activeButtonClass = "bg-gray-200";

  return (
    <div
      ref={menuBarRef}
      className={`menu-bar p-2 flex justify-center transition-all duration-300 ${
        isSticky ? "sticky" : ""
      }`}
    >
      <div className="flex space-x-2">
        {/* Toolbar buttons for text formatting */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`${buttonClass} ${
            editor.isActive("heading", { level: 1 }) ? activeButtonClass : ""
          }`}
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${buttonClass} ${
            editor.isActive("heading", { level: 2 }) ? activeButtonClass : ""
          }`}
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`${buttonClass} ${
            editor.isActive("heading", { level: 3 }) ? activeButtonClass : ""
          }`}
        >
          <Heading3 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${buttonClass} ${
            editor.isActive("paragraph") ? activeButtonClass : ""
          }`}
        >
          <Type size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonClass} ${
            editor.isActive("bold") ? activeButtonClass : ""
          }`}
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonClass} ${
            editor.isActive("italic") ? activeButtonClass : ""
          }`}
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${buttonClass} ${
            editor.isActive("strike") ? activeButtonClass : ""
          }`}
        >
          <Strikethrough size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${buttonClass} ${
            editor.isActive("codeBlock") ? activeButtonClass : ""
          }`}
        >
          <Code size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`${buttonClass} ${
            editor.isActive("highlight") ? activeButtonClass : ""
          }`}
        >
          <Highlighter size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${buttonClass} ${
            editor.isActive({ textAlign: "left" }) ? activeButtonClass : ""
          }`}
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`${buttonClass} ${
            editor.isActive({ textAlign: "center" }) ? activeButtonClass : ""
          }`}
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`${buttonClass} ${
            editor.isActive({ textAlign: "right" }) ? activeButtonClass : ""
          }`}
        >
          <AlignRight size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`${buttonClass} ${
            editor.isActive({ textAlign: "justify" }) ? activeButtonClass : ""
          }`}
        >
          <AlignJustify size={18} />
        </button>
        <label
          htmlFor="image-upload"
          className={`${buttonClass} cursor-pointer`}
        >
          <ImageIcon size={18} />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  );
};

const Tiptap = ({ onChange ,content}: any) => {
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      FixedSizeImage, // Custom extension to handle image size
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: content || '<p>Start Your Blog</p>', // Set initial content

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Trigger onChange with editor's HTML content
    },
    
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="tiptap-container border border-gray-300 rounded-md shadow-sm focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black transition-all relative min-h-[40vh] max-h-[1000vh]">
      {editor && <MenuBar editor={editor} />}
      <div className="editor-content p-4">
        <EditorContent
          editor={editor}
          className="!outline-none !border-none py-4"
        />
      </div>
    </div>
  );
};

export default Tiptap;