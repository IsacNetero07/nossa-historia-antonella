// Tela inicial da surpresa
const promiseBtn = document.getElementById("promiseBtn");
if (promiseBtn) {
 promiseBtn.addEventListener("click", () => {
 const gate = document.getElementById("promiseGate");
 const cover = document.getElementById("cover");
 gate.classList.remove("active");
 cover.classList.add("active");
 window.scrollTo({top:0, behavior:"smooth"});
 });
}
const screens = [...document.querySelectorAll(".screen")];
const envelope = document.getElementById("envelope");
const openLetter = document.getElementById("openLetter");
const toast = document.getElementById("toast");
let currentScreen = "cover";
const letters={
saudade:{title:"Quando sentir saudade de mim",text:"Minha gatinha, se algum dia vc sentir muita sdd, lembra de todas as vezes que a gente ficou junto, riu de coisas bobas e simplesmente aproveitou os momentos que a gnt estava junto. ❤️ Eu queria poder aparecer aí e te dar um abraço agora, mas o eu portátil ainda não tá em produção. Quero que vc saiba que vou ficar com vc sempre, mb. Quero que vc fique pra sempre cmg. Eu amo você mais que tudo, minha vida. "},
triste:{title:"Quando estiver triste",text:"Antonella, você não precisa estar bem o tempo inteiro. Se algum dia estiver triste, lembra que você tem alguém que se importa muito com você. Seu filhotinho sempre vai estar aqui sempre que vc estiver se sentindo mal. 🌹 Eu queria poder te dar aquele abraço, chamar você de minha princesa e ficar do seu lado até aparecer o sorriso que eu amo tanto. "},
futuro:{title:"Para o nosso futuro",text:"Amor, eu quero passar o resto do meu tempo do seu lado. Só espera um pouquinho, gatinha. A gente vai ter nosso apartamento, nossos gatos, nossa caminha e você vai sempre poder ficar de dengo cmg todos os momentos do dia. Vamos dormir juntinhos e minha gatinha vai ter todos os itens da sua lista. Bb, te amo mais que tudo. ❤️ "},
especial:{title:"Uma coisa que eu quero que você saiba",text:"Talvez eu nem sempre consiga falar tudo olhando para você, mas eu quero deixar isso escrito: eu te amo mais que tudo, minha vida. Você é minha gatinha, minha princesa, e eu sou muito feliz por ter você comigo. Vc é a melhor coisa que já aconteceu na minha vida. Mesmo que eu erre, eu sempre quero melhorar por vc, amor. Eu te amo mais q tudo nesse mundo. ❤️ "}
};

function showScreen(id){
 screens.forEach(s => s.classList.toggle("active", s.id === id));
 currentScreen = id;
 window.scrollTo({top:0, behavior:"smooth"});
}

function showToast(message){
 toast.textContent = message;
 toast.classList.add("show");
 clearTimeout(showToast.timer);
 showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function openExperience(){
 envelope.classList.add("open");
 setTimeout(() => showScreen("story"), 650);
}

openLetter.addEventListener("click", openExperience);
envelope.addEventListener("click", openExperience);
envelope.addEventListener("keydown", e => {
 if(e.key === "Enter" || e.key === " ") openExperience();
});

document.querySelectorAll("[data-next]").forEach(btn => {
 btn.addEventListener("click", () => showScreen(btn.dataset.next));
});
document.querySelectorAll("[data-prev]").forEach(btn => {
 btn.addEventListener("click", () => showScreen(btn.dataset.prev));
});
document.getElementById("homeBtn").addEventListener("click", () => {
 envelope.classList.remove("open");
 showScreen("cover");
});
document.getElementById("restartBtn").addEventListener("click", () => {
 envelope.classList.remove("open");
 showScreen("cover");
});



const photoModal = document.getElementById("photoModal");
const modalPhoto = document.getElementById("modalPhoto");
const modalCaption = document.getElementById("modalCaption");

document.querySelectorAll(".polaroid").forEach(card => {
 card.addEventListener("click", () => {
 const path = card.dataset.photo;
 modalPhoto.innerHTML = "";
 const img = new Image();
 img.src = path;
 img.alt = card.querySelector("strong")?.textContent || "Foto";
 img.onload = () => modalPhoto.appendChild(img);
 img.onerror = () => {
 modalPhoto.innerHTML = `<div style="padding:45px;text-align:center;color:#765f51">
 <div style="font-size:2.5rem">📷</div>
 <p>Adicione esta foto em:<br><code>${path}</code></p>
 </div>`;
 };
 modalCaption.textContent = card.dataset.caption || "";
 photoModal.classList.add("open");
 photoModal.setAttribute("aria-hidden","false");
 });
});

const letterModal = document.getElementById("letterModal");
document.querySelectorAll(".mini-letter").forEach(card => {
 card.addEventListener("click", () => {
 const data = letters[card.dataset.letter];
 document.getElementById("letterTitle").textContent = data.title;
 document.getElementById("letterText").textContent = data.text;
 letterModal.classList.add("open");
 letterModal.setAttribute("aria-hidden","false");
 });
});

document.querySelectorAll(".modal [data-close], .modal-backdrop").forEach(el => {
 el.addEventListener("click", () => {
 const modal = el.closest(".modal"); modal.classList.remove("open"); modal.setAttribute("aria-hidden","true");
 });
});



document.addEventListener("keydown", e => {
 if(e.key === "Escape"){
 document.querySelectorAll(".modal.open").forEach(m => {
      m.classList.remove("open");
      m.setAttribute("aria-hidden","true");
    });
 }
});

// Registra o Service Worker para funcionamento offline.
if("serviceWorker" in navigator){
 window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(console.error));
}
