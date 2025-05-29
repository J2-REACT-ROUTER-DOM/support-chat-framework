import {
  type RouteConfig,
  index,
  layout,
  route,
  prefix,
} from "@react-router/dev/routes";

export default [
  //Home
  index("routes/home.tsx"),
  //Auth: /auth/login, /auth/register

  ...prefix("/auth", [
    layout("layouts/auth-layouts.tsx", [
      //! Rutas hijas de auth-layouts.tsx
      route("login", "routes/auth/login-page.tsx"),
      route("register", "routes/auth/register-page.tsx"),
      route("testing", "routes/auth/testing-page.tsx"),
      route("testing-args-page/:id/:name/:age", "routes/auth/testing-args-page.tsx"),
      //actions
      route("logout", "auth/actions/logout.actions.ts"),
    ]),
  ]),

  //Chat: /chat /chat/ABC
  ...prefix("/chat", [
    layout("layouts/chat-layout.tsx", [
      //! Rutas hijas de chat-layout.tsx
      index("routes/chat/no-chat-selected.tsx"),
      route("client/:id", "routes/chat/client-chat-page.tsx"),
    ]),
  ]),

  //Products
  route("products/:name", "routes/product.tsx"),
  
] satisfies RouteConfig;
