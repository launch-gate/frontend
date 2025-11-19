import styled from "styled-components";

export const SViewer = styled.div`
  line-height: 1.6;
  color: #1f1f1f;

  /* Базовые отступы между блоками */
  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }

  p {
    margin: 0 0 12px;
  }

  /* Заголовки */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${({ theme }) => theme.colors.violet} !important;
    margin: 24px 0 12px;
    font-weight: 600;
    line-height: 1.3;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 18px;
  }

  h4 {
    font-size: 16px;
  }

  h5 {
    font-size: 14px;
  }

  h6 {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Списки */
  ul,
  ol {
    margin: 0 0 12px 1.5rem;
    padding-left: 1.5rem;
  }

  /* Ненумерованные списки — с точками */
  ul {
    list-style-type: disc !important;
    list-style-position: outside !important;
  }

  /* Нумерованные списки — с цифрами */
  ol {
    list-style-type: decimal;
    list-style-position: outside;
  }

  li {
    margin-bottom: 4px;

    &::marker {
      color: ${({ theme }) => theme.colors.violet};
    }
  }

  /* Цитаты */
  blockquote {
    margin: 16px 0;
    padding-left: 12px;
    border-left: 3px solid #d9d9d9;
    color: #595959;
    font-style: italic;
  }

  /* Ссылки */
  a {
    color: #1677ff;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      text-decoration: none;
    }
  }

  /* Картинки */
  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 16px 0;
    border-radius: 8px;
  }

  strong,
  b {
    font-weight: 600;
  }

  em,
  i {
    font-style: italic;
  }

  /* Классы EditorJS (если Viewer их пробрасывает) */
  .ce-block {
    margin-bottom: 12px;
  }

  .ce-header {
    margin: 24px 0 12px;
  }

  .cdx-list--unordered {
    list-style-type: disc;
    list-style-position: outside;
  }

  .cdx-list--ordered {
    list-style-type: decimal;
    list-style-position: outside;
  }

  .cdx-list__item {
    margin-bottom: 4px;
  }

  .cdx-quote {
    margin: 16px 0;
    padding-left: 12px;
    border-left: 3px solid #d9d9d9;
    color: #595959;
    font-style: italic;
  }
`;
