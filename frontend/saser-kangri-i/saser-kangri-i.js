const SK_LOCATIONS=[
  {name:"Saltoro Kangri Summit",lat:35.6000,lng:76.9833,description:"The main summit of Saltoro Kangri, standing at 7,742 metres. The highest peak of the Saltoro Ridge in the Siachen Muztagh."},
  {name:"Siachen Glacier",lat:35.5833,lng:77.1000,description:"The world's longest non-polar glacier at 76 km, flowing south from the Indira Col. A strategically vital high-altitude zone."},
  {name:"Saser Kangri",lat:35.5500,lng:77.2167,description:"A massif of six peaks in the eastern Karakoram. Saser Kangri I (7,672 m) is the highest peak in Indian-administered Ladakh."},
  {name:"Nubra Valley",lat:34.7500,lng:77.6000,description:"A high-altitude cold desert valley at the confluence of the Shyok and Nubra rivers, known for Bactrian camels and ancient monasteries."},
  {name:"Khardung La",lat:35.0333,lng:77.6500,description:"One of the world's highest motorable passes at 5,359 m, serving as the gateway from Leh to the Nubra Valley and Siachen region."}
];

const SK_GALLERY=[
  {src:"../../assets/travel_mountains.png",caption:"The imposing flanks of Saltoro Kangri rising above the Siachen Glacier in the eastern Karakoram."},
  {src:"../../assets/Hemis_Monastery.png",caption:"Panoramic Himalayan vistas characteristic of the Ladakh and Karakoram region."},
  {src:"../../assets/Kedarnath.png",caption:"Dramatic glacial terrain of the Siachen region."},
  {src:"../../assets/Manalileh.png",caption:"High-altitude Karakoram landscape near the Siachen area."}
];

const SK_FACTS=[
  "Saltoro Kangri at 7,742 m is the highest peak of the Saltoro Ridge and among the tallest mountains in the Karakoram range within Indian territory.",
  "The peak lies near the Siachen Glacier — the world's longest non-polar glacier at 76 km — often called the 'Third Pole' for its massive ice reserves.",
  "The first recorded ascent was achieved in 1962 by an Indo-Japanese expedition, a landmark in Indian high-altitude mountaineering.",
  "Due to its location near the Siachen conflict zone, special military and government permits are required for any expedition to Saltoro Kangri.",
  "The Saltoro Ridge separates the Siachen Glacier on the east from the Nubra Valley on the west, forming a critical geographic barrier.",
  "Saltoro Kangri sees fewer climbing attempts than other 7,000-metre peaks due to extreme remoteness and the logistical challenges of the Siachen region."
];

const SK_TRIVIA=[
  {question:"What is the elevation of Saltoro Kangri?",answer:"Saltoro Kangri stands at 7,742 metres (25,397 feet) above sea level, making it the highest peak of the Saltoro Ridge in the Karakoram range."},
  {question:"When was Saltoro Kangri first climbed?",answer:"The first recorded ascent was made in 1962 by a joint Indo-Japanese expedition, marking a significant milestone in Indian mountaineering."},
  {question:"What permits are needed to climb Saltoro Kangri?",answer:"Due to its proximity to the Siachen conflict zone, climbers need special permits from the Indian Ministry of Defence, the Ladakh administration, and an NOC from the Indian Army."},
  {question:"What is the best season to attempt Saltoro Kangri?",answer:"The optimal climbing window is June to August, when the Karakoram receives relatively less precipitation. Winter months see temperatures below -40°C with extreme wind conditions."},
  {question:"What mountain range does Saltoro Kangri belong to?",answer:"Saltoro Kangri belongs to the Saltoro subrange of the Siachen Muztagh in the eastern Karakoram range of Ladakh, India."}
];

let map=null,currentGalleryIndex=0,factIndex=0,factIntervalId=null,lightboxKeydownHandler=null;

function init(){initTrivia();initGallery();initFactsRotator();initMap();initLightbox()}
if(document.readyState!=="loading")init();else document.addEventListener("DOMContentLoaded",init);
if(window.appLifecycle)window.appLifecycle.registerCleanup(()=>{if(factIntervalId){clearInterval(factIntervalId);factIntervalId=null}if(lightboxKeydownHandler){document.removeEventListener("keydown",lightboxKeydownHandler);lightboxKeydownHandler=null}if(map){map.remove();map=null}});

