/*! WikiRoom v1.0.0 | (c) GreenerSoft | https://greenersoft.fr | MIT License */
import{elements as e,createData as t,createEffect as o,untrack as a,map as i}from"Room";import{WikipediaLanguages as r,loadWikipediaLanguage as l,saveWikipediaLanguage as n}from"WikiRoomLanguages";import{AboutContent as s}from"WikiRoomAbout";import{loadFavorites as c,saveFavorites as u,isFavorite as g,addFavorite as p,removeFavorite as d,FavoritesContent as m}from"WikiRoomFavorites";const{div:v,nav:h,article:k,header:b,h1:R,h2:W,h3:f,a:C,input:y,button:w,p:x,aside:F,dialog:L,form:M,label:S,select:H,option:P}=e(),T=t("fr"),E=t(!1),I=t([]),O=t(0),U=new Worker(JSON.parse(document.querySelector("script[type=importmap]").textContent).imports.WikiRoomWorker);U.addEventListener("message",(e=>{I.push(...e.data),E.value=!1}));const j=e=>f(e,w({onClick:e=>e.target.closest("dialog").close(),title:"Fermer"},"x")),q=()=>{const e=L({class:"favorites"},j("Favoris"),m()),t=(()=>{const e=H({name:"language"},Object.entries(r).map((([e,t])=>P({value:e,selected:e==T.value},e.toUpperCase()+" - "+t))));return L(j("Réglages"),M({method:"dialog",onSubmit:t=>T.value=e.value},S("Langue des articles de Wikipédia : ",e),w("Enregistrer")))})(),o=L({class:"about"},j("À propos de WikiRoom"),s());return[F(w({type:"button",onClick:()=>e.showModal(),title:"Favoris"},"Favoris"),w({type:"button",onClick:()=>t.showModal(),title:"Réglages"},"Réglages"),w({type:"button",onClick:()=>o.showModal(),title:"À propos"},"À propos")),e,t,o]},z=e=>{const t=(e,t,o)=>C({href:t,dir:o,target:"_blank",rel:"noopener"},e);return k({style:{backgroundImage:`url(${e.image})`}},v({dir:e.direction},b(t(W({lang:e.language},e.title),e.url,e.direction),v(y({type:"checkbox",name:"favorite",title:"Favori",checked:()=>g(e.pageId),onChange:t=>t.target.checked?p(e):d(e)}),w({type:"button",onClick:()=>navigator.share?navigator.share({url:I[O].url,title:I[O].title}).catch((e=>e)):navigator.clipboard.writeText(I[O].url),title:"Partager"},"Partager"))),x({lang:e.language},e.extract),t("Lire la suite sur Wikipédia →",e.url,"ltr")))};export const WikiRoom=()=>{const e=()=>{I.length=0,O.value=0,r()},t=()=>{n(T),u()},r=()=>s.scrollTop=O.value*s.clientHeight,s=h({onScroll:({target:e})=>O.value=Math.round(e.scrollTop/e.clientHeight),onResize:r});return c(),l(T),o((()=>a(e)),T),o((()=>{!E.value&&O.value>I.length-20&&(E.value=!0,U.postMessage(T.value))})),v({class:"wikiRoom",onUnmount:t,onPageHide:t},v({class:()=>"bounceLoader"+(E.value&&!I.length?"":" hidden")},v(),v(),v()),i(s,I,z),R({onClick:()=>!E.value&&confirm("Réinitialiser la liste des articles ?")&&e(),title:"Réinitialiser"},"WikiRoom"),q())};