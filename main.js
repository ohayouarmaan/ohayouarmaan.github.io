gsap.registerPlugin(Flip)

const cards_div = document.querySelector('.cards')
const cards = document.querySelectorAll('.card')
const texts = document.querySelectorAll('.content__main__card');

cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const state = Flip.getState(cards);
        cards.forEach((other_card, other_index) => {
            if(index != other_index) {
                other_card.classList.remove("active");
                other_card.classList.add('inactive');
            };
        });
        if(!card.classList.contains('active')) {
            card.classList.remove('inactive');
            card.classList.add('active');
        } else {
            card.classList.add('inactive');
        }
        Flip.from(state, {
            duration: 1.0,
        });
    });
});

const colorChange = document.querySelector('.change__color__theme');
colorChange.addEventListener('click', e => {
    const darkTheme = {
        "background": "#1F2636",
        "accent2": "#0e1724",
        "font-color": "#e0e0e0",
        "slate-text-color": "#708090"
    }

    const lightTheme = {
        "background": "#d9d9d9",
        "accent2": "#6e6e6e",
        "font-color": "#0e1724",
        "slate-text-color": "#708090"
    }

    if(colorChange.dataset.theme == 'dark') {
        Object.keys(lightTheme).forEach(key => {
            console.log(key, lightTheme[key])
            document.documentElement.style.setProperty(`--${key}`, lightTheme[key])
        });
        document.querySelector(".change__color__image").setAttribute("src", "./icons8-sunset-50.png")
        colorChange.dataset.theme = 'light';
    }
    else if(colorChange.dataset.theme == 'light') {
        Object.keys(darkTheme).forEach(key => {
            console.log(key, darkTheme[key])
            document.documentElement.style.setProperty(`--${key}`, darkTheme[key])
        });
        document.querySelector(".change__color__image").setAttribute("src", "./icons8-sunset-80.png")
        colorChange.dataset.theme = 'dark';
    }

})

function getScrollPercent() {
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

window.addEventListener("scroll", e => {
    const whiteLine = document.querySelector('.white__line')
    whiteLine.style.height = `${getScrollPercent()}vh`
})