function initTrivia(){
  const c=document.getElementById("sk-trivia-accordion");if(!c)return;c.innerHTML="";
  SK_TRIVIA.forEach((t,i)=>{
    const item=document.createElement("div");item.className="sk-trivia-item";
    item.innerHTML=`<button class="sk-trivia-question" id="tq-${i}" aria-expanded="false" aria-controls="ta-${i}">${t.question}</button><div class="sk-trivia-answer" id="ta-${i}" role="region" aria-labelledby="tq-${i}"><p>${t.answer}</p></div>`;
    item.querySelector(".sk-trivia-question").addEventListener("click",()=>{const active=item.classList.contains("active");c.querySelectorAll(".sk-trivia-item").forEach(o=>{o.classList.remove("active");o.querySelector(".sk-trivia-question").setAttribute("aria-expanded","false")});if(!active){item.classList.add("active");item.querySelector(".sk-trivia-question").setAttribute("aria-expanded","true")}});
    c.appendChild(item);
  });
}

function initGallery(){
  const g=document.getElementById("sk-gallery-grid");if(!g)return;g.innerHTML="";
  SK_GALLERY.forEach((item,index)=>{
    const f=document.createElement("figure");f.className="sk-gallery-item";f.setAttribute("tabindex","0");f.setAttribute("role","button");f.setAttribute("aria-label",`Open image: ${item.caption}`);
    f.innerHTML=`<img src="${item.src}" alt="${item.caption}" loading="lazy"><figcaption>${item.caption}</figcaption>`;
    f.addEventListener("click",()=>openLightbox(index));
    f.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openLightbox(index)}});
    g.appendChild(f);
  });
}

function initLightbox(){
  const lb=document.getElementById("sk-lightbox");if(!lb)return;
  document.querySelectorAll("[data-close-lightbox]").forEach(el=>el.addEventListener("click",closeLightbox));
  const prev=document.getElementById("sk-lightbox-prev"),next=document.getElementById("sk-lightbox-next");
  if(prev)prev.addEventListener("click",()=>showGalleryImage(currentGalleryIndex-1));
  if(next)next.addEventListener("click",()=>showGalleryImage(currentGalleryIndex+1));
  lightboxKeydownHandler=e=>{if(lb.hidden)return;if(e.key==="Escape")closeLightbox();if(e.key==="ArrowRight")showGalleryImage(currentGalleryIndex+1);if(e.key==="ArrowLeft")showGalleryImage(currentGalleryIndex-1)};
  document.addEventListener("keydown",lightboxKeydownHandler);
}

function openLightbox(i){const lb=document.getElementById("sk-lightbox");if(!lb)return;lb.hidden=false;document.body.style.overflow="hidden";showGalleryImage(i)}
function closeLightbox(){const lb=document.getElementById("sk-lightbox");if(!lb)return;lb.hidden=true;document.body.style.overflow=""}
function showGalleryImage(i){const total=SK_GALLERY.length;currentGalleryIndex=(i+total)%total;const item=SK_GALLERY[currentGalleryIndex];const img=document.getElementById("sk-lightbox-image"),cap=document.getElementById("sk-lightbox-caption");if(img){img.src=item.src;img.alt=item.caption}if(cap)cap.textContent=item.caption}

function initFactsRotator(){
  const factEl=document.getElementById("sk-fact-text"),dotsWrap=document.getElementById("sk-fact-dots");if(!factEl)return;
  if(dotsWrap)dotsWrap.innerHTML="";if(factIntervalId)clearInterval(factIntervalId);
  if(dotsWrap){SK_FACTS.forEach((_,i)=>{const dot=document.createElement("button");dot.className="sk-fact-dot"+(i===0?" active":"");dot.setAttribute("aria-label","Show fact "+(i+1));dot.addEventListener("click",()=>showFact(i));dotsWrap.appendChild(dot)})}
  function showFact(i){factIndex=i;factEl.style.opacity="0";setTimeout(()=>{factEl.textContent=SK_FACTS[factIndex];factEl.style.opacity="1"},200);if(dotsWrap)[...dotsWrap.children].forEach((d,di)=>d.classList.toggle("active",di===factIndex))}
  showFact(0);factIntervalId=setInterval(()=>showFact((factIndex+1)%SK_FACTS.length),6000);
}

function initMap(){
  const mc=document.getElementById("sk-map");if(!mc||typeof L==="undefined")return;
  if(map!==null){try{map.remove()}catch(e){}map=null}
  map=L.map("sk-map",{scrollWheelZoom:false,minZoom:6}).setView([35.6000,76.9833],10);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",{attribution:"&copy; OpenStreetMap contributors &copy; CARTO",maxZoom:18}).addTo(map);
  SK_LOCATIONS.forEach(loc=>{const isPeak=loc.name.includes("Summit");const marker=L.circleMarker([loc.lat,loc.lng],{radius:isPeak?9:7,color:isPeak?"#ff9933":"#0284c7",fillColor:isPeak?"#ffb01f":"#38bdf8",fillOpacity:.85,weight:2}).addTo(map);marker.bindPopup(`<strong>${loc.name}</strong><br>${loc.description}`)});
}
