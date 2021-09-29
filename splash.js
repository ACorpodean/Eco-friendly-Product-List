let intro = document.querySelector('.intro')
let logo = document.querySelector('.logo-header')

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        logo.forEach((span, idx) => {
            setTimeout(() => {
                logo.classList.add('active');
            }, (idx + 1) * 400)
        });
        setTimeout(() => {
            logo.forEach((span, idx) => {
                setTimeout(() => {
                    logo.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50)
            })
        }, 2000);
        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2300)
    })
})