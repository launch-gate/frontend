import styled from "styled-components";

export const SWorkspacePage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 48px 206px 72px;

  @media (max-width: 1200px) {
    padding: 40px 80px 60px;
  }

  @media (max-width: 768px) {
    padding: 32px 24px 48px;
  }
`;

export const SWorkspaceHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 900px;
`;

export const SWorkspaceTitle = styled.h1`
  ${({ theme }) => theme.font.title1};
  margin: 0;
`;

export const SWorkspaceSubtitle = styled.p`
  ${({ theme }) => theme.font.subtitle};
  color: ${({ theme }) => theme.colors.gray.mid};
  margin: 0;
  line-height: 1.35;
`;

export const SWorkspaceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SWorkspacePanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
`;

export const SPanelWide = styled(SWorkspacePanel)`
  grid-column: 1 / -1;
`;

export const SPanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  flex-wrap: wrap;
`;

export const SPanelTitle = styled.h2`
  ${({ theme }) => theme.font.title2};
  margin: 0;
`;

export const SPanelText = styled.p`
  ${({ theme }) => theme.font.body};
  margin: 0;
  color: ${({ theme }) => theme.colors.gray.mid};
  line-height: 1.45;
`;

export const SFormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const SField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.mid};
`;

export const SInput = styled.input`
  width: 100%;
  min-height: 42px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray.dark};
  ${({ theme }) => theme.font.body};
`;

export const STextarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray.dark};
  resize: none;
  overflow: hidden;
  ${({ theme }) => theme.font.body};
`;

export const SSelect = styled.select`
  width: 100%;
  min-height: 42px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray.primary};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray.dark};
  ${({ theme }) => theme.font.body};
`;

export const SActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

export const SList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SListItem = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray.primary};
`;

export const SItemTitle = styled.div`
  ${({ theme }) => theme.font.subtitle};
`;

export const SItemMeta = styled.div`
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.mid};
  margin-top: 6px;
  line-height: 1.35;
`;

export const SStatus = styled.div`
  align-self: center;
  padding: 6px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.lightViolet};
  color: ${({ theme }) => theme.colors.violet};
  ${({ theme }) => theme.font.caption};
`;

export const SDataBox = styled.pre`
  max-height: 360px;
  overflow: auto;
  margin: 0;
  padding: 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray.fill};
  color: ${({ theme }) => theme.colors.gray.dark};
  white-space: pre-wrap;
  word-break: break-word;
  ${({ theme }) => theme.font.caption};
`;

export const SInlineNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const SStageNav = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  padding-top: 4px;

  > :last-child {
    justify-self: end;
  }
`;

export const SContactsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SContactRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 8px;
  ${({ theme }) => theme.font.body};
`;

export const SContactLabel = styled.span`
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.mid};
  white-space: nowrap;
`;

export const SContactValue = styled.span`
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export const SContactLink = styled.a`
  ${({ theme }) => theme.font.body};
  color: ${({ theme }) => theme.colors.violet};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const SContactNote = styled.span`
  display: block;
  margin-top: 2px;
  ${({ theme }) => theme.font.caption};
  color: ${({ theme }) => theme.colors.gray.mid};
`;

export const SRequiredMark = styled.span`
  color: #c0392b;
  margin-left: 2px;
`;

export const SContactEditorRow = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr auto;
  align-items: end;
  gap: 10px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr auto;
  }
`;
