"use client";

import React, { useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import dayjs from "dayjs";

import { useNotify } from "@/shared/components";
import type { IUpload } from "@/features/UploadImage"; // { fileUrl, deleteFileUrl }

import { SEditor } from "./editor.styles";

interface EditorProps {
  data?: OutputData;
  onChange?: (data: OutputData) => void;
}

type ImagesMap = Record<string, string>;

const extractImages = (output: OutputData | undefined): ImagesMap => {
  if (!output) return {};

  const result: ImagesMap = {};

  for (const block of output.blocks ?? []) {
    if (block.type !== "image") continue;

    const data = block.data as {
      file?: {
        url?: string;
        deleteFileUrl?: string;
      };
    };

    const url = data.file?.url;
    const deleteFileUrl = data.file?.deleteFileUrl;

    if (url && deleteFileUrl) {
      result[url] = deleteFileUrl;
    }
  }

  return result;
};

export const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holderId = "editorjs";
  const notify = useNotify();

  // храним предыдущее состояние картинок, чтобы понимать, какие удалили
  const prevImagesRef = useRef<ImagesMap>(extractImages(data));

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
              uploader: {
                // загрузка файла (по аналогии с UploadImage)
                async uploadByFile(file: File) {
                  const formData = new FormData();
                  formData.append("file", file);

                  try {
                    const response = await fetch(
                      "http://localhost:8887/api/v1/file/save",
                      {
                        method: "POST",
                        body: formData,
                      },
                    );

                    if (!response.ok) {
                      throw new Error("Не удалось загрузить файл");
                    }

                    const upload: IUpload = await response.json();

                    if (!upload.fileUrl || !upload.deleteFileUrl) {
                      throw new Error("Некорректный ответ сервера");
                    }

                    notify({
                      message: "Успех",
                      type: "success",
                      description: "Фото успешно загружено",
                    });

                    // то, что вернём здесь, попадёт в block.data.file
                    return {
                      success: 1,
                      file: {
                        url: upload.fileUrl,
                        deleteFileUrl: upload.deleteFileUrl,
                      },
                    };
                  } catch (error) {
                    notify({
                      message: "Ошибка",
                      type: "error",
                      description: "Ошибка при загрузке фото",
                    });

                    return {
                      success: 0,
                    };
                  }
                },
              },
            },
          },
        },
        async onChange(api) {
          const newData = await api.saver.save();

          // сравниваем какие картинки были и какие стали
          const newImages = extractImages(newData);
          const prevImages = prevImagesRef.current;

          // находим удалённые картинки (url был, а теперь его нет)
          const removed = Object.entries(prevImages).filter(
            ([url]) => !newImages[url],
          );

          // отправляем DELETE для каждой удалённой
          removed.forEach(async ([, deleteFileUrl]) => {
            try {
              const response = await fetch(deleteFileUrl, {
                method: "DELETE",
              });

              if (!response.ok) {
                throw new Error("Не удалось удалить файл");
              }

              notify({
                message: "Успех",
                type: "warning",
                description: "Фото успешно удалено",
              });
            } catch {
              notify({
                message: "Ошибка",
                type: "error",
                description: "Не удалось удалить фото",
              });
            }
          });

          // обновляем "предыдущее" состояние картинок
          prevImagesRef.current = newImages;

          // пробрасываем наружу данные редактора
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
