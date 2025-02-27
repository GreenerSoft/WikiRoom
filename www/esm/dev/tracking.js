/*! Tracking v1.0.0 | (c) GreenerSoft | https://greenersoft.fr | MIT License */


export class PiwikProTracking {

    static useSingleInstance() {
		return true;
	}

	constructor(conf = {}) {
        this.canUseTracking = conf.canTrack === true && conf.trackingUserId && conf.trackingAppId && !location.href.includes("-dev.fr");
        this.trackingUserId = conf.trackingUserId;
        this.trackingAppId = conf.trackingAppId;
        this.trackingDimensions = conf.trackingDimensions;
        this.onPageLoad = this.trackPage;
        this.install();
    }

    install() {
        if (this.canUseTracking) {
            try {
                let url = `https://${this.trackingUserId}.piwik.pro/`;
                window._paq = window._paq || [];
                _paq.push(["setTrackerUrl", url + 'ppms.php']);
                _paq.push(["setSiteId", this.trackingAppId]);
                if (this.trackingDimensions) {
                    for (let dimensionId in this.trackingDimensions) {
                        _paq.push(['setCustomDimension', dimensionId, this.trackingDimensions[dimensionId]]);
                    }
                }
                if (!document.getElementById("piwikScript")) {
                    let script = document.createElement("script");
                    script.id = 'piwikScript';
                    script.src = url + "ppms.js";
                    document.head.appendChild(script);
                }
            } catch (e) {
                this.canUseTracking = false;
            }
        }
    }

    uninstall() {
        this.canUseTracking = false;
        document.querySelectorAll("#piwikScript, #ppas_container_configuration").forEach(e => e.remove());
        delete window["_paq"];
    }

    trackDownload(url) {
        if (this.canUseTracking) {
            try {
                _paq.push(["trackLink", url, "download"]);
            } catch (e) {
            }
        }
    }

    trackPage() {
        if (this.canUseTracking) {
            try {
                _paq.push(["setCustomUrl", location.href]);
                _paq.push(["setDocumentTitle", document.title]);
                _paq.push(["trackPageView"]);
                _paq.push(["enableLinkTracking"]);
            } catch (e) {
            }
        }
    }

}
