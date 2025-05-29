import type { Config } from "@react-router/dev/config";

// Generate 150 test routes with random names and ages
//[...Array(150)] es un array de 150 elementos undefined (150 veces) para que el map pueda iterar sobre cada elemento
const testingRoutes = [...Array(150)].map((_, i) => {
  const id = i + 1;
  const names = [
    "John",
    "Jane",
    "Bob",
    "Alice",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
  ];
  //Math.random() genera un número aleatorio entre 0 y 1 y se multiplica por la longitud del array names
  const randomName = names[Math.floor(Math.random() * names.length)];
  //Math.random() genera un número aleatorio entre 0 y 1 y lo multiplica por 80 y le suma 18
  const randomAge = Math.floor(Math.random() * 80) + 18; // Ages 18-97
  return `/auth/testing-args-page/${id}/${randomName}/${randomAge}`;
});

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  async prerender() {
    return [
      "/auth/login",
      "/auth/register",
      "/auth/testing",
      "/products/apple",
      "/products/banana",
      "/products/cherry",
      "/products/date",
      "/products/elderberry",
      "/products/fig",
      "/products/grape",
      "/products/honeydew",
      "/products/kiwi",
      "/products/lemon",
      "/products/mango",
      ...testingRoutes,
    ];
  },
} satisfies Config;
