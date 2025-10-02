import React from 'react';
import { CodeEditor } from './CodeEditor';
import { EditorType } from '../types';
import { Braces, Code, FileJson, Trash2 } from './Icons';

interface EditorPanelProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  isDarkMode: boolean;
  onCodeChange: (editor: EditorType, value: string) => void;
  activeTab: EditorType;
  onTabChange: (tab: EditorType) => void;
}

const editorTabs = [
  { id: EditorType.HTML, label: 'HTML', icon: <Code className="w-4 h-4" /> },
  { id: EditorType.CSS, label: 'CSS', icon: <Braces className="w-4 h-4" /> },
  { id: EditorType.JS, label: 'JS', icon: <FileJson className="w-4 h-4" /> },
];

export const EditorPanel: React.FC<EditorPanelProps> = ({ htmlCode, cssCode, jsCode, onCodeChange, isDarkMode, activeTab, onTabChange }) => {

  const getCodeForTab = (tab: EditorType) => {
    switch (tab) {
      case EditorType.HTML: return htmlCode;
      case EditorType.CSS: return cssCode;
      case EditorType.JS: return jsCode;
      default: return '';
    }
  };

  const handleClearCode = () => {
    const confirmationMessage = `Are you sure you want to clear the code in the ${activeTab.toUpperCase()} editor? This action cannot be undone.`;
    if (window.confirm(confirmationMessage)) {
      onCodeChange(activeTab, '');
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900">
      <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
        <div className="flex">
          {editorTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-800 text-blue-500 border-b-2 border-blue-500 -mb-px'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 border-b-2 border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="pr-2">
          <button
            onClick={handleClearCode}
            className="group relative flex items-center justify-center p-2 rounded-md transition-colors text-slate-500 dark:text-slate-400 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/50 dark:hover:text-red-500"
            aria-label={`Clear ${activeTab.toUpperCase()} code`}
          >
            <Trash2 className="w-4 h-4" />
            <span className="absolute bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-slate-800 dark:bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {`Clear ${activeTab.toUpperCase()} Code`}
            </span>
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-auto">
        <CodeEditor
          language={activeTab}
          value={getCodeForTab(activeTab)}
          onChange={(value) => onCodeChange(activeTab, value)}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};