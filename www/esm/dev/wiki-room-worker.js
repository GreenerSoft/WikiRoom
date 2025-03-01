/*! WikiRoomWorker v1.0.0 | (c) GreenerSoft | https://greenersoft.fr | MIT License */


let aborter;

const params = new URLSearchParams({
	action: "query",
	origin: "*",
	format: "json",
	generator: "random",
	prop: "extracts|pageimages|info",
	inprop: "url",
	grnnamespace: 0,
	grnlimit: 20,
	exintro: 1,
	exlimit: "max",
	exsentences: 5,
	explaintext: 1,
	piprop: "thumbnail",
	pithumbsize: 800
});

self.onmessage = async message => {
	try {
		aborter && aborter.abort();
		aborter = new AbortController();
		const response = await fetch(new URL(`https://${message.data}.wikipedia.org/w/api.php?` + params), {signal: aborter.signal});
		const data = await response.json();
		self.postMessage(Object.values(data.query.pages).filter(page =>
			page.thumbnail &&
			page.thumbnail.source &&
			page.canonicalurl &&
			page.extract
	  	).map(page => ({
			title: page.title,
			extract: page.extract,
			language: page.pagelanguage,
			direction: page.pagelanguagedir,
			pageId: page.pageid,
			image: page.thumbnail.source,
			url: page.canonicalurl
		})));
	} catch (error) {
		if (error && error.name === "AbortError") {
			aborter = null;
		} else {
			console.error(error);
			self.postMessage([]);
		}
	}
};
