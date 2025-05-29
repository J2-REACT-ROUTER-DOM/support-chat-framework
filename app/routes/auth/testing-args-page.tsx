import { Link } from "react-router";
import type { Route } from "./+types/testing-args-page";
import { sleep } from "~/lib/sleep";

export function meta() {
  return [
    { title: "Very cool app" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}

export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}

export function links() {
  return [
    // {
    //   rel: "icon",
    //   href: "/favicon.png",
    //   type: "image/png",
    // },
    // {
    //   rel: "stylesheet",
    //   href: "https://example.com/some/styles.css",
    // },
    // {
    //   rel: "preload",
    //   href: "/images/banner.jpg",
    //   as: "image",
    // },
  ];
}

//! Aqui tambien podemos tener acceso a los params de la ruta
export async function loader({params}:Route.LoaderArgs) {
  console.log({params});
  return {
    message: "Hello desde Loader",
  };
}


//! Aqui tambien podemos tener acceso a los params de la ruta
export async function clientLoader({params}:Route.ClientLoaderArgs) {
  
  console.log({params});
  await sleep(3000);
  return {
    message: "Hello desde Client Loader",
  };
}

export function HydrateFallback() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      <h2 className="text-2xl font-semibold mt-4 text-foreground">Loading Game...</h2>
      <p className="text-muted-foreground mt-2">Please wait while we prepare your experience</p>
    </div>
  );
}

clientLoader.hydrate=true as const;



export default function MyRouteComponent({
  loaderData,
  actionData,
  params,
  matches,
}: Route.ComponentProps) {
  const {id, name, age} = params;
  console.log("Componente creado");
  return (
    <div>
      <h1 className="text-2xl font-bold">Name: {name}</h1>
      <h1 className="text-2xl font-bold">Age: {age}</h1>
      <h1 className="text-2xl font-bold">Id: {id}</h1>
      <h1 className="text-2xl font-bold">Nuestro Testing Args Page</h1>
      <p>Loader Data: {JSON.stringify(loaderData)}</p>
      <p>Action Data: {JSON.stringify(actionData)}</p>
      <p>Route Parameters: {JSON.stringify(params)}</p>
      <p>Matched Routes: {JSON.stringify(matches)}</p>
      <Link to="/auth/testing" className="underline underline-offset-4">Testing Page</Link>
    </div>
  );
}