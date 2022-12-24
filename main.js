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
            card.classList.remove('active');
        }
        Flip.from(state, {
            duration: 1.0,
        });
    });
});

const colorChange = document.querySelector('.change__color__theme');


const circles = document.querySelectorAll(".circle");
const coords = { x: 0, y: 0 };
const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e"
];

circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
});

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
        "slate-text-color": "black"
    }


    const darkColors = ['#000000', '#36454F', '#023020', '#301934', '#343434', '#1B1212', '#28282B', '#191970', '#353935'];


    if(colorChange.dataset.theme == 'dark') {
        Object.keys(lightTheme).forEach(key => {
            console.log(key, lightTheme[key])
            document.documentElement.style.setProperty(`--${key}`, lightTheme[key])
        });
        document.querySelector(".change__color__image").setAttribute("src", "./icons8-sunset-50.png")
        colorChange.dataset.theme = 'light';
        circles.forEach(function (circle, index) {
            circle.style.backgroundColor = darkColors[index % darkColors.length];
            console.log(darkColors[index % darkColors.length])
        });
    }
    else if(colorChange.dataset.theme == 'light') {
        Object.keys(darkTheme).forEach(key => {
            console.log(key, darkTheme[key])
            document.documentElement.style.setProperty(`--${key}`, darkTheme[key])
        });
        document.querySelector(".change__color__image").setAttribute("src", "./icons8-sunset-80.png")
        colorChange.dataset.theme = 'dark';
        console.log("hello");
        circles.forEach(function (circle, index) {
            circle.style.backgroundColor = colors[index % colors.length];
        });
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






window.addEventListener("mousemove", function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
  
    let x = coords.x;
    let y = coords.y;
  
    circles.forEach(function (circle, index) {
      circle.style.left = window.scrollX + x - 12 + "px";
      circle.style.top = window.scrollY + (y) - 12 + "px";
    
      circle.style.scale = (circles.length - index) / circles.length;
    
      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });
 
    requestAnimationFrame(animateCircles);
}

animateCircles();
