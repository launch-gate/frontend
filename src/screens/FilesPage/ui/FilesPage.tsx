"use client";

import { ChangeEvent, useState } from "react";

import { useGetFileDownloadUrl, useUploadFile } from "@/entities/file";
import { Button } from "@/shared/components";
import {
  SActions,
  SField,
  SFormGrid,
  SInput,
  SItemMeta,
  SItemTitle,
  SList,
  SListItem,
  SPanelText,
  SPanelTitle,
  SStatus,
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

export const FilesPage = () => {
  const uploadFile = useUploadFile();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState(0);
  const [actionResult, setActionResult] = useState<string | null>(null);
  const downloadUrl = useGetFileDownloadUrl(fileId, !!fileId);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] ?? null);
  };

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <SWorkspaceTitle>Файлы</SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Upload файлов для ресурсов и submission, получение временной ссылки на
          скачивание или просмотр.
        </SWorkspaceSubtitle>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Загрузка</SPanelTitle>
          <SField>
            Файл
            <SInput type="file" onChange={handleFileChange} />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={uploadFile.isPending}
              disabled={!selectedFile}
              onClick={() => {
                if (!selectedFile) return;

                uploadFile.mutate(
                  { file: selectedFile, filename: selectedFile.name },
                  {
                    onSuccess: (data) => {
                      setFileId(data.id ?? 0);
                      setActionResult(`Файл загружен: #${data.id ?? "-"}`);
                    },
                    onError: (error) => setActionResult(error.message),
                  },
                );
              }}
            >
              Загрузить
            </Button>
          </SActions>
          {uploadFile.data && (
            <SList>
              <SListItem>
                <div>
                  <SItemTitle>
                    {uploadFile.data.originalFilename ?? selectedFile?.name ?? "Файл"}
                  </SItemTitle>
                  <SItemMeta>
                    {uploadFile.data.contentType ?? "-"} ·{" "}
                    {uploadFile.data.sizeBytes ?? 0} bytes
                  </SItemMeta>
                </div>
                <SStatus>#{uploadFile.data.id ?? "-"}</SStatus>
              </SListItem>
            </SList>
          )}
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Download URL</SPanelTitle>
          <SFormGrid>
            <SField>
              File ID
              <SInput
                type="number"
                value={fileId}
                onChange={(event) => setFileId(Number(event.target.value))}
              />
            </SField>
          </SFormGrid>
          {downloadUrl.data?.url ? (
            <a href={downloadUrl.data.url} target="_blank" rel="noreferrer">
              {downloadUrl.data.url}
            </a>
          ) : (
            <SPanelText>Ссылка появится после выбора File ID.</SPanelText>
          )}
          {actionResult && <SPanelText>{actionResult}</SPanelText>}
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
