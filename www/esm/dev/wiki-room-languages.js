/*! WikiRoomLanguages v1.1.0 | (c) GreenerSoft | https://greenersoft.fr | MIT License */


import {getData, setData} from "Room";


const nameWikipediaLanguage = "WikipediaLanguage";

export const WikipediaLanguages = {
	ar: "Arabe",
	bg: "Bulgare",
	cs: "Tchèque",
	da: "Danois",
	de: "Allemand",
	el: "Grec",
	en: "Anglais",
	es: "Espagnol",
	et: "Estonien",
	fa: "Persan",
	fi: "Finnois",
	fr: "Français",
	he: "Hébreu",
	hi: "Hindi",
	hr: "Croate",
	hu: "Hongrois",
	hy: "Aménien",
	id: "Indonésien",
	is: "Islandais",
	it: "Italien",
	ja: "Japonais",
	ko: "Coréen",
	la: "Latin",
	lt: "Lituanien",
	lv: "Letton",
	ms: "Malais",
	my: "Brirman",
	nl: "Néerlandais",
	nn: "Norvégien nynorsk",
	no: "Norvégien bokmål",
	pl: "Polonais",
	pt: "Portugais",
	ro: "Roumain",
	ru: "Russe",
	sh: "Serbo-croate",
	sk: "Slovaque",
	sl: "Slovène",
	sq: "Albanais",
	sv: "Suiédois",
	th: "Thaï",
	tr: "Turc",
	uk: "Ukrainien",
	vi: "Vietnamien",
	zh: "Chinois"
};

export const loadWikipediaLanguage = wikipediaLanguage => {
	try {
		setData(wikipediaLanguage, JSON.parse(localStorage.getItem(nameWikipediaLanguage)) || wikipediaLanguage);
	} catch(e) {};
};

export const saveWikipediaLanguage = wikipediaLanguage => {
	try {
		localStorage.setItem(nameWikipediaLanguage, JSON.stringify(getData(wikipediaLanguage)));
	} catch(e) {}
};
