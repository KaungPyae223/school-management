export const generateImageFallBack = (name: string) => {
  const nameParts = name.split(" ");

  if (nameParts.length == 0) return name.slice(0, 2).toUpperCase();

  const firstInitial = nameParts[0].charAt(0);
  const secondInitial = nameParts[1]?.charAt(0);

  return (firstInitial + secondInitial).toUpperCase();
};
