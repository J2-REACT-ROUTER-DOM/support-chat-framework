//Accion de logout
import { redirect } from "react-router";
import type { Route } from "../../routes/auth/+types/logout.actions";
import { destroySession, getSession } from "~/sessions.server";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
