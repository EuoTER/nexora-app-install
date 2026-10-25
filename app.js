(()=>{
const $=s=>document.querySelector(s),V=$('#view'),A=window.NEXORA_APPS||[],C=window.NEXORA_CONFIG||{};
const CATS=['Tools','Games','Productivity','Media','Custom Apps'];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const S={q:'',cat:'',sort:'name'};
const hasApk=a=>/^https?:\/\/\S+\.apk(\?.*)?$/i.test(a.apk||'')||/github\.com\/.+\/releases\/download\//.test(a.apk||'');
const isArt=a=>/actions\/runs\/.+\/artifacts|\/suites\/.+\/artifacts/.test(a.apk||'');
const ready=a=>hasApk(a)&&!isArt(a);
const card=a=>`<article class="card"><div class="top"><img src="${esc(a.icon)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><div><strong>${esc(a.name)}</strong>${a.demo?'<span class="tag">Demo</span>':''}<div class="meta">${esc(a.category)}</div></div></div><p>${esc(a.short)}</p><div class="meta">v${esc(a.version)} · ${esc(a.size)}</div><a class="btn" href="#/app/${encodeURIComponent(a.id)}" aria-label="ดูรายละเอียด ${esc(a.name)}">ดูรายละเอียด</a></article>`;
const grid=l=>l.length?`<div class="grid">${l.map(card).join('')}</div>`:`<div class="empty"><p>ไม่พบแอปที่ตรงกับเงื่อนไข</p><button class="btn" data-clear>ล้างตัวกรอง</button></div>`;
const filt=()=>{const q=S.q.trim().toLowerCase();let l=A.filter(a=>(!S.cat||a.category===S.cat)&&(!q||(a.name+' '+a.short+' '+a.description).toLowerCase().includes(q)));
 if(S.sort==='name')l.sort((x,y)=>x.name.localeCompare(y.name));if(S.sort==='date')l.sort((x,y)=>y.updated.localeCompare(x.updated));return l};
const searchBar=()=>`<div class="search"><input id="q" type="search" placeholder="ค้นหาแอปจากชื่อหรือคำอธิบาย" aria-label="ค้นหาแอป" value="${esc(S.q)}"></div>`;
const chips=()=>`<div class="chips" role="group" aria-label="หมวดหมู่">${CATS.map(c=>`<button class="chip ${S.cat===c?'on':''}" data-cat="${c}" aria-pressed="${S.cat===c}">${c}</button>`).join('')}</div>`;
function download(a){const st=$('#dlst');
 if(!ready(a)){st.className='status bad';st.textContent=isArt(a)?'ลิงก์นี้เป็น GitHub Actions Artifact ซึ่งต้องล็อกอิน กรุณาใช้ GitHub Releases':'ไม่พบไฟล์ APK';return}
 st.className='status info';st.textContent='กำลังเปิดลิงก์ดาวน์โหลด… หากไม่เริ่มดาวน์โหลด ให้ตรวจสอบลิงก์ที่ผู้ดูแลกำหนด';
 const l=document.createElement('a');l.href=a.apk;l.rel='noopener';l.download='';document.body.appendChild(l);l.click();l.remove()}
const views={
home(){const f=A.find(a=>a.featured)||A[0];
 return searchBar()+(f?`<section class="hero"><img src="${esc(f.icon)}" alt=""><div><h1>${esc(f.name)}</h1><p>${esc(f.short)}</p><p class="meta">เวอร์ชัน ${esc(f.version)}${f.demo?' · ข้อมูลตัวอย่าง (Demo)':''}</p><div class="row"><a class="btn pri" href="#/app/${encodeURIComponent(f.id)}">${ready(f)?'Download':'ดูรายละเอียด'}</a></div></div></section>`:'')
 +`<h2>หมวดหมู่</h2>${chips()}<div id="res">${S.q||S.cat?grid(filt()):`<h2>Trending Apps</h2>${grid(A.filter(a=>a.trending))}<h2>Featured Apps</h2>${grid(A.filter(a=>a.featured))}<h2>Recently Updated</h2>${grid([...A].sort((x,y)=>y.updated.localeCompare(x.updated)).slice(0,6))}`}</div>`},
apps(){return `<h2>แอปทั้งหมด</h2>${searchBar()}${chips()}<div class="tools"><select id="sort" aria-label="เรียงลำดับ"><option value="name">เรียงตามชื่อ</option><option value="date">อัปเดตล่าสุด</option></select><button class="btn" data-clear>ล้างตัวกรอง</button></div><div id="res">${grid(filt())}</div>`},
categories(){return `<h2>หมวดหมู่</h2>${CATS.map(c=>`<div class="panel"><a class="btn" href="#/apps" data-pick="${c}">${c} (${A.filter(a=>a.category===c).length})</a></div>`).join('')}`},
updates(){const l=[...A].sort((x,y)=>y.updated.localeCompare(x.updated));
 return `<h2>ประวัติการอัปเดต</h2>${l.length?`<div class="tl">${l.map(a=>`<div><strong>${esc(a.name)}</strong> v${esc(a.version)} <span class="meta">· ${esc(a.updated)}</span><ul>${(a.whatsNew||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul><a class="btn" href="#/app/${encodeURIComponent(a.id)}">รายละเอียด</a> ${ready(a)?`<a class="btn pri" href="${esc(a.apk)}" rel="noopener">ดาวน์โหลด</a>`:''}</div>`).join('')}</div>`:'<div class="empty">ยังไม่มีข้อมูลการอัปเดต</div>'}`},
about(){const d=C.developer||{};return `<h2>เกี่ยวกับ NEXORA</h2><div class="panel"><p>NEXORA APP STORE เป็นเว็บไซต์รวมแอปพลิเคชัน Android ผู้ใช้ดาวน์โหลดไฟล์ APK ที่ผู้ดูแลเผยแพร่ไว้ ไม่มีรีวิวหรือยอดดาวน์โหลดที่สร้างขึ้นเอง</p></div><div class="panel"><strong>ผู้พัฒนา:</strong> ${esc(d.name)}<br><strong>ติดต่อ:</strong> <a href="${esc(d.contact)}">${esc(d.contactLabel)}</a></div><div class="panel" id="privacy"><strong>Privacy Policy:</strong> เว็บไซต์นี้ไม่เก็บข้อมูลส่วนบุคคลของผู้ใช้ ผู้ดูแลควรแก้ข้อความนี้ให้ตรงกับการใช้งานจริง<br><strong>Terms of Use:</strong> ใช้งานด้วยความรับผิดชอบของผู้ใช้เอง และติดตั้งเฉพาะ APK จากแหล่งที่เชื่อถือได้</div>`},
app(id){const a=A.find(x=>x.id===id);if(!a)return `<div class="empty"><p>ไม่พบแอปนี้</p><a class="btn" href="#/apps">กลับไปหน้าแอปทั้งหมด</a></div>`;
 const r=ready(a);return `<p><a class="btn" href="#/apps">← กลับไปหน้าแอปทั้งหมด</a></p><section class="hero"><img src="${esc(a.icon)}" alt=""><div><h1>${esc(a.name)}${a.demo?'<span class="tag">Demo</span>':''}</h1><p class="meta">${esc(a.category)} · v${esc(a.version)} · ${esc(a.size)} · อัปเดต ${esc(a.updated)}${a.minAndroid?' · '+esc(a.minAndroid):''}</p><div class="row"><button class="btn pri" id="dl" ${r?'':'disabled aria-disabled="true"'}>Download APK</button></div><div id="dlst" class="status ${r?'ok':'warn'}" role="status">${r?'พร้อมดาวน์โหลด':(isArt(a)?'ลิงก์เป็น GitHub Actions Artifact ต้องล็อกอิน ใช้ GitHub Releases แทน':'ไฟล์ยังไม่พร้อม')}</div></div></section><div class="panel"><h2 style="margin-top:0">รายละเอียด</h2><p>${esc(a.description)}</p></div><h2>ภาพหน้าจอ</h2><div class="shots">${(a.screenshots||[]).map((s,i)=>`<img src="${esc(s)}" alt="ภาพหน้าจอ ${esc(a.name)} ภาพที่ ${i+1}" loading="lazy">`).join('')}</div><h2>มีอะไรใหม่</h2><div class="panel"><ul>${(a.whatsNew||[]).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`}};
function route(){const h=location.hash.replace(/^#\/?/,''),[p,id]=h.split('/');const k=views[p]?p:'home';
 document.querySelectorAll('nav a').forEach(n=>n.classList.toggle('on',n.dataset.r===(k==='app'?'apps':k)));
 V.innerHTML='<div class="grid"><div class="skel"></div><div class="skel"></div><div class="skel"></div></div>';
 try{V.innerHTML=views[k](k==='app'?decodeURIComponent(id||''):undefined);document.title=(k==='app'&&A.find(a=>a.id===decodeURIComponent(id||''))?.name||'NEXORA APP STORE')+' – NEXORA';bind(k,id)}catch(e){V.innerHTML='<div class="status bad">เกิดข้อผิดพลาดในการแสดงหน้า กรุณาตรวจสอบไฟล์ apps.js</div>';console.error(e)}
 V.focus({preventScroll:true});window.scrollTo(0,0)}
function refresh(){const r=$('#res');if(r)r.innerHTML=grid(filt());document.querySelectorAll('.chip').forEach(c=>{const on=c.dataset.cat===S.cat;c.classList.toggle('on',on);c.setAttribute('aria-pressed',on)})}
function bind(k,id){const q=$('#q');if(q)q.oninput=e=>{S.q=e.target.value;if(k==='home'){route();$('#q').focus();$('#q').setSelectionRange(S.q.length,S.q.length)}else refresh()};
 const so=$('#sort');if(so){so.value=S.sort;so.onchange=e=>{S.sort=e.target.value;refresh()}}
 document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{S.cat=S.cat===b.dataset.cat?'':b.dataset.cat;k==='home'?route():refresh()});
 document.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{S.cat=b.dataset.pick});
 V.addEventListener('click',e=>{if(e.target.closest('[data-clear]')){S.q='';S.cat='';route()}});
 const dl=$('#dl');if(dl)dl.onclick=()=>download(A.find(a=>a.id===decodeURIComponent(id)))}
const d=C.developer||{};$('#ft').innerHTML=`© NEXORA · ${esc(d.name)} · <a href="${esc(C.privacyUrl)}">Privacy Policy</a> · <a href="${esc(C.termsUrl)}">Terms of Use</a>`;
addEventListener('hashchange',route);route();
})();
