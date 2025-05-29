import type { Route } from "./+types/home";
import { Navigate, redirect } from "react-router";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
//! Hacemos la redireccion desde el server
export async function loader() {
  console.log("se redirecciona desde el server");
  return redirect("/chat");
}

export default function Home() {
  //! se redirecciona desde JS y si se renderiza el componente.
  return <Navigate to="/chat" />;
  //return <Welcome />;
}
