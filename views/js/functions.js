const toggle=(e)=>{
    e.nextElementSibling.classList.toggle('show')
    if(e.nextElementSibling.classList.contains('show')){
        e.innerHTML="hide outputs"
    }else{
        e.innerHTML="show outputs"
    }
}

window.onload = () => {
document.querySelectorAll('a[href^="#"]').forEach((link)=>{
   
    link.parentNode.addEventListener('click',(e)=>{
        let id=link.getAttribute('href').slice(1)
        const aside=document.querySelector('aside')
        document.getElementById(id).scrollIntoView({
            behavior:"smooth",
            alignToTop: false
        })
        if(aside.classList.contains('show_menu')){
            aside.classList.remove('show_menu')
        }
    })
  
})
}
const change=()=>{
    
    
    const aside=document.querySelector('aside');
    aside.classList.toggle('show_menu')

}