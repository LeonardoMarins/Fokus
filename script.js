const html = document.querySelector('html');
const focusBt = document.querySelector('.app__card-button--foco');
const shortBt = document.querySelector('.app__card-button--curto');
const longBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const musicInput = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause'); 
const startOrPauseBt = document.querySelector('#start-pause span');
const IconPlay = document.querySelector('#start-pause img');
const timerInScreen = document.querySelector('#timer');


const music = new Audio('/sons/luna-rise-part-one.mp3');
const musicPause = new Audio('/sons/pause.mp3');
const musicPlay = new Audio('/sons/play.wav');
const musicTime = new Audio('/sons/beep.mp3');
music.loop = true;

let tempSeconds = 1500;
let intervalId = null;

musicInput.addEventListener('change', () => {
    if(music.paused) {
        music.play()
    }else {
        music.pause()
    }
})


focusBt.addEventListener('click', () => {
    tempSeconds = 1500
    changeContext('foco')
    focusBt.classList.add('active')
})

shortBt.addEventListener('click', () => {
    tempSeconds = 300
    changeContext('descanso-curto')
    shortBt.classList.add('active')
})

longBt.addEventListener('click', () => {
    tempSeconds = 900
    changeContext('descanso-longo')
    longBt.classList.add('active')
})

function changeContext(context) {
    showTime()
    buttons.forEach(function(context) {
        context.classList.remove('active')
    })
    html.setAttribute('data-contexto', context)
    banner.setAttribute('src', `/imagens/${context}.png`)
    switch(context) {
        case "foco":
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto": 
            title.innerHTML = `que tal dar uma respirada?,<br>
             <strong class="app__title-strong">Faça uma pequena pausa.</strong>`
            break;
        case "descanso-longo": 
            title.innerHTML = `Hora de voltar á superfice,<br>
             <strong class="app__title-strong">Faça uma pausa longa</strong>`
        default:
            break;
    }
}

const countdown = () => { // como e uma funcao que foi criada dentro de uma constante tenho que chamar o evento de click apos ela ser escrita
    if(tempSeconds <= 0) {
        musicTime.play();
        alert('tempo finalizado');
        reset()
        IconPlay.setAttribute('src', `/imagens/play_arrow.png`);
        return;
    }
    tempSeconds -= 1
    showTime()
}

startPauseBt.addEventListener('click', startOrPause)

function startOrPause() {
    if(intervalId) {
        musicPause.play()
        IconPlay.setAttribute('src', `/imagens/play_arrow.png`)
        reset();
        return;
    }
    musicPlay.play()
    intervalId = setInterval(countdown, 1000)
    startOrPauseBt.textContent = "pausar"
    IconPlay.setAttribute('src', `/imagens/pause.png`)
}

function reset() {
    clearInterval(intervalId)
    startOrPauseBt.textContent = "comecar "
    intervalId = null;
}

function showTime() {
    const time = new Date(tempSeconds * 1000)
    const timeFormated = time.toLocaleTimeString('pt-br',{minute: '2-digit', second: '2-digit'})
    timerInScreen.innerHTML = `${timeFormated}`
}

showTime()