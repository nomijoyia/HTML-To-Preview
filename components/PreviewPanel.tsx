import React from 'react';
import { RefreshCw, Maximize, Minimize, Desktop, Tablet, Mobile } from './Icons';
import { DEVICES } from '../constants';
import { Device } from '../types';

interface PreviewPanelProps {
  srcDoc: string;
  isResizing: boolean;
  onRefresh: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  device: Device;
  onDeviceChange: (device: Device) => void;
}

const deviceIcons = {
    Desktop: <Desktop className="w-4 h-4" />,
    Tablet: <Tablet className="w-4 h-4" />,
    Mobile: <Mobile className="w-4 h-4" />,
};

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ srcDoc, onRefresh, isResizing, isFullscreen, onToggleFullscreen, device, onDeviceChange }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      <div className="flex items-center justify-between p-1 border-b bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 gap-2 flex-shrink-0">
        <div className="flex items-center gap-1">
          {DEVICES.map((d) => (
            <button
              key={d.name}
              onClick={() => onDeviceChange(d)}
              className={`p-1.5 rounded-md transition-colors ${
                device.name === d.name
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
              title={`${d.name} View (${d.width})`}
            >
              {deviceIcons[d.name as keyof typeof deviceIcons]}
            </button>
          ))}
        </div>
        <div className='flex items-center gap-2'>
            <button onClick={onRefresh} className="p-1.5 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" title="Refresh Preview">
                <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={onToggleFullscreen} className="p-1.5 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}>
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
        </div>
      </div>
      <div className="flex-1 relative bg-slate-200 dark:bg-slate-900 flex justify-center items-center p-4 overflow-auto">
        {isResizing && <div className="absolute inset-0 z-10 bg-transparent"></div>}
        <div
          className="bg-white shadow-2xl transition-all duration-300 ease-in-out"
          style={{ width: device.width, height: device.height }}
        >
            <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
            />
        </div>
      </div>
    </div>
  );
};