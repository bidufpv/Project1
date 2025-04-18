"use client";

import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function RTE({ data, handleData }) {
  const quillRef = useRef(null);     // DOM ref for the container
  const editorRef = useRef(null);    // Quill editor instance ref

  // ✅ Initialize Quill editor only once
  useEffect(() => {
    if (!editorRef.current && quillRef.current) {
      editorRef.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            [{ color: [] }, { background: [] }],
            ["clean"],
          ],
        },
      });

      // Handle text changes
      editorRef.current.on("text-change", () => {
        handleData("description", editorRef.current.root.innerHTML);
      });
    }
  }, []);

  // ✅ Sync editor content if data.description changes (e.g., in edit mode)
  useEffect(() => {
    if (editorRef.current && data?.description) {
      const currentContent = editorRef.current.root.innerHTML;
      if (currentContent !== data.description) {
        editorRef.current.root.innerHTML = data.description;
      }
    }
  }, [data?.description]);

  return (
    <div className="border p-4 rounded-xl bg-white">
      <h1 className="font-semibold mb-2">Description</h1>
      <div className="border rounded-lg overflow-hidden">
        <div ref={quillRef} className="min-h-[200px] p-2" />
      </div>
    </div>
  );
}
