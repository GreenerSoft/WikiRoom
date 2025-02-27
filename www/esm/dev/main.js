/*! Main v1.0.0 | (c) GreenerSoft | https://greenersoft.fr | MIT License */


import {PiwikProTracking} from "Tracking";
import {WikiRoom} from "WikiRoom";


(new PiwikProTracking(App)).trackPage();
document.getElementById("app").append(WikiRoom());
