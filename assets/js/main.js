let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let numeros = document.querySelector('.d-1-3')
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-rigth');

let offOn = true;
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votoConfirmado = false;
let music = '';

function comecarEtapa() {
    votoConfirmado = false;
    if (offOn === true){
        let etapa = etapas[etapaAtual];
        let numeroHtml = '';
        numero = '';
        for(let i = 0; i < etapa.numeros; i++){
            if(i === 0){
                numeroHtml += `<div class="numero pisca"></div>`
            }
            else{
                numeroHtml += `<div class="numero"></div>`
            }
        }  
        seuVotoPara.style.display = 'none';
        cargo.innerHTML = etapa.titulo;
        descricao.innerHTML = '';
        aviso.style.display = 'none'
        lateral.innerHTML = '';
        numeros.innerHTML = numeroHtml;
    }
   
}

comecarEtapa();

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero){
            return true
        }
        else{
            return false
        }
    })
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block'
        descricao.innerHTML = `Nome: ${candidato.name}<br>Partido: ${candidato.partido}`
        let fotosHtml = '';

        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `
                <div class="d-1-image small"><img src="assets/images/${candidato.fotos[i].url}" 
                    alt="">${candidato.fotos[i].legenda} 
                </div>`
            }
            else{
                fotosHtml += `
                <div class="d-1-image"><img src="assets/images/${candidato.fotos[i].url}" 
                    alt="">${candidato.fotos[i].legenda} 
                </div>`
            }
           
        }
        lateral.innerHTML = fotosHtml;
        lateral.style.display = 'block'
    }
    else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        lateral.innerHTML ='';
        lateral.style.display ='none';
        descricao.innerHTML = `<div class="nulo pisca">VOTO NULO</div>`
    }
}

function clicou(num){
   somDaUrna(1)
   let elNumero = document.querySelector('.numero.pisca')
   if(elNumero != null){
     elNumero.innerHTML = num;
     numero = `${numero}${num}`;
     elNumero.classList.remove('pisca')
     if(elNumero.nextElementSibling != null){
        elNumero.nextElementSibling.classList.add('pisca')
     }
     else{
         atualizaInterface();
     }
   }
}

function branco(){
    if(offOn === true){
        if(numero === ''){
            numero = ''
            votoBranco = true;
            seuVotoPara.style.display = 'block';
            aviso.style.display = 'block'
            lateral.style.display = 'none';
            lateral.innerHTML = ''
            descricao.innerHTML = `<div class="voto-branco pisca">VOTO EM BRANCO</div>`
            numeros.innerHTML= '';
        }
        else{
            alert('Para votar em BRANCO, o campo de voto deve estar vazio. Aperte CORRIGE para apagar o campo de voto.')
        }
    }
}
   
function corrige(){
    comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];

    if(votoBranco === true){
        votoConfirmado = true;
    }
    else if (numero.length === etapa.numeros){
        votoConfirmado = true;
    }

    if(votoConfirmado === true){
        somDaUrna(2);
        etapaAtual++
        if(etapaAtual === etapas.length){
            cargo.style.display = 'none';
            numero = ''
            seuVotoPara.style.display = 'none';
            aviso.style.display = 'none'
            lateral.innerHTML = '';
            lateral.style.display = 'none';
            descricao.innerHTML = ``
            numeros.innerHTML= '';
            descricao.innerHTML = `<div class="fim pisca">FIM</div>`
            offOn = false;
        }
        else{
            comecarEtapa();
        }
    }
}
function somDaUrna(num){
    const music = new Audio(`/assets/audio/som${num}.mp3`)
    music.play()
}

