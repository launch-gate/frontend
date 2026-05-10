"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ExportFormat,
  useCreateCustomContestExport,
  useExportContestRanking,
  useGetContestAnalytics,
} from "@/entities/contest";
import { Button } from "@/shared/components";
import { routes } from "@/shared/config";
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
  SSelect,
  SStatus,
  STextarea,
  SWorkspaceGrid,
  SWorkspaceHeader,
  SWorkspacePage,
  SWorkspacePanel,
  SWorkspaceSubtitle,
  SWorkspaceTitle,
} from "@/screens/AppWorkspace";

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const ContestAnalyticsPage = () => {
  const params = useParams<{ contestId?: string }>();
  const contestId = Number(params.contestId);
  const analytics = useGetContestAnalytics(contestId);
  const exportRanking = useExportContestRanking();
  const createCustomExport = useCreateCustomContestExport();

  const [format, setFormat] = useState<ExportFormat>("CSV");
  const [prompt, setPrompt] = useState("");
  const [actionResult, setActionResult] = useState<string | null>(null);

  return (
    <SWorkspacePage>
      <SWorkspaceHeader>
        <Link href={routes.ORGANIZER_PAGE}>
          <Button type="text" color="gray">
            ← Панель организатора
          </Button>
        </Link>
        <SWorkspaceTitle>
          Аналитика конкурса #{Number.isFinite(contestId) ? contestId : "-"}
        </SWorkspaceTitle>
        <SWorkspaceSubtitle>
          Метрики конкурса, экспорт рейтинга и создание кастомной выгрузки.
        </SWorkspaceSubtitle>
        <SActions>
          <Link href={`/organizer/contests/${contestId}`}>
            <Button>Настройки конкурса</Button>
          </Link>
          <Link href={routes.ORGANIZER_PAGE}>
            <Button>Все конкурсы</Button>
          </Link>
        </SActions>
      </SWorkspaceHeader>

      <SWorkspaceGrid>
        <SWorkspacePanel>
          <SPanelTitle>Метрики</SPanelTitle>
          <SList>
            <SListItem>
              <div>
                <SItemTitle>Регистрации</SItemTitle>
                <SItemMeta>
                  Всего участников, зарегистрированных на конкурс
                </SItemMeta>
              </div>
              <SStatus>{analytics.data?.registrations ?? 0}</SStatus>
            </SListItem>
            <SListItem>
              <div>
                <SItemTitle>Команды</SItemTitle>
                <SItemMeta>Созданные команды</SItemMeta>
              </div>
              <SStatus>{analytics.data?.teams ?? 0}</SStatus>
            </SListItem>
            <SListItem>
              <div>
                <SItemTitle>Этапы</SItemTitle>
                <SItemMeta>Настроенные этапы</SItemMeta>
              </div>
              <SStatus>{analytics.data?.stages ?? 0}</SStatus>
            </SListItem>
            <SListItem>
              <div>
                <SItemTitle>Сданные работы</SItemTitle>
                <SItemMeta>Финализированные submissions</SItemMeta>
              </div>
              <SStatus>{analytics.data?.submittedWorks ?? 0}</SStatus>
            </SListItem>
          </SList>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Экспорт рейтинга</SPanelTitle>
          <SField>
            Формат
            <SSelect
              value={format}
              onChange={(event) =>
                setFormat(event.target.value as ExportFormat)
              }
            >
              <option value="CSV">CSV</option>
              <option value="XLSX">XLSX</option>
            </SSelect>
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={exportRanking.isPending}
              onClick={() =>
                exportRanking.mutate(
                  { contestId, format },
                  {
                    onSuccess: (blob) => {
                      downloadBlob(
                        blob,
                        `contest-${contestId}-ranking.${format.toLowerCase()}`,
                      );
                      setActionResult("Экспорт рейтинга сформирован.");
                    },
                    onError: (error) => setActionResult(error.message),
                  },
                )
              }
            >
              Скачать рейтинг
            </Button>
          </SActions>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Кастомная выгрузка</SPanelTitle>
          <SFormGrid>
            <SField>
              Формат
              <SSelect
                value={format}
                onChange={(event) =>
                  setFormat(event.target.value as ExportFormat)
                }
              >
                <option value="CSV">CSV</option>
                <option value="XLSX">XLSX</option>
              </SSelect>
            </SField>
          </SFormGrid>
          <SField>
            Prompt
            <STextarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
            />
          </SField>
          <SActions>
            <Button
              color="violet"
              loading={createCustomExport.isPending}
              onClick={() =>
                createCustomExport.mutate(
                  {
                    contestId,
                    data: {
                      format,
                      prompt: prompt.trim() || undefined,
                    },
                  },
                  {
                    onSuccess: (data) =>
                      setActionResult(
                        `Кастомный экспорт создан: #${data.jobId ?? "-"} ${data.preview ?? ""}`,
                      ),
                    onError: (error) => setActionResult(error.message),
                  },
                )
              }
            >
              Создать экспорт
            </Button>
          </SActions>
        </SWorkspacePanel>

        <SWorkspacePanel>
          <SPanelTitle>Результат</SPanelTitle>
          <SPanelText>{actionResult ?? "Действий пока не было."}</SPanelText>
        </SWorkspacePanel>
      </SWorkspaceGrid>
    </SWorkspacePage>
  );
};
