(function(){
var $=function(s){return document.querySelector(s)};
// menu + theme
var mbtn=$("#mbtn"),menu=$("#menu");
mbtn.onclick=function(){var o=menu.classList.toggle("open");mbtn.setAttribute("aria-expanded",o)};
menu.addEventListener("click",function(e){if(e.target.tagName==="A"){menu.classList.remove("open");mbtn.setAttribute("aria-expanded","false")}});
$("#theme").onclick=function(){var r=document.documentElement,d=getComputedStyle(r).getPropertyValue("--bg").trim()==="#150d22";r.setAttribute("data-theme",d?"light":"dark")};
// dots
var dots=$("#dots"),i;
for(i=0;i<100;i++){dots.appendChild(document.createElement("i"))}
function setDots(btn){
 var n=Math.round(parseFloat(btn.dataset.n));
 [].forEach.call(dots.children,function(d,k){setTimeout(function(){d.classList.toggle("on",k<n)},k*8)});
 $("#cap").textContent=btn.dataset.t;
 [].forEach.call($("#seg").children,function(b){b.setAttribute("aria-pressed",b===btn)});
}
[].forEach.call($("#seg").children,function(b){b.onclick=function(){setDots(b)}});
setDots($("#seg").children[0]);
// chart
var data={total:[13830,11307,13213],ra:[9385,7161,7764],rape:[2311,2103,2644]},yrs=[2021,2022,2023],NS="http://www.w3.org/2000/svg";
function draw(k){
 var s=$("#chart"),v=data[k],max=Math.max.apply(null,v)*1.15;s.innerHTML="";
 v.forEach(function(n,j){
  var h=n/max*170,x=50+j*110,r=document.createElementNS(NS,"rect");
  r.setAttribute("class","bar");r.setAttribute("x",x);r.setAttribute("y",200-h);r.setAttribute("width",80);r.setAttribute("height",h);r.setAttribute("rx",6);s.appendChild(r);
  var t=document.createElementNS(NS,"text");t.setAttribute("x",x+40);t.setAttribute("y",192-h);t.setAttribute("text-anchor","middle");t.textContent=n.toLocaleString("en-US");s.appendChild(t);
  var y=document.createElementNS(NS,"text");y.setAttribute("x",x+40);y.setAttribute("y",222);y.setAttribute("text-anchor","middle");y.textContent=yrs[j];s.appendChild(y);
 });
 s.setAttribute("aria-label","Bar chart: "+yrs.map(function(y,j){return y+": "+v[j].toLocaleString("en-US")}).join(", "));
}
[].forEach.call($("#ctabs").children,function(b){b.onclick=function(){
 [].forEach.call($("#ctabs").children,function(x){x.setAttribute("aria-selected",x===b)});draw(b.dataset.k)}});
draw("total");
// myths
var M=[
["Myth: \"It's a family problem. Outsiders should not get involved.\"","Fact: RA 9262 makes violence against a spouse or partner a crime, not just a private dispute. Anyone can report. [5]"],
["Myth: \"Abuse is only real if there are bruises.\"","Fact: The law covers psychological and economic abuse too. Harm does not have to leave a mark to be a crime. [5]"],
["Myth: \"Only poor or uneducated women experience it.\"","Fact: Violence has been recorded in every region of the country, as the regional figures above show. No woman is automatically safe or immune. [4]"],
["Myth: \"If it were that bad, she would leave.\"","Fact: Leaving can be unsafe or impossible because of fear, money, children or threats. Support and protection orders exist for this reason. [5]"],
["Myth: \"Catcalling is just a compliment.\"","Fact: Unwanted sexual remarks in public are punishable under the Safe Spaces Act. [7]"],
["Myth: \"Men cannot help end this.\"","Fact: Most violence is committed by men, so men's choices matter. Calling out sexist jokes and respecting consent are real action."]];
var g=$("#myths-grid");
M.forEach(function(m){var b=document.createElement("button");b.className="flip";b.setAttribute("aria-expanded","false");
 b.innerHTML="<b>"+m[0]+"</b><span style='display:none'>"+m[1]+"</span><span class='src'>Tap to reveal the fact</span>";
 b.onclick=function(){var open=b.classList.toggle("show");b.children[1].style.display=open?"block":"none";b.children[2].style.display=open?"none":"block";b.setAttribute("aria-expanded",open)};
 g.appendChild(b)});
// commitments
var C=["I will believe and listen to survivors without blaming them.","I will not laugh at or share sexist jokes, and I will speak up when I hear them.","I will learn the signs of abuse and how to report it.","I will save the hotline numbers on this page in my phone.","I will respect consent in my relationships, online and offline.","I will share this website with at least one friend or family member."];
var ck=$("#checks"),saved=[];
try{saved=JSON.parse(localStorage.getItem("hp_commit")||"[]")}catch(e){}
function upd(){var n=ck.querySelectorAll("input:checked").length;
 $("#meter").style.width=(n/C.length*100)+"%";$("#mtext").textContent=n+" of "+C.length+" commitments made"+(n===C.length?". Thank you for taking action.":"");
 try{localStorage.setItem("hp_commit",JSON.stringify([].map.call(ck.querySelectorAll("input"),function(x){return x.checked})))}catch(e){}}
C.forEach(function(t,j){var l=document.createElement("label"),c=document.createElement("input");c.type="checkbox";c.checked=!!saved[j];c.onchange=upd;l.appendChild(c);l.appendChild(document.createTextNode(t));ck.appendChild(l)});
upd();
})();