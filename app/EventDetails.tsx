"use client";
import { useState } from "react";

interface EventItem {
  id: number;
  date: string;
  title: string;
  type: string;
  description?: string;
  notes?: string;
  time?: string;
  priority?: string;
}

interface EventDetailsProps {
  item: EventItem;
  isExpanded: boolean;
  onToggle: () => void;
  onUpdate?: (updatedItem: EventItem) => void;
}

export default function EventDetails({ item, isExpanded, onToggle, onUpdate }: EventDetailsProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  const handleFieldClick = (fieldName: string, currentValue: string) => {
    setEditingField(fieldName);
    setEditValues({ ...editValues, [fieldName]: currentValue });
  };

  const handleSave = (fieldName: string) => {
    if (onUpdate && editValues[fieldName] !== undefined) {
      const updatedItem = { ...item, [fieldName]: editValues[fieldName] } as EventItem;
      onUpdate(updatedItem);
    }
    setEditingField(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent, fieldName: string) => {
    if (e.key === 'Enter') {
      handleSave(fieldName);
    } else if (e.key === 'Escape') {
      setEditingField(null);
    }
  };

  const renderEditableField = (fieldName: string, label: string, value: string, type: 'text' | 'textarea' | 'select' = 'text') => {
    const isEditing = editingField === fieldName;
    const currentValue = editValues[fieldName] || value;

    if (isEditing) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}:</span>
          <div className="flex-1 flex items-center gap-2">
            {type === 'textarea' ? (
              <textarea
                value={currentValue}
                onChange={(e) => setEditValues({ ...editValues, [fieldName]: e.target.value })}
                onKeyDown={(e) => handleKeyPress(e, fieldName)}
                className="flex-1 p-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-neutral-800 resize-none"
                rows={2}
                autoFocus
              />
            ) : type === 'select' ? (
              <select
                value={currentValue}
                onChange={(e) => setEditValues({ ...editValues, [fieldName]: e.target.value })}
                onKeyDown={(e) => handleKeyPress(e, fieldName)}
                className="flex-1 p-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-neutral-800"
                autoFocus
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            ) : (
              <input
                type={fieldName === 'time' ? 'time' : 'text'}
                value={currentValue}
                onChange={(e) => setEditValues({ ...editValues, [fieldName]: e.target.value })}
                onKeyDown={(e) => handleKeyPress(e, fieldName)}
                className="flex-1 p-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-neutral-800"
                autoFocus
              />
            )}
            <button
              onClick={() => handleSave(fieldName)}
              className="p-1 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              title="Save"
            >
              ✓
            </button>
            <button
              onClick={() => setEditingField(null)}
              className="p-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              title="Cancel"
            >
              ✕
            </button>
          </div>
        </div>
      );
    }

    return (
      <div 
        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded transition-colors"
        onClick={() => handleFieldClick(fieldName, value)}
      >
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}:</span>
        <p className="text-sm">{value}</p>
      </div>
    );
  };

  return (
    <li className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
      >
        <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${item.type === 'appointment' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
        <div className="flex-1">
          <span className="font-medium">{item.title}</span>
          <span className="text-xs text-gray-400 ml-2">({item.type})</span>
        </div>
        <span className="text-gray-400 text-sm">
          {isExpanded ? '−' : '+'}
        </span>
      </button>
      
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="pt-3 space-y-2">
            {item.time && renderEditableField('time', 'Time', item.time)}
            {item.priority && renderEditableField('priority', 'Priority', item.priority, 'select')}
            {item.description && renderEditableField('description', 'Description', item.description, 'textarea')}
            {item.notes && renderEditableField('notes', 'Notes', item.notes, 'textarea')}
            {!item.description && !item.notes && !item.time && !item.priority && (
              <p className="text-sm text-gray-400">No additional details available.</p>
            )}
          </div>
        </div>
      )}
    </li>
  );
} 