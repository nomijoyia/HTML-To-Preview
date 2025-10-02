import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Command } from '../types';
import { Search } from './Icons';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  commands: Command[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, commands }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cmd.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cmd.keywords || []).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearchTerm('');
    }
  }, [isOpen]);
  
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm, commands]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [filteredCommands, selectedIndex, onClose]);

  useEffect(() => {
    const selectedItem = listRef.current?.querySelector(`[data-index='${selectedIndex}']`);
    selectedItem?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (!isOpen) return null;

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    (acc[cmd.category] = acc[cmd.category] || []).push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  let globalIndex = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div
        className="relative z-10 w-full max-w-xl bg-white dark:bg-slate-800 rounded-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
        onMouseDown={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 p-3 border-b border-slate-200 dark:border-slate-700">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search commands..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
            aria-label="Search commands"
            aria-autocomplete="list"
          />
           <div className="text-xs text-slate-400 border border-slate-300 dark:border-slate-600 rounded-md px-1.5 py-0.5">Ctrl K</div>
        </div>
        <ul ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
          {Object.keys(groupedCommands).length > 0 ? (
            Object.entries(groupedCommands).map(([category, cmds]) => (
              <li key={category}>
                <div className="px-2 pt-2 pb-1 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{category}</div>
                <ul>
                  {cmds.map((cmd) => {
                    globalIndex++;
                    const currentIndex = globalIndex;
                    return (
                        <li
                            key={cmd.id}
                            onClick={() => {
                                cmd.action();
                                onClose();
                            }}
                            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer text-sm ${
                                selectedIndex === currentIndex
                                ? 'bg-blue-500 text-white'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                            data-index={currentIndex}
                            role="option"
                            aria-selected={selectedIndex === currentIndex}
                        >
                            <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">{cmd.icon}</span>
                            <span className="flex-grow">{cmd.name}</span>
                        </li>
                    );
                })}
                </ul>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-sm text-slate-500">No commands found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};
