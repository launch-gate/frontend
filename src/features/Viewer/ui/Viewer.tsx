import React, { JSX } from "react";
import { OutputData } from "@editorjs/editorjs";

import { SViewer } from "./viewer.styles";

interface ViewerProps {
  data: OutputData;
}

export const Viewer: React.FC<ViewerProps> = ({ data }) => {
  console.log(data);
  if (!data || !data.blocks) return <div>Нет данных для отображения</div>;

  return (
    <SViewer>
      {data.blocks.map((block) => {
        const { id, type, data: blockData } = block;

        switch (type) {
          case "header": {
            const Tag =
              `h${blockData.level || 2}` as keyof JSX.IntrinsicElements;
            return (
              <Tag
                key={id}
                dangerouslySetInnerHTML={{ __html: blockData.text }}
              />
            );
          }

          case "paragraph":
            return (
              <p
                key={id}
                dangerouslySetInnerHTML={{ __html: blockData.text || "" }}
              />
            );

          case "list": {
            const Tag = blockData.style === "ordered" ? "ol" : "ul";
            return (
              <Tag key={id}>
                {blockData.items?.map((data, i: number) => {
                  console.log(data);
                  return (
                    <li
                      key={i}
                      dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                  );
                })}
              </Tag>
            );
          }

          case "quote":
            return (
              <blockquote key={id}>
                <div
                  dangerouslySetInnerHTML={{ __html: blockData.text || "" }}
                />
                {blockData.caption && <footer>— {blockData.caption}</footer>}
              </blockquote>
            );

          case "image":
            return (
              <div key={id} style={{ textAlign: "center", margin: "20px 0" }}>
                <img
                  src={blockData.file?.url}
                  alt={blockData.caption || ""}
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
                {blockData.caption && <p>{blockData.caption}</p>}
              </div>
            );

          default:
            console.warn(`Неизвестный тип блока: ${type}`, blockData);
            return (
              <pre key={id} style={{ background: "#f7f7f7", padding: "10px" }}>
                {JSON.stringify(blockData, null, 2)}
              </pre>
            );
        }
      })}
    </SViewer>
  );
};
