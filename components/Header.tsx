import React from 'react';
import { FileCode, Download, Sun, Moon, FilePlus, Save } from './Icons';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNewProject: () => void;
  onSaveProject: () => void;
  onDownloadZip: () => void;
}

const ActionButton: React.FC<{ onClick: () => void; children: React.ReactNode; tooltip: string }> = ({ onClick, children, tooltip }) => (
  <button
    onClick={onClick}
    className="group relative flex items-center justify-center p-2 rounded-md transition-colors bg-slate-200/50 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-600"
  >
    {children}
    <span className="absolute bottom-full mb-2 w-max px-2 py-1 text-xs text-white bg-slate-800 dark:bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
      {tooltip}
    </span>
  </button>
);

export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleTheme, onNewProject, onSaveProject, onDownloadZip }) => {
  return (
    <header className="flex items-center justify-between p-2 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex-shrink-0 shadow-sm">
      <div className="flex items-center gap-3">
        <FileCode className="w-8 h-8 text-blue-500" />
        <h1 className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-200">Live Code Previewer</h1>
      </div>
      <div className="flex items-center gap-3">
        <ActionButton onClick={onNewProject} tooltip="New Project">
          <FilePlus className="w-5 h-5" />
        </ActionButton>
        <ActionButton onClick={onSaveProject} tooltip="Save as HTML">
          <Save className="w-5 h-5" />
        </ActionButton>
        <ActionButton onClick={onDownloadZip} tooltip="Download as ZIP">
          <Download className="w-5 h-5" />
        </ActionButton>
        <ActionButton onClick={onToggleTheme} tooltip={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </ActionButton>
      </div>
    </header>
  );
};