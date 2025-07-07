"use client";
import { useState } from "react";

interface Task {
  id: string;
  description: string;
  notes: string;
  expectedTimeMinutes: number;
}

interface GoalForm {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  tasks: Task[];
}

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: GoalForm;
  onFormChange: (form: GoalForm) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function GoalModal({ isOpen, onClose, form, onFormChange, onSubmit }: GoalModalProps) {
  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      description: '',
      notes: '',
      expectedTimeMinutes: 30
    };
    onFormChange({
      ...form,
      tasks: [...form.tasks, newTask]
    });
  };

  const updateTask = (taskId: string, field: keyof Task, value: string | number) => {
    onFormChange({
      ...form,
      tasks: form.tasks.map(task =>
        task.id === taskId ? { ...task, [field]: value } : task
      )
    });
  };

  const removeTask = (taskId: string) => {
    onFormChange({
      ...form,
      tasks: form.tasks.filter(task => task.id !== taskId)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Create Goal</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => onFormChange({...form, title: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => onFormChange({...form, description: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800 h-20"
              placeholder="Describe your goal..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={form.priority}
              onChange={(e) => onFormChange({...form, priority: e.target.value as 'low' | 'medium' | 'high'})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-neutral-800"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Tasks Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium">Tasks</label>
              <button
                type="button"
                onClick={addTask}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors"
              >
                + Add Task
              </button>
            </div>
            
            {form.tasks.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No tasks added yet. Click "Add Task" to get started.</p>
            ) : (
              <div className="space-y-3">
                {form.tasks.map((task, index) => (
                  <div key={task.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Task {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeTask(task.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        title="Remove task"
                      >
                        ✕
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Description</label>
                        <input
                          type="text"
                          value={task.description}
                          onChange={(e) => updateTask(task.id, 'description', e.target.value)}
                          className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-neutral-800"
                          placeholder="Task description..."
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Notes</label>
                        <textarea
                          value={task.notes}
                          onChange={(e) => updateTask(task.id, 'notes', e.target.value)}
                          className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-neutral-800 h-16 resize-none"
                          placeholder="Additional notes..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Expected Time (minutes)</label>
                        <input
                          type="number"
                          min="1"
                          value={task.expectedTimeMinutes}
                          onChange={(e) => updateTask(task.id, 'expectedTimeMinutes', parseInt(e.target.value) || 1)}
                          className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-neutral-800"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 