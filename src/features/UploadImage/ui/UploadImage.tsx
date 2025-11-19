import { FC } from "react";
import { UploadChangeParam } from "antd/es/upload";
import { UploadFile } from "antd";

import { Button, useNotify, Upload } from "@/shared/components";

import { IUpload, UploadImageProps } from "../model/uploadImage.types";

export const UploadImage: FC<UploadImageProps> = ({ upload, setUpload }) => {
  const notify = useNotify();

  const onChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      return;
    }

    if (info.file.status === "done") {
      const response = info.file.response as IUpload | undefined;
      if (response?.fileUrl && response?.deleteFileUrl) {
        setUpload(response);
        notify({
          message: "Успех",
          type: "success",
          description: "Фото успешно загружено",
        });
      } else {
        notify({
          message: "Ошибка",
          type: "error",
          description: "Ошибка при загрузке фото",
        });
      }
    } else if (info.file.status === "error") {
      setUpload(null);
      notify({
        message: "Ошибка",
        type: "error",
        description: "Ошибка при загрузке фото",
      });
    }
  };

  const onDelete = async () => {
    if (!upload) return;

    try {
      const response = await fetch(upload.deleteFileUrl, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не удалось удалить файл");
      }
      setUpload(null);
      notify({
        message: "Успех",
        type: "warning",
        description: "Фото успешно удалено",
      });
    } catch (error) {
      notify({
        message: "Ошибка",
        type: "error",
        description: "Не удалось удалить фото",
      });
    }
  };

  return (
    <div>
      <Upload
        name={"file"}
        action={"http://localhost:8887/api/v1/file/save"}
        multiple={false}
        maxCount={1}
        accept={"image/*"}
        showUploadList={false}
        onChange={onChange}
      >
        <Button color={"violet"}>
          {upload ? "Заменить фото" : "Прикрепить фото"}
        </Button>
      </Upload>
      {upload && <Button onClick={onDelete}>Удалить изображение</Button>}
    </div>
  );
};
