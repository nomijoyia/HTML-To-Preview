import React, { useState, useEffect, useCallback } from 'react';
import { EditorPanel } from './components/EditorPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { Header } from './components/Header';
import { CommandPalette } from './components/CommandPalette';
import { useResizable } from './hooks/useResizable';
import { useDebounce } from './hooks/useDebounce';
import { DEFAULT_HTML, DEFAULT_CSS, DEFAULT_JS, DEVICES } from './constants';
import { EditorType, Device, Command } from './types';
import { generateHtmlFile, generateZip } from './utils/fileUtils';
import {
  Braces, Code, Desktop, Download, FileJson, FilePlus, Maximize, Minimize, Mobile, Moon, RefreshCw,
  Save, Sun, Tablet, Trash2
} from './components/Icons';

const App: React.FC = () => {
  const [htmlCode, setHtmlCode] = useState<string>(DEFAULT_HTML);
  const [cssCode, setCssCode] = useState<string>(DEFAULT_CSS);
  const [jsCode, setJsCode] = useState<string>(DEFAULT_JS);
  const [srcDoc, setSrcDoc] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [device, setDevice] = useState<Device>(DEVICES[0]);
  const [activeTab, setActiveTab] = useState<EditorType>(EditorType.HTML);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  const debouncedHtml = useDebounce(htmlCode, 500);
  const debouncedCss = useDebounce(cssCode, 500);
  const debouncedJs = useDebounce(jsCode, 500);
  
  const { width, isResizing, startResizing } = useResizable(window.innerWidth / 2);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${debouncedHtml}</body>
          <style>${debouncedCss}</style>
          <script>${debouncedJs}<\/script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [debouncedHtml, debouncedCss, debouncedJs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  const handleCodeChange = useCallback((editor: EditorType, value: string) => {
    switch (editor) {
      case EditorType.HTML:
        setHtmlCode(value);
        break;
      case EditorType.CSS:
        setCssCode(value);
        break;
      case EditorType.JS:
        setJsCode(value);
        break;
    }
  }, []);

  const handleClearCodeForEditor = useCallback((editor: EditorType) => {
    const confirmationMessage = `Are you sure you want to clear the code in the ${editor.toUpperCase()} editor? This action cannot be undone.`;
    if (window.confirm(confirmationMessage)) {
        handleCodeChange(editor, '');
    }
  }, [handleCodeChange]);

  const handleRefresh = useCallback(() => {
    const newSrcDoc = `
      <html>
        <body>${htmlCode}</body>
        <style>${cssCode}</style>
        <script>${jsCode}<\/script>
      </html>
    `;
    setSrcDoc('');
    setTimeout(() => setSrcDoc(newSrcDoc), 0);
  }, [htmlCode, cssCode, jsCode]);

  const handleNewProject = useCallback(() => {
    setHtmlCode('');
    setCssCode('');
    setJsCode('');
  }, []);

  const handleSaveProject = useCallback(() => {
    generateHtmlFile(htmlCode, cssCode, jsCode);
  }, [htmlCode, cssCode, jsCode]);

  const handleDownloadZip = useCallback(() => {
    generateZip(htmlCode, cssCode, jsCode);
  }, [htmlCode, cssCode, jsCode]);

  const commands: Command[] = [
    { id: 'toggle-theme', name: 'Toggle Theme', category: 'Appearance', action: () => setIsDarkMode(!isDarkMode), icon: isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" /> },
    !isDarkMode && { id: 'dark-mode', name: 'Switch to Dark Mode', category: 'Appearance', action: () => setIsDarkMode(true), icon: <Moon className="w-4 h-4" /> },
    isDarkMode && { id: 'light-mode', name: 'Switch to Light Mode', category: 'Appearance', action: () => setIsDarkMode(false), icon: <Sun className="w-4 h-4" /> },
    { id: 'switch-html', name: 'Switch to HTML Editor', category: 'Editor', action: () => setActiveTab(EditorType.HTML), icon: <Code className="w-4 h-4" /> },
    { id: 'switch-css', name: 'Switch to CSS Editor', category: 'Editor', action: () => setActiveTab(EditorType.CSS), icon: <Braces className="w-4 h-4" /> },
    { id: 'switch-js', name: 'Switch to JS Editor', category: 'Editor', action: () => setActiveTab(EditorType.JS), icon: <FileJson className="w-4 h-4" /> },
    { id: 'clear-html', name: 'Clear HTML Code', category: 'Editor', action: () => handleClearCodeForEditor(EditorType.HTML), icon: <Trash2 className="w-4 h-4" /> },
    { id: 'clear-css', name: 'Clear CSS Code', category: 'Editor', action: () => handleClearCodeForEditor(EditorType.CSS), icon: <Trash2 className="w-4 h-4" /> },
    { id: 'clear-js', name: 'Clear JS Code', category: 'Editor', action: () => handleClearCodeForEditor(EditorType.JS), icon: <Trash2 className="w-4 h-4" /> },
    { id: 'refresh-preview', name: 'Refresh Preview', category: 'Preview', action: handleRefresh, icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'toggle-fullscreen', name: 'Toggle Fullscreen', category: 'Preview', action: () => setIsFullscreen(!isFullscreen), icon: isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" /> },
    { id: 'view-desktop', name: 'Switch to Desktop View', category: 'Preview', action: () => setDevice(DEVICES[0]), icon: <Desktop className="w-4 h-4" /> },
    { id: 'view-tablet', name: 'Switch to Tablet View', category: 'Preview', action: () => setDevice(DEVICES[1]), icon: <Tablet className="w-4 h-4" /> },
    { id: 'view-mobile', name: 'Switch to Mobile View', category: 'Preview', action: () => setDevice(DEVICES[2]), icon: <Mobile className="w-4 h-4" /> },
    { id: 'new-project', name: 'New Project', category: 'Project', action: handleNewProject, icon: <FilePlus className="w-4 h-4" /> },
    { id: 'save-html', name: 'Save as HTML', category: 'Project', action: handleSaveProject, icon: <Save className="w-4 h-4" /> },
    { id: 'download-zip', name: 'Download as ZIP', category: 'Project', action: handleDownloadZip, icon: <Download className="w-4 h-4" /> },
  ].filter(Boolean) as Command[];


  return (
    <div className={`flex flex-col h-screen font-sans ${isDarkMode ? 'dark bg-slate-900 text-slate-300' : 'bg-white text-slate-800'}`}>
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        commands={commands}
      />
      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onNewProject={handleNewProject}
        onSaveProject={handleSaveProject}
        onDownloadZip={handleDownloadZip}
      />
      <main className="flex flex-1 overflow-hidden">
        {!isFullscreen && (
            <>
                <div style={{ width: `${width}px` }} className="h-full flex-shrink-0">
                  <EditorPanel
                    htmlCode={htmlCode}
                    cssCode={cssCode}
                    jsCode={jsCode}
                    onCodeChange={handleCodeChange}
                    isDarkMode={isDarkMode}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                </div>
                <div 
                  className="w-1.5 h-full cursor-col-resize bg-slate-200 dark:bg-slate-800 hover:bg-blue-500 transition-colors duration-200"
                  onMouseDown={startResizing}
                ></div>
            </>
        )}
        <div className={isFullscreen ? "fixed inset-0 z-50 w-full h-full" : "flex-1 h-full"}>
          <PreviewPanel
            srcDoc={srcDoc}
            onRefresh={handleRefresh}
            isResizing={isResizing}
            isFullscreen={isFullscreen}
            onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
            device={device}
            onDeviceChange={setDevice}
          />
        </div>
      </main>
    </div>
  );
};

export default App;