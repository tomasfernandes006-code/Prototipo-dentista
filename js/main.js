/* Lógica do site (SPA, WhatsApp, renderização). Dados ficam em config.js */
const wa = k => `https://wa.me/${CLINICA.whatsapp}?text=${encodeURIComponent(MSG[k]||MSG.geral)}`;

/* SPA */
function Maps(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));
  document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('on',a.dataset.go===id));
  document.getElementById('menu').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
  history.replaceState(null,'','#'+id);
}
document.addEventListener('click',e=>{
  const g=e.target.closest('[data-go]');
  if(g){e.preventDefault();Maps(g.dataset.go)}
});
document.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&e.target.dataset&&e.target.dataset.go)Maps(e.target.dataset.go)
});
document.querySelectorAll('nav a').forEach(a=>a.tabIndex=0);
document.getElementById('burger').onclick=()=>document.getElementById('menu').classList.toggle('open');

/* Cards de tratamento */
document.getElementById('tgrid').innerHTML=TRAT.map(x=>`
<article class="tcard"><img src="https://images.unsplash.com/${x.i}?auto=format&fit=crop&w=700&q=75" alt="${x.t}" loading="lazy">
<div class="tb"><h3>${x.t}</h3><p>${x.d}</p><div class="ben"><i class="fa-solid fa-circle-check"></i>${x.b}</div>
<a class="btn btn-navy" data-wa="${x.k}" target="_blank" rel="noopener">Tenho interesse</a></div></article>`).join('');

/* Preenche dados e links WhatsApp */
document.querySelectorAll('[data-wa]').forEach(a=>a.href=wa(a.dataset.wa));
document.getElementById('c-end').textContent=CLINICA.endereco;
document.getElementById('m-end').textContent=CLINICA.endereco;
document.getElementById('c-tel').textContent=CLINICA.telefone;
document.getElementById('c-hor').innerHTML=CLINICA.horarios;
document.getElementById('maplink').href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(CLINICA.endereco);
document.getElementById('s-ig').href=CLINICA.instagram;
document.getElementById('s-fb').href=CLINICA.facebook;
/* abre seção do hash */
const h=location.hash.slice(1);if(h&&document.getElementById(h))Maps(h);
