const STORAGE_KEY = 'titlebolt_favorites';

export const saveFavorite = (title) => {
  const favorites = getFavorites();
  if (!favorites.includes(title)) {
    favorites.push(title);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (title) => {
  const favorites = getFavorites().filter(t => t !== title);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
};

export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const isFavorite = (title) => {
  return getFavorites().includes(title);
};
