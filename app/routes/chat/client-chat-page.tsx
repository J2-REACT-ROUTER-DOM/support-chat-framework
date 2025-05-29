import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Copy,
  Download,
  ThumbsUp,
  ThumbsDown,
  Send,
  MessageSquare,
} from "lucide-react";

import type { Route } from "./+types/client-chat-page";
import { sleep } from "~/lib/sleep";
import { formatDate } from "~/lib/date-formatter";
import { getClientMessages, sendMessage } from "~/fake/fake-data";
import { Form, type ShouldRevalidateFunctionArgs } from "react-router";

// interface Message {
//   role: "agent" | "user"
//   content: string
//   timestamp: string
// }
//!Despues de cada accio no se revalida la UI, hay que hacer reload del navegador para que aparezca el nuevo mensaje de chat ingresado
// export const shouldRevalidate = (arg: ShouldRevalidateFunctionArgs) => {
//   return false;
// };

//! Ejecutamos el loader al momento del SSR
export const loader = async ({ params }: Route.LoaderArgs) => {
  const { id: clientId } = params;
  //console.log({clientId})
  const messages = await getClientMessages(clientId);
  //console.log({messages})
  return { messages };
};

//!Creamos la accion para enviar el mensaje, esto se ejecuta al momento del posteo
//!Todas las acciones revalidan la UI, es decir, se ejecuta el loader y se actualiza la UI
export const action = async ({ request, params }: Route.ActionArgs) => {
  const formData = await request.formData();
  const message = formData.get("message")?.toString() ?? "";
  console.log({ message });
  const newMessage = await sendMessage({
    //! para evitar que el tipo de dato sea null undefined, lo convertimos a string
    content: message,
    clientId: params.id,
    sender: "agent",
    createdAt: new Date(),
  });
  return null;
};

export default function ChatInterface({ loaderData }: Route.ComponentProps) {
  const { messages = [] } = loaderData;

  const [input, setInput] = useState("");
  //const [messages] = useState<Message[]>(loaderData.messages)
  // const [messages] = useState<Message[]>([
  //   {
  //     role: "agent",
  //     content: "Hello, I am a generative AI agent. How may I assist you today?",
  //     timestamp: "4:08:28 PM",
  //   },
  //   {
  //     role: "user",
  //     content: "Hi, I'd like to check my bill.",
  //     timestamp: "4:08:37 PM",
  //   },
  //   {
  //     role: "agent",
  //     content:
  //       "Please hold for a second.\n\nOk, I can help you with that\n\nI'm pulling up your current bill information\n\nYour current bill is $150, and it is due on August 31, 2024.\n\nIf you need more details, feel free to ask!",
  //     timestamp: "4:08:37 PM",
  //   },
  // ])
  //console.log({messages})
  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col justify-center items-center h-[400px] gap-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">No hay mensajes</h3>
                <p className="text-sm text-muted-foreground">
                  Este chat está vacío. ¡Sé el primero en enviar un mensaje!
                </p>
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <div key={index} className="w-full">
              {message.sender === "client" ? (
                // Agent message - left aligned
                <div className="flex gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">NexTalk</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - right aligned
                <div className="flex flex-col items-end">
                  <div className="text-right mb-1">
                    <span className="text-sm font-medium mr-2">G5</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                  <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <Form method="post" className="flex items-center gap-2">
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[44px] h-[44px] resize-none py-3"
            name="message"
          />
          <Button
            className="h-[44px] px-4 flex items-center gap-2"
            type="submit"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </Form>
      </div>
    </div>
  );
}
