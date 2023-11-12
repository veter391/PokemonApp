(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))m(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&m(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function m(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const c="https://pokeapi.co/api/v2/pokemon/",n=document.querySelector(".article-box"),f=document.querySelector(".form"),d=document.querySelector(".btn-next"),h=document.querySelector(".btn-prev"),a=f.querySelector("input");let l=0;function p(t){let e="";t.error?n.parentElement.classList.add("error"):(n.parentElement.classList.remove("error"),e=`
        <ul class="list list-disc">
          <li class="item p-1">Altura: ${t.height||"¯\\_( ͡* - ͡*)_/¯ "}cm</li>
          <li class="item p-1">Peso: ${t.weight||"¯\\_( ͡* - ͡*)_/¯ "}</li>
          <li class="item p-1">Tipo: ${t.types[0].type.name||"¯\\_( ͡* - ͡*)_/¯ "}</li>
        </ul>`),n.innerHTML="";const s=document.createElement("article");return s.classList.add("article","border","flex","p-8","items-center","flex-col"),s.innerHTML=`
    <img class="pokemon-img mb-7 max-h-96" src="${t.sprites.front_default}" alt="pokemon ${t.name}">
    <h2 class="mb-7 subtitle">
    ${t.name[0].toUpperCase()+t.name.slice(1)} 
    ${t.id?`N${t.id}`:""}
    </h2>
    ${e}
  `,s}async function u(t){await fetch(t).then(e=>{if(!e.ok)throw new Error("Error server not found");return e.json()}).then(e=>{l=e.id,n.append(p(e))}).catch(e=>{//! log errors
console.log(e.message);//! if error, create new object and add it to fonction createPokemon()
const s={name:"ERROR",sprites:{front_default:`https://http.cat/images/${e.statusCode}.jpg`},error:!0};n.append(p(s))})}f.addEventListener("submit",t=>{t.preventDefault();const e=a.value.trim().toLowerCase();e?u(c+e):a.placeholder="Please take pokemo!!!"});d.onclick=()=>u(c+Number(l+1));h.onclick=()=>u(c+Number(l-1));
