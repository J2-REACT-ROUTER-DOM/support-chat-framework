export const formatDate = (date: Date) => {
  return date.toLocaleDateString("es-ES", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};