export enum EditorType {
  HTML = 'html',
  CSS = 'css',
  JS = 'javascript',
}

export interface Device {
  name: string;
  width: string;
  height: string;
}

export interface Command {
  id: string;
  name: string;
  category: string;
  action: () => void;
  icon: React.ReactNode;
  keywords?: string[];
}

// Add JSZip to the window object for CDN usage
declare global {
  interface Window {
    JSZip: any;
  }
}