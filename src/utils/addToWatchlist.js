export const addToFavorites = (movieId) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(movieId)) {
        favorites = favorites.filter(id => id !== movieId);
    } else {
        favorites.push(movieId);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    return favorites.includes(movieId);
};