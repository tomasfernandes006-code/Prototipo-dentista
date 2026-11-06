(function(){
  var $=function(s){return document.querySelector(s)}, $$=function(s){return document.querySelectorAll(s)};
  $('#ano').textContent=new Date().getFullYear();
  /* menu */
  var hd=$('#top'), bg=$('#burger');
  function menu(open){hd.classList.toggle('open',open);bg.setAttribute('aria-expanded',open);bg.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')}
  bg.addEventListener('click',function(){menu(!hd.classList.contains('open'))});
  $$('#menu a').forEach(function(a){a.addEventListener('click',function(){menu(false)})});
  /* faq */
  $$('.q button').forEach(function(b){b.addEventListener('click',function(){
    var q=b.parentNode, open=!q.classList.contains('open');
    q.classList.toggle('open',open); b.setAttribute('aria-expanded',open);
  })});
  /* galeria */
  var tr=$('#track');
  function step(d){tr.scrollBy({left:d*tr.clientWidth*.8,behavior:'smooth'})}
  $('#prev').addEventListener('click',function(){step(-1)});
  $('#next').addEventListener('click',function(){step(1)});
  tr.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
  /* lightbox */
  var lb=$('#lb'), lph=$('#lbph'), last=null;
  function closeLb(){lb.classList.remove('on');document.body.style.overflow='';if(last)last.focus()}
  $$('.item').forEach(function(it){it.addEventListener('click',function(){
    last=it; lph.style.setProperty('--h',it.style.getPropertyValue('--h'));
    lph.innerHTML=it.innerHTML; lb.classList.add('on'); document.body.style.overflow='hidden'; $('#lbx').focus();
  })});
  $('#lbx').addEventListener('click',closeLb);
  lb.addEventListener('click',function(e){if(e.target===lb)closeLb()});
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){if(lb.classList.contains('on'))closeLb();else if(hd.classList.contains('open'))menu(false)}
  });
})();
