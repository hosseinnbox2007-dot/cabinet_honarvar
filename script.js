const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const header=$('.site-header');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20));
const menu=$('.main-nav'), toggle=$('.menu-toggle');
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});
$$('.main-nav a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

const quick=$('#quickContact'), quickToggle=$('.quick-toggle');
quickToggle.addEventListener('click',()=>{const open=quick.classList.toggle('open');quickToggle.setAttribute('aria-expanded',open)});
document.addEventListener('click',e=>{if(!quick.contains(e.target))quick.classList.remove('open')});

$$('.filters button').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const filter=btn.dataset.filter;
  $$('.project').forEach(p=>p.classList.toggle('is-hidden',filter!=='all'&&p.dataset.cat!==filter));
}));

const projectSelect=$('select[name="project"]');
$$('[data-service]').forEach(a=>a.addEventListener('click',()=>{if(a.dataset.service&&projectSelect)projectSelect.value=a.dataset.service}));
const dateInput=$('input[name="date"]');
if(dateInput){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());dateInput.min=d.toISOString().split('T')[0]}

$('#bookingForm').addEventListener('submit',e=>{
  e.preventDefault();
  const f=new FormData(e.currentTarget), val=k=>String(f.get(k)||'').trim();
  const name=val('name'),phone=val('phone'),city=val('city'),project=val('project'),date=val('date'),time=val('time'),details=val('details')||'ندارد';
  const faDate=date?new Date(date+'T12:00:00').toLocaleDateString('fa-IR',{year:'numeric',month:'long',day:'numeric'}):'ثبت نشده';
  const msg=`سلام، برای رزرو مشاوره/بازدید با کابینت سازی هنرور درخواست دارم.%0A%0Aنام: ${encodeURIComponent(name)}%0Aشماره موبایل: ${encodeURIComponent(phone)}%0Aشهر: ${encodeURIComponent(city)}%0Aنوع پروژه: ${encodeURIComponent(project)}%0Aتاریخ پیشنهادی: ${encodeURIComponent(faDate)}%0Aساعت پیشنهادی: ${encodeURIComponent(time)}%0Aتوضیحات: ${encodeURIComponent(details)}%0A%0Aلطفاً زمان نهایی را تأیید کنید.`;
  const message=$('#formMessage');message.textContent='در حال آماده‌سازی درخواست برای واتساپ…';
  window.open(`https://wa.me/989367091879?text=${msg}`,'_blank','noopener');
  setTimeout(()=>message.textContent='واتساپ باز شد؛ زمان نهایی پس از هماهنگی تأیید می‌شود.',300);
});
$('#year').textContent=new Date().getFullYear();
