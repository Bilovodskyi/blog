"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { AiFillCaretDown, AiOutlineOrderedList } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { GrBlockQuote } from "react-icons/gr";
import { GrUndo } from "react-icons/gr";
import { GrRedo } from "react-icons/gr";
import { RiUnderline } from "react-icons/ri";
import { MdLayersClear } from "react-icons/md";
import { MdFormatClear } from "react-icons/md";

const EditorText = ({ updateFields, article }: UpdateFieldsType) => {
    const handleUpdateContent = ({ editor }: any) => {
        updateFields({ article: editor.getHTML() });
    };
    const editor = useEditor({
        extensions: [StarterKit],
        onUpdate: handleUpdateContent,
        content: article !== "" ? article : "",
        editorProps: {
            attributes: {
                class: "rounded-[10px] border border-[#777] p-4 h-[450px] lg:h-[500px] focus:outline-none overflow-scroll",
            },
        },
    });

    return (
        <>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </>
    );
};

type Prop = {
    editor: Editor | null;
};

const MenuBar = ({ editor }: Prop) => {
    const [textType, setTextType] = useState("Regular");
    const [isOpen, setIsOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [message, setMessage] = useState({
        text: "",
        position: 0,
    });

    type MessageProps = {
        text: string;
        position: number;
    };

    const handleMouseOver = ({ text, position }: MessageProps) => {
        if (window.innerWidth > 1024) {
            setIsHovering(true);
            setMessage({ text, position });
        }
    };

    const handleMouseOut = () => {
        setIsHovering(false);
        setMessage({ text: "", position: 0 });
    };

    if (!editor) {
        return null;
    }

    return (
        <div className="max-[1024px]:grid grid-rows-2 grid-cols-7 lg:flex items-center justify-between mb-4 rounded-[10px] border border-[#777] p-4">
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    onMouseEnter={() =>
                        handleMouseOver({ text: "Bold", position: 1 })
                    }
                    onMouseLeave={handleMouseOut}
                    className={
                        editor.isActive("bold")
                            ? "border rounded-[5px] px-2 bg-[#fff] text-black font-bold"
                            : "font-bold px-[9px] py-[1px]"
                    }>
                    B
                </button>
                {isHovering && message.position === 1 && (
                    <div className="absolute top-[100%] text-[0.8rem] bg-white/10 px-2 rounded-[5px]">
                        {message.text}
                    </div>
                )}
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can().chain().focus().toggleItalic().run()
                    }
                    onMouseEnter={() =>
                        handleMouseOver({ text: "Italic", position: 2 })
                    }
                    onMouseLeave={handleMouseOut}
                    className={
                        editor.isActive("italic")
                            ? "border rounded-[5px] px-2 bg-[#fff] text-black italic"
                            : "italic px-[9px] py-[1px]"
                    }>
                    I
                </button>
                {isHovering && message.position === 2 && (
                    <div className="absolute top-[100%] text-[0.8rem] bg-white/10 px-2 rounded-[5px]">
                        {message.text}
                    </div>
                )}
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can().chain().focus().toggleStrike().run()
                    }
                    onMouseEnter={() =>
                        handleMouseOver({ text: "Strikethrough", position: 3 })
                    }
                    onMouseLeave={handleMouseOut}
                    className={
                        editor.isActive("strike")
                            ? "border rounded-[5px] px-2 bg-[#fff] text-black line-through"
                            : "line-through px-[9px] py-[1px]"
                    }>
                    S
                </button>
                {isHovering && message.position === 3 && (
                    <div className="absolute top-[100%] text-[0.8rem] bg-white/10 px-2 rounded-[5px]">
                        {message.text}
                    </div>
                )}
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    onMouseEnter={() =>
                        handleMouseOver({ text: "Clear Marks", position: 4 })
                    }
                    onMouseLeave={handleMouseOut}
                    className="cursor-pointer px-2 active:bg-white active:text-black active:rounded-[5px]">
                    <MdFormatClear className="text-[1.2rem]" />
                </button>
                {isHovering && message.position === 4 && (
                    <div className="absolute top-[105%] text-[0.8rem] bg-white/10 px-2 rounded-[5px] text-center">
                        {message.text}
                    </div>
                )}
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    onMouseEnter={() =>
                        handleMouseOver({ text: "Clear Nodes", position: 5 })
                    }
                    onMouseLeave={handleMouseOut}
                    className="cursor-pointer px-2 active:bg-white active:text-black active:rounded-[5px]">
                    <MdLayersClear className="text-[1.2rem]" />
                </button>
                {isHovering && message.position === 5 && (
                    <div className="absolute top-[105%] text-[0.8rem] bg-white/10 px-2 rounded-[5px] text-center">
                        {message.text}
                    </div>
                )}
            </div>
            <div
                className="relative col-span-2"
                tabIndex={0}
                onBlur={() => setIsOpen(false)}>
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="flex gap-2 items-center justify-center min-w-[80px]">
                    {editor.isActive("paragraph") ? "Regular" : textType}
                    <AiFillCaretDown />
                </button>
                {isOpen && (
                    <ul className="absolute rounded-[5px] border border-[#777] bg-[#2C373E] flex flex-col gap-2 z-20">
                        <button
                            type="button"
                            onClick={() => {
                                editor.chain().focus().setParagraph().run();
                                setTextType("Regular");
                            }}
                            className={
                                editor.isActive("paragraph")
                                    ? "border rounded-[5px] px-2 bg-[#fff] text-black cursor-pointer"
                                    : "rounded-[5px] px-[9px] py-[1px] hover:bg-[#323E44] cursor-pointer"
                            }>
                            Regular
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setTextType("Title");
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 1 })
                                    .run();
                            }}
                            className={
                                editor.isActive("heading", { level: 1 })
                                    ? "border rounded-[5px] px-2 bg-[#fff] text-black cursor-pointer"
                                    : "rounded-[5px] px-[9px] py-[1px] hover:bg-[#323E44] cursor-pointer"
                            }>
                            Title
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setTextType("Subtitle");
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: 3 })
                                    .run();
                            }}
                            className={
                                editor.isActive("heading", { level: 3 })
                                    ? "border rounded-[5px] px-2 bg-[#fff] text-black cursor-pointer"
                                    : "rounded-[5px] px-[9px] py-[1px] hover:bg-[#323E44] cursor-pointer"
                            }>
                            Subtitle
                        </button>
                    </ul>
                )}
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    onMouseEnter={() =>
                        handleMouseOver({ text: "Bullet List", position: 6 })
                    }
                    onMouseLeave={handleMouseOut}
                    className={
                        editor.isActive("bulletList")
                            ? "border rounded-[5px] px-2 bg-[#fff] text-black"
                            : "px-[9px] py-[1px]"
                    }>
                    <AiOutlineUnorderedList className="text-[1.4rem]" />
                </button>
                {isHovering && message.position === 6 && (
                    <div className="absolute top-[105%] text-[0.8rem] bg-white/10 px-2 rounded-[5px] text-center">
                        {message.text}
                    </div>
                )}
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    onMouseEnter={() =>
                        handleMouseOver({ text: "Ordered List", position: 7 })
                    }
                    onMouseLeave={handleMouseOut}
                    className={
                        editor.isActive("orderedList")
                            ? "border rounded-[5px] px-2 bg-[#fff] text-black"
                            : "px-[9px] py-[1px]"
                    }>
                    <AiOutlineOrderedList className="text-[1.4rem]" />
                </button>
                {isHovering && message.position === 7 && (
                    <div className="absolute top-[105%] text-[0.8rem] bg-white/10 px-2 rounded-[5px] text-center">
                        {message.text}
                    </div>
                )}
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    onMouseEnter={() =>
                        handleMouseOver({ text: "Quote", position: 8 })
                    }
                    onMouseLeave={handleMouseOut}
                    className={
                        editor.isActive("blockquote")
                            ? "border rounded-[5px] px-2 bg-[#fff] text-black"
                            : "px-[9px] py-[1px]"
                    }>
                    <GrBlockQuote />
                </button>
                {isHovering && message.position === 8 && (
                    <div className="absolute top-[105%] text-[0.8rem] bg-white/10 px-2 rounded-[5px] text-center">
                        {message.text}
                    </div>
                )}
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() =>
                        editor.chain().focus().setHorizontalRule().run()
                    }
                    onMouseEnter={() =>
                        handleMouseOver({ text: "Underline", position: 9 })
                    }
                    onMouseLeave={handleMouseOut}
                    className="cursor-pointer px-2 active:bg-white active:text-black active:rounded-[5px]">
                    <RiUnderline className="text-[1.3rem]" />
                </button>
                {isHovering && message.position === 9 && (
                    <div className="absolute top-[105%] text-[0.8rem] bg-white/10 px-2 rounded-[5px] text-center">
                        {message.text}
                    </div>
                )}
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    onMouseEnter={() =>
                        handleMouseOver({ text: "Undo", position: 10 })
                    }
                    onMouseLeave={handleMouseOut}
                    className="cursor-pointer px-2 active:bg-white active:text-black active:rounded-[5px]">
                    <GrUndo />
                </button>
                {isHovering && message.position == 10 && (
                    <div className="absolute top-[105%] text-[0.8rem] bg-white/10 px-2 rounded-[5px] text-center">
                        {message.text}
                    </div>
                )}
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    onMouseEnter={() =>
                        handleMouseOver({ text: "Redo", position: 11 })
                    }
                    onMouseLeave={handleMouseOut}
                    className="cursor-pointer px-2 active:bg-white active:text-black active:rounded-[5px]">
                    <GrRedo />
                </button>
                {isHovering && message.position === 11 && (
                    <div className="absolute top-[105%] text-[0.8rem] bg-white/10 px-2 rounded-[5px] text-center">
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditorText;
