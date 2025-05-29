import { useLoaderData, useNavigation, useParams } from "react-router";
import { ContactInformation } from "./ContactInformation";
import { ContactInformationSkeleton } from "./ContactInformationSkeleton";
import { NoContactSelected } from "./NoContactSelected";
import type { Client } from "~/chat/interfaces/chat-interfaces";

export const ContactInformationCard = () => {
  const { id: clientId } = useParams();
  //!Tenemos acceso al loader data desde el componente padre ChatLayout, no es recomendable este enfoque porque el padre en este caso ChatLayout se puede mover de lugar (poco probable pero posible)
  const {clients=[],client}=useLoaderData()
  //!Tenemos acceso al estado de la navegacion desde el componente padre ChatLayout (en que momento estamos cambiando de pagina)
  const {state}=useNavigation()
  const isPending=state==="loading"
  //console.log({clientId,clients,isPending})

  if(client){
    return <ContactInformation client={client} />
  }

  // Se evalua el estado de la navegacion y se muestra el skeleton mientras se carga el cliente
  if (isPending) {
    return <ContactInformationSkeleton />
  }

  if (!clientId) {
    return <NoContactSelected />
  }
  //!Selecciono el cliente que coincide con el clientId que viene de la url
  //!Ya no es necesario buscar el cliente en el array de clientes porque ya lo tenemos en  las props
  //const clientData:Client=clients.find((client:Client)=>client.id===clientId)
  //return <ContactInformation client={client} />
};
