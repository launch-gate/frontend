"use client";

import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import dayjs from "dayjs";

import { SEditor } from "./editor.styles";

interface EditorProps {
  data?: OutputData;
  onChange?: (data: OutputData) => void;
}

export const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holderId = "editorjs";

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holderId,
        data,
        autofocus: true,
        tools: {
          header: Header,
          list: List,
          quote: Quote,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "/api/upload",
                byUrl: "/api/fetchUrl",
              },
            },
          },
        },
        async onChange(api) {
          const newData = await api.saver.save();
          onChange?.(newData);
        },
      });
      editorRef.current = editor;
    }

    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  return (
    <>
      <SEditor id={holderId} />
      <div>последнее изменение было: {dayjs(data?.time).toString()}</div>
    </>
  );
};
