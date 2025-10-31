'use client'
import React, { useEffect, useState } from "react";
import { Pencil, Trash2, X, Check, Plus } from 'lucide-react';
import Modal from "./modal";
import { Button } from "./button";

const completedTasks = [
  { id: 1, text: "Prepare documentation for API v2", done: true },
  { id: 2, text: "Fix broken links in the dashboard", done: true },
  { id: 3, text: "Update dark mode color palette", done: true },
  { id: 4, text: "Write unit tests for form validation", done: true },
  { id: 5, text: "Optimize bundle size for production", done: true },
  { id: 6, text: "Clean up unused React hooks", done: true },
];

const inCompleteTasks = [
  { id: 7, text: "Design landing page wireframe", done: false },
  { id: 8, text: "Add pagination to product list", done: false },
  { id: 9, text: "Implement lazy loading for images", done: false },
  { id: 10, text: "Create 404 and 500 error pages", done: false },
  { id: 11, text: "Setup GitHub Actions for CI/CD", done: false },
  { id: 12, text: "Review accessibility for all pages", done: false },
];

const inProgressTasks = [
  { id: 13, text: "Integrate Stripe payment gateway", done: false },
  { id: 14, text: "Implement search bar with debounce", done: false },
  { id: 15, text: "Update dependencies to latest versions", done: false },
  { id: 16, text: "Create reusable table component", done: false },
  { id: 17, text: "Write documentation for API endpoints", done: false },
  { id: 18, text: "Add dark/light theme toggle feature", done: false },
];

const allTasks = [
  ...completedTasks,
  ...inCompleteTasks,
  ...inProgressTasks
];

export function TodoCard() {
  const [items, setItems] = useState(allTasks);
  const [dateInfo, setDateInfo] = useState({ date: "", time: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    let taskSource = allTasks;
    if (newFilter === "done") {
      taskSource = completedTasks;
    } else if (newFilter === "todo") {
      taskSource = inCompleteTasks;
    } else if (newFilter === "progress") {
      taskSource = inProgressTasks;
    }
    setItems(taskSource);
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const date = now.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const time = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setDateInfo({ date, time });
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleItem = (id: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  };

  const handleAddTask = () => {
    closeModal();
  };
  const handleStartEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };
  const handleConfirmEdit = () => { };
  const handleDeleteTask = () => { };

  const Header = (
    <div
      className={`flex items-center justify-between px-4 py-3 bg-gradient-to-b from-yellow-300 to-yellow-200`}
    >
      <div className="flex items-center space-x-3">
        <span className="text-sm font-semibold text-gray-900">{dateInfo.date}</span>
        <span className="bg-black/10 text-gray-800 text-xs font-medium px-2 py-1 rounded-md">
          {dateInfo.time}
        </span>
      </div>
    </div>
  );

  return (
    <div
      className={`w-[380px] rounded-2xl shadow-lg border overflow-hidden bg-white transition-all duration-500 border-slate-100`}
    >
      {Header}

      <div
        className={`relative p-5 bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:10px_10px]`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Things to do today
          </h3>
          <button onClick={openModal} className="text-gray-600 hover:text-gray-900">
            <Plus size={20} />
          </button>
        </div>

        <div className="flex justify-center items-center space-x-2 my-4">
          <button onClick={() => handleFilterChange("all")} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === "all" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>All</button>
          <button onClick={() => handleFilterChange("done")} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === "done" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>Done</button>
          <button onClick={() => handleFilterChange("todo")} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === "todo" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>To Do</button>
          <button onClick={() => handleFilterChange("progress")} className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === "progress" ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}>Progress</button>
        </div>

        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className={`group flex items-center justify-between gap-3 px-2 py-1 rounded-lg transition ${item.done ? "bg-slate-100" : ""}`}>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center justify-center w-6 h-6">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleItem(item.id)}
                    className="peer appearance-none absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <span
                    className={`flex items-center justify-center w-5 h-5 rounded-md border transition-all duration-200 ease-out transform ${item.done
                      ? "bg-gray-900 border-gray-900 scale-95"
                      : "border-gray-300 bg-white scale-100"
                      }`}
                  >
                    <svg
                      className={`w-3 h-3 text-white transition-opacity duration-200 ${item.done ? "opacity-100" : "opacity-0"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 12 9"
                    >
                      <path d="M1 4.2L4 7L11 1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </label>

                {editingId === item.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="text-sm bg-transparent focus:outline-none text-gray-900"
                  />
                ) : (
                  <span
                    className={`text-sm transition-all duration-200 ${item.done ? "font-semibold text-gray-900 translate-x-[2px]" : "text-gray-900"}`}>
                    {item.text}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {editingId === item.id ? (
                  <>
                    <button onClick={handleConfirmEdit} className="text-gray-500 hover:text-gray-900">
                      <Check size={16} />
                    </button>
                    <button onClick={handleCancelEdit} className="text-gray-500 hover:text-gray-900">
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <div className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <button onClick={() => handleStartEdit(item.id, item.text)} className="text-gray-500 hover:text-gray-900">
                      <Pencil size={16} />
                    </button>
                    <button onClick={handleDeleteTask} className="text-gray-500 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">Add New Task</h2>
          <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter your task..."
          />
          <div className="flex justify-end space-x-2">
            <Button onClick={closeModal} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddTask}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
