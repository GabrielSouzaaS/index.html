// IMPORTA FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// CONFIGURAÇÃO (COLOQUE A SUA)
const firebaseConfig = {
  apiKey: "SUA_CHAVE",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_ID",
};

// INICIA
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// BOTÃO SCROLL
window.scrollToSection = function(){
    document.getElementById("agendamento").scrollIntoView({behavior:"smooth"});
}

// FUNÇÃO DE AGENDAR
window.agendar = async function(event){
    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let servico = document.getElementById("servico").value;
    let data = document.getElementById("data").value;
    let hora = document.getElementById("hora").value;

    // VALIDAÇÃO
    if(!nome || !servico || !data || !hora){
        alert("Preencha todos os campos!");
        return;
    }

    try{
        // SALVA NO BANCO
        await addDoc(collection(db, "agendamentos"), {
            nome,
            servico,
            data,
            hora,
            criado_em: new Date()
        });

        document.getElementById("resultado").innerText =
            "✅ Agendamento realizado com sucesso!";

        document.querySelector("form").reset();

        carregarAgendamentos();

    }catch(e){
        document.getElementById("resultado").innerText =
            "❌ Erro ao salvar!";
    }
}

// MOSTRAR AGENDAMENTOS NA TELA
async function carregarAgendamentos(){
    const lista = document.getElementById("listaAgendamentos");
    lista.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "agendamentos"));

    querySnapshot.forEach((doc) => {
        const dados = doc.data();

        const item = document.createElement("div");
        item.innerText =
            `${dados.nome} - ${dados.servico} - ${dados.data} às ${dados.hora}`;

        lista.appendChild(item);
    });
}

// CARREGA AO ABRIR
carregarAgendamentos();
function agendar(event){
  event.preventDefault();

  let nome = document.getElementById("nome").value;
  let servico = document.getElementById("servico").value;
  let data = document.getElementById("data").value;
  let hora = document.getElementById("hora").value;

  let msg = `Olá, sou ${nome}. Quero agendar um ${servico} no dia ${data} às ${hora}`;

  window.open(`https://wa.me/5515988287945?text=${encodeURIComponent(msg)}`);
}