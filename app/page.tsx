import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  // Si hay un usuario autenticado, redirigir al dashboard
  if (user) {
    redirect("/dashboard");
  }

  // Si no hay usuario, redirigir al sign-in
  redirect("/sign-in");
}
