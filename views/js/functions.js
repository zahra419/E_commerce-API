const toggle=(e)=>{
    e.nextElementSibling.classList.toggle('show')
    if(e.nextElementSibling.classList.contains('show')){
        e.innerHTML="hide outputs"
    }else{
        e.innerHTML="show outputs"
    }
}

