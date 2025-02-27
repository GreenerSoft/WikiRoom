/*! WikiRoomAbout v1.0.0 | (c) GreenerSoft | https://greenersoft.fr | MIT License */


import {elements} from "Room";


const {div, p, strong, a, ul, li} = elements();

export const AboutContent = () => div(
	p(
		strong("WikiRoom"),
		" vous permet de découvrir aléatoirement des articles de ",
		strong("Wikipédia"),
		"."
	),
	p(
		"Cette application est complètement inspirée de ",
		strong(a({href: "http://wikitok.vercel.app", target: "_blank", rel: "noopener"},
			"WikiTok"
		)),
		" mais ",
		strong("WikiRoom"),
		" est garantie :"
	),
	ul(
		li(
			"sans ",
			strong("React"),
			","
		),
		li(
			"sans ",
			strong("Tailwind CSS"),
			","
		),
		li(
			"sans utilisation d’",
			strong("IA"),
			","
		),
		li(
			"sans ",
			strong("système de build"),
			" pour la fabriquer,"
		),
		li(
			"et sans ",
			strong("OGM"),
			" !"
		)
	),
	p(
		strong("WikiRoom"),
		" a été développé avec la librairie ultra légère ",
		strong(a({href: "https://roomjs.fr", target: "_blank", rel: "noopener"},
			"Room"
		)),
		" et peut être installée (",
		strong("PWA"),
		") sur mobile ou sur ordinateur."
	),
	p(
		"Le code source de ",
		strong("WikiRoom"),
		" est disponible sur ",
		strong(a({href: "https://github.com/GreenerSoft/WikiRoom", target: "_blank", rel: "noopener"},
			"GitHub"
		)),
		"."
	),
	p(
		"Les images et extraits de textes présentés sur ",
		strong("WikiRoom"),
		" sont la propriété de ",
		strong("Wikipédia"),
		"."
	),
	p(
		"Le copyright et les droits d’auteur de ",
		strong("Room"),
		" et ",
		strong("WikiRoom"),
		" sont de ",
		strong(a({href: "https://greenersoft.fr", class: "greenerSoft", target: "_blank", rel: "noopener"},
			"GreenerSoft"
		)),
		"."
	),
	p(strong("Version : "), App.siteVersion)
);
