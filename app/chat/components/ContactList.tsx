import React from "react";
import { NavLink, useParams } from "react-router";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import type { Client } from "../interfaces/chat-interfaces";
interface Props {
  clients: Client[];
}
export const ContactList = ({ clients }: Props) => {
  const { id: clientId } = useParams();
  return (
    <ScrollArea className="h-[calc(100vh-120px)]">
      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="px-2 text-sm font-semibold">Contacts</h3>
          <div className="space-y-1">
            {clients.map((client) => (
              <NavLink
                key={client.id}
                to={`/chat/client/${client.id}`}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "w-full my-2 justify-start flex items-center gap-2 bg-black text-foreground transition-colors duration-200 rounded-2xl"
                    : isPending
                    ? "w-full my-2 justify-start flex items-center gap-2 bg-primary/10 text-foreground transition-colors duration-200 rounded-2xl"
                    : "w-full my-2 justify-start flex items-center gap-2 text-muted-foreground"
                }
              >
                <div className={clientId === client.id ? "h-6 w-6 rounded-full bg-white mr-2 flex-shrink-0 flex items-center justify-center text-black text-xs font-bold" : "h-6 w-6 rounded-full bg-gray-300 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs"}>
                  {client.name.charAt(0).toUpperCase() +
                    client.name.charAt(1).toUpperCase()}
                </div>
                {/* <span className="text-gray-400 text-sm font-medium">{client.name}</span> */}
                <span
                  className={
                    clientId === client.id
                      ? "text-white"
                      : "text-muted-foreground"
                  }
                >
                  {client.name}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t mt-4">
          <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              TM
            </div>
            Thomas Miller
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-red-500 mr-2 flex-shrink-0 flex items-center justify-center text-white text-xs">
              SB
            </div>
            Sarah Brown
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};
