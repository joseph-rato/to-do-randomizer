"use client";

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
}

export default function EventDetails({ item, isExpanded, onToggle }: EventDetailsProps) {
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
            {item.time && (
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Time:</span>
                <p className="text-sm">{item.time}</p>
              </div>
            )}
            {item.priority && (
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Priority:</span>
                <p className="text-sm capitalize">{item.priority}</p>
              </div>
            )}
            {item.description && (
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Description:</span>
                <p className="text-sm">{item.description}</p>
              </div>
            )}
            {item.notes && (
              <div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Notes:</span>
                <p className="text-sm">{item.notes}</p>
              </div>
            )}
            {!item.description && !item.notes && !item.time && !item.priority && (
              <p className="text-sm text-gray-400">No additional details available.</p>
            )}
          </div>
        </div>
      )}
    </li>
  );
} 