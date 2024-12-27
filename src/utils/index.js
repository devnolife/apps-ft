
export function formatName(name) {
  const words = name.split(' ');
  return words.length <= 3 ? name : `${words.slice(0, 3).join(' ')} ${words.slice(3).map(word => word[0].toUpperCase()).join('')}`;
};
