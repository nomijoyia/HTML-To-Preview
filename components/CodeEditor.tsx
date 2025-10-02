
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { EditorType } from '../types';

interface CodeEditorProps {
  language: EditorType;
  value: string;
  onChange: (value: string) => void;
  isDarkMode: boolean;
}

const languageExtensions = {
  [EditorType.HTML]: [html()],
  [EditorType.CSS]: [css()],
  [EditorType.JS]: [javascript({ jsx: true })],
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ language, value, onChange, isDarkMode }) => {
  const extensions = languageExtensions[language] || [];
  
  return (
    <CodeMirror
      value={value}
      height="100%"
      theme={isDarkMode ? githubDark : githubLight}
      extensions={extensions}
      onChange={onChange}
      style={{ fontSize: '14px', height: '100%' }}
    />
  );
};
