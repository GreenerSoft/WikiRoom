/*! WikiRoomFavorites v1.0.0 | (c) GreenerSoft | https://greenersoft.fr | MIT License */


import {elements, createData, setData, getData, createEffect, untrack, map as List} from "Room";


const {input, ul, li, img, div, a, h4, p, button} = elements();

const favorites = createData([]);
const search = createData("");
const count = createData(0);
const nameFavorites = "Favourites";

const inportFavorites = () => input({type: "file", accept: "application/json", onChange: e => {
	try {
		e.target.files[0].text().then(text => favorites.push(...JSON.parse(text).filter(page =>
			page.title &&
			page.pageId &&
			page.language &&
			page.direction &&
			page.image &&
			page.url &&
			page.extract &&
			!isFavorite(page.pageId)
		)));
	} catch (error) {
		alert("Format non valide.");
	}
}}).click();

const exportFavorites = () => a({
	href: URL.createObjectURL(new Blob([JSON.stringify(getData(favorites), null, 2)])),
	download: "WikiRoom-Favoris.json"
}).click();

const normalize = (text, lang) => text.toLocaleLowerCase(lang).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const Article = page => {
	const searchIn = text => normalize(text, page.language).includes(search);
	const searchResult = () => (searchIn(page.title) || searchIn(page.extract)) ? (count.value++, "") : "hidden";
	return li({class: searchResult},
		img({src: page.image, loading: "lazy", alt: page.title}),
		div({lang: page.language, dir: page.direction},
			a({href: page.url, target: "_blank", rel: "noopener"}, h4(page.title)),
			p(page.extract)
		),
		button({type: "button", onClick: e => removeFavorite(page), title: "Supprimer"}, "Supprimer")
	);
}

export const loadFavorites = () => {
	try {
		setData(favorites, JSON.parse(localStorage.getItem(nameFavorites)) || favorites);
	} catch(e) {};
};

export const saveFavorites = () => {
	try {
		localStorage.setItem(nameFavorites, JSON.stringify(getData(favorites)));
	} catch(e) {}
};

export const isFavorite = pageId => favorites.find(f => f.pageId === pageId);

export const addFavorite = page => !isFavorite(page.id) && favorites.push(page);

export const removeFavorite = page => {
	let index = favorites.findIndex(f => f.pageId === page.pageId);
	index >= 0 && favorites.splice(index, 1);
};

export const FavoritesContent = () => {
	const onInput = e => search.value = normalize(e.target.value.trim());
	createEffect(() => untrack(() => count.value = 0), search);
	return [
		input({type: "search", name: "search", placeholder: "Chercher dans les favoris", onInput}),
		p(() => favorites.length ? count.value || !search.value ? "" : "Aucune correspondance." : "Aucun favori."),
		List(ul(), favorites, Article),
		button({type: "button", class: "import", onClick: inportFavorites, title: "Importer des favoris"}, "Importer"),
		button({type: "button", class: "export", onClick: exportFavorites, title: "Exporter les favoris"}, "Exporter")
	];
};
