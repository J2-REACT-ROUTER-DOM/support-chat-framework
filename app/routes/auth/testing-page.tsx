import { sleep } from "~/lib/sleep";
import type { Route } from "./+types/testing-page";
import { Form, NavLink, useNavigation } from "react-router";
//!Se ejecuta en el server
export async function action({ request }: Route.ActionArgs) {
  await sleep(1000);
  const data = await request.formData();
  const name = data.get("name");
  const allData = Object.fromEntries(data);
  console.log("server side - action");
  console.log({ name, allData });
  return { ok: true, message: "Todo bien", allData };
}

//!Se ejecuta en el cliente y la function action() ya no se ejecuta
export async function clientAction({
  serverAction,
  request,
}: Route.ClientActionArgs) {
  await sleep(1000);
  //! clonamos el formData porque ya se leyo y consumio en el server action
  const formData = await request.clone().formData();
  const allData = Object.fromEntries(formData);
  //Manda a llamar al metodo action() del server
  const data = await serverAction();
  return { message: "Se ejecuta el clientAction", data, allData };
}

//! Se ejecutan ambas funciones loader y clientLoader una en el server y otra en el cliente
//no usamos parms pero lo declaramos para que el tipo de dato sea correcto
export async function loader() {
  console.log("Hola Mundo desde el loader - Server");
  return { message: "Hola Mundo desde el loader - Server" };
}

//! Desde un clientLoader se puede llamar a un Server loader
export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  console.log("Hola Mundo desde el clientLoader - Client");

  // call the server loader
  const serverData = await serverLoader();

  return {
    message: "Hola Mundo desde el clientLoader - Client",
    serverData: serverData,
  };
}

export default function TestingPage({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  //en actionData se puede acceder a los datos del action
  const navigation = useNavigation();
  //Si estamos haciendo el posteo
  const isPosting = navigation.state === "submitting";
  return (
    <div>
      <h1 className="text-2xl font-bold">Testing Page</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      {/* Esta linea da problemas con la hidratazion */}
      {/* <p>Matched Routes: {JSON.stringify(matches)}</p> */}
      
      <NavLink
        to="/auth/testing-args-page/ABC/juan/20"
        className={({ isPending }) =>
          isPending
            ? "text-red-500 underline text-2xl"
            : "text-blue-500 underline text-2xl"
        }
      >
        Testing Args{" "}
      </NavLink>
      <Form className="mt-2 flex gap-2" method="post">
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="name"
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          name="age"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md p-2 disabled:opacity-50"
          disabled={isPosting}
        >
          {isPosting ? "Submitting..." : "Submit"}
        </button>
        
      </Form>
    </div>
  );
}
