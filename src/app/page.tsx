"use client";

// TODO: Ensure the file exists at ../components/todo-list.tsx or update the import path accordingly
import { TodoList } from "@/components/todo-list";

export default function Home() {
  return (
    <div className="font-sans">
      <TodoList />
    </div>
  );
}
