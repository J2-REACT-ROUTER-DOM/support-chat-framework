import { Button } from "~/components/ui/button";

import { LogOut, X } from "lucide-react";
import { Form, Link, Outlet, redirect, useLoaderData, useParams } from "react-router";
import { ContactList } from "~/chat/components/ContactList";
import { ContactInformationCard } from "~/chat/components/contact-information-card/ContactInformationCard";
import { getClient, getClients } from "~/fake/fake-data";
import type { Route } from "./+types/chat-layout";
import { getSession } from "~/sessions.server";
//!Loader se ejecuta de lado del servidor y solamente se ejecutan en rout modules que son todas rutas que se hacen referencia en el archivo routes.ts
//SI fuese clientLoader habria que especificar el nombre de la funcion clientLoader() y si usara params habria que especificar el tipado de params de tipo Route.LoaderArgs
export const loader = async ({ request,params }: Route.LoaderArgs) => {
  //!se valida si el usuario esta logueado buscando en la session el userId
  const session = await getSession(request.headers.get("Cookie"));

  // console.log(session.get("userId"));
  // console.log(session.get("token"));
  // console.log(session.get("name"));
  const {id:clientId}=params
  console.log("Desde chat-layout",{clientId})
  console.log(
    "Desde el servidor - ChatLayout",
    "Session: ",
    session.has("userId")
  );
  if (!session.has("userId")) {
    return redirect("/auth/login");
  }
  const userName = session.get("name");
  const clients = await getClients();
  //!SI tenemeos un ID desde la URL regresamos el client,clients y userName
  if(clientId){
    const client=await getClient(clientId)
    return {client,userName,clients}
  }

  //console.log({ clients });
  //!Si no tenemeos un ID desde la URL solamente regresamos el clients y userName
  //Incluimos el nombre del usuario en el loaderData para que se pueda usar en el componente ChatLayout
  return { clients, userName };
};

//!loaderData es el tipo de datos que se le pasa al componente, que es lo que devuelve la funcion loader()
//!ComponentProps es el tipo de props que se le pasa al componente
//{ loaderData }: Route.ComponentProps
//!Tambien se puede usar useLoaderData() como hook  para obtener los datos del loader y ya no es necesario el loaderData como parametro Props
export default function ChatLayout({ loaderData }: Route.ComponentProps) {
  //const { clients } = useLoaderData();
  const { clients, userName,client } = loaderData;
  
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/10">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-blue-500 text-white font-bold text-xs"></div>
            <Link to="/chat">
              <span className="font-semibold">{userName}</span>
            </Link>
          </div>
        </div>
        <ContactList clients={clients} />
        <div className="p-4 border-t">
          <Form method="post" action="/auth/logout">
            <Button variant="default" className="w-full text-center">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </Form>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b px-4 flex items-center justify-between">
            <div></div> {/* Empty div to maintain spacing */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Save conversation
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <Outlet />
        </div>

        {/* Right Panel - Contact Details */}
        <div className="w-80 border-l">
          <div className="h-14 border-b px-4 flex items-center">
            <h2 className="font-medium">Contact details</h2>
          </div>
          {/* COntact Informatio */}
          <ContactInformationCard />
        </div>
      </div>
    </div>
  );
}
