"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit3, Save, X, Plus } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // Create a new todo
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTask: Todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, newTask]);
      setNewTodo("");
    }
  };

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle completion status
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Start editing a todo
  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  // Save edited todo
  const saveEdit = (id: number) => {
    if (editText.trim() !== "") {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editText.trim() } : todo
        )
      );
    }
    setEditingId(null);
    setEditText("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Handle key press for adding todos
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // Handle key press for editing todos
  const handleEditKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter") {
      saveEdit(id);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Todo List App
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Stay organized and get things done
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">
              My Tasks
              {totalCount > 0 && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({completedCount}/{totalCount} completed)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Todo */}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={addTodo} className="px-4">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            {/* Todo List */}
            <div className="space-y-3">
              {todos.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No tasks yet!</p>
                  <p className="text-sm">
                    Add your first task above to get started.
                  </p>
                </div>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                      todo.completed
                        ? "bg-gray-50 border-gray-200"
                        : "bg-white border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {/* Checkbox */}
                    <Checkbox
                      id={`todo-${todo.id}`}
                      checked={todo.completed}
                      onCheckedChange={() => toggleComplete(todo.id)}
                    />

                    {/* Todo Text */}
                    <div className="flex-1">
                      {editingId === todo.id ? (
                        <Input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => handleEditKeyPress(e, todo.id)}
                          className="w-full"
                          autoFocus
                        />
                      ) : (
                        <label
                          htmlFor={`todo-${todo.id}`}
                          className={`cursor-pointer block ${
                            todo.completed
                              ? "line-through text-gray-500"
                              : "text-gray-900"
                          }`}
                        >
                          {todo.text}
                        </label>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {editingId === todo.id ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => saveEdit(todo.id)}
                            className="px-2"
                          >
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={cancelEdit}
                            className="px-2"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEdit(todo.id, todo.text)}
                            className="px-2"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteTodo(todo.id)}
                            className="px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
          <p className="text-sm">
            Built with React and shadcn/ui • Stay productive and organized
          </p>
          <p className="text-xs mt-2">
            {totalCount > 0 && (
              <>
                Total tasks: {totalCount} • Completed: {completedCount} •
                Remaining: {totalCount - completedCount}
              </>
            )}
          </p>
        </div>
      </footer>
    </div>
  );
}
