const openBtn = document.getElementById('openBtn')
const modal = document.getElementById('modal')
const closeBtn = document.getElementById('closeBtn')
const singleBtn = document.getElementById('singleBtn')
const takenBtn = document.getElementById('takenBtn')
const result = document.getElementById('result')
const singleContent = document.getElementById('singleContent')
const takenContent = document.getElementById('takenContent')
const heartsFall = document.getElementById('heartsFall')

function showModal(){
  modal.setAttribute('aria-hidden','false')
  result.hidden = true
  singleContent.hidden = true
  takenContent.hidden = true
}

function hideModal(){
  modal.setAttribute('aria-hidden','true')
}

openBtn.addEventListener('click', ()=>{
  showModal()
})

closeBtn.addEventListener('click', ()=>{
  hideModal()
})

singleBtn.addEventListener('click', ()=>{
  result.hidden = false
  singleContent.hidden = false
  takenContent.hidden = true
})

takenBtn.addEventListener('click', ()=>{
  result.hidden = false
  singleContent.hidden = true
  takenContent.hidden = false
})

// close when clicking backdrop
modal.addEventListener('click', (e)=>{
  if(e.target === modal || e.target.classList.contains('modal-backdrop')) hideModal()
})

// ---------- falling hearts background ----------
const HEART_CHARS = ['💗','💕','💖','❤','💘']
const MAX_HEARTS = 22

function spawnHeart(){
  const el = document.createElement('span')
  el.className = 'falling-heart'
  el.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)]

  const left = Math.random() * 100
  const fallDuration = 6 + Math.random() * 6      // 6s - 12s
  const swayDuration = 2 + Math.random() * 2       // 2s - 4s
  const size = 0.9 + Math.random() * 1.1           // 0.9rem - 2rem
  const delay = Math.random() * 4

  el.style.left = left + 'vw'
  el.style.fontSize = size + 'rem'
  el.style.animationDuration = `${fallDuration}s, ${swayDuration}s`
  el.style.animationDelay = `${delay}s, 0s`

  heartsFall.appendChild(el)

  // clean up after it falls so the DOM doesn't grow forever
  setTimeout(()=>{ el.remove() }, (fallDuration + delay) * 1000 + 200)
}

function startHeartRain(){
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if(prefersReduced) return

  for(let i = 0; i < MAX_HEARTS; i++){
    setTimeout(spawnHeart, i * 300)
  }

  setInterval(spawnHeart, 700)
}

startHeartRain()