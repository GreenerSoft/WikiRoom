/*! WikiRoom v1.0.0 | (c) GreenerSoft | https://greenersoft.fr | MIT License */


import {elements, createData, createEffect, untrack, map as List} from "Room";
import {WikipediaLanguages, loadWikipediaLanguage, saveWikipediaLanguage} from "WikiRoomLanguages";
import {AboutContent} from "WikiRoomAbout";
import {loadFavorites, saveFavorites, isFavorite, addFavorite, removeFavorite, FavoritesContent} from "WikiRoomFavorites";


const {div, nav, article, header, h1, h2, h3, a, input, button, p, aside, dialog, form, label, select, option} = elements();
const wikipediaLanguage = createData("fr");
const loading = createData(false);
const pages = createData([]);
const index = createData(0);
const worker = new Worker(JSON.parse(document.querySelector("script[type=importmap]").textContent).imports.WikiRoomWorker);

worker.addEventListener("message", e => {
	pages.push(...e.data);
	loading.value = false;
});

const DialogTitle = title => h3(
	title,
	button({onClick: e => e.target.closest("dialog").close(), title: "Fermer"}, "x")
);

const FavoritesDialog = () => dialog({class: "favorites"},
	DialogTitle("Favoris"),
	FavoritesContent()
);

const SettingsDialog = () => {
	const languageSelector = select({name: "language"}, Object.entries(WikipediaLanguages).map(([k, v]) => option({value: k, selected: k == wikipediaLanguage.value}, k.toUpperCase() + " - " + v)));
	return dialog(
		DialogTitle("Réglages"),
		form({method: "dialog", onSubmit: e => wikipediaLanguage.value = languageSelector.value},
			label("Langue des articles de Wikipédia : ", languageSelector),
			button("Enregistrer")
		)
	);
}

const AboutDialog = () => dialog({class: "about"},
	DialogTitle("À propos de WikiRoom"),
	AboutContent()
);

const Sidebar = () => {
	const favorites = FavoritesDialog();
	const settings = SettingsDialog();
	const about = AboutDialog();
	return [
		aside(
			button({type: "button", onClick: () => favorites.showModal(), title: "Favoris"}, "Favoris"),
			button({type: "button", onClick: () => settings.showModal(), title: "Réglages"}, "Réglages"),
			button({type: "button", onClick: () => about.showModal(), title: "À propos"}, "À propos")
		),
		favorites,
		settings,
		about
	];
};

const BounceLoader = () => div({class: () => `bounceLoader${loading.value && !pages.length ? "" : " hidden"}`}, div(), div(), div());

const WikiArticle = page => {
	const link = (content, href, dir) => a({href, dir, target: "_blank", rel: "noopener"}, content);
	const favour = e => e.target.checked ? addFavorite(page) : removeFavorite(page);
	const checked = () => isFavorite(page.pageId);
	const share = () => navigator.share ? navigator.share({
		url: pages[index].url,
		title: pages[index].title
	}).catch(e => e) : navigator.clipboard.writeText(pages[index].url);
	
	return article({style: {backgroundImage: `url(${page.image})`}},
		div({dir: page.direction},
			header(
				link(h2({lang: page.language}, page.title), page.url, page.direction),
				div(
					input({type: "checkbox", name: "favorite", title: "Favori", checked, onChange: favour}),
					button({type: "button", onClick: share, title: "Partager"}, "Partager")
				)
			),
			p({lang: page.language}, page.extract),
			link("Lire la suite sur Wikipédia →", page.url, "ltr")
		)
	);
};

export const WikiRoom = () => {
	const init = () => {
		pages.length = 0;
		index.value = 0;
		updateScroll();
	};
	const save = () => {
		saveWikipediaLanguage(wikipediaLanguage);
		saveFavorites();
	};
	const reset = () => !loading.value && confirm("Réinitialiser la liste des articles ?") && init();
	const onScroll = ({target}) => index.value = Math.round(target.scrollTop / target.clientHeight);
	const updateScroll = () => articles.scrollTop = index.value * articles.clientHeight;
	const articles = nav({onScroll, onResize: updateScroll});

	loadFavorites();
	loadWikipediaLanguage(wikipediaLanguage);
	createEffect(() => untrack(init), wikipediaLanguage);
	createEffect(() => {
		if (!loading.value && index.value > pages.length - 20) {
			loading.value = true;
			worker.postMessage(wikipediaLanguage.value);
		}
	});

	return div({class: "wikiRoom", onUnmount: save, onPageHide: save},
		BounceLoader(),
		List(articles, pages, WikiArticle),
		h1({onClick: reset, title: "Réinitialiser"}, "WikiRoom"),
		Sidebar()
	);
};
