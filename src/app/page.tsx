import { TodoCard } from "@/components/ui/to-do-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <TodoCard />
    </main>
  );
}