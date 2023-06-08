let buttons = document.querySelectorAll(".btn");
let display = document.getElementById("display");

buttons.forEach((button) => {
    let buttonText = button.textContent;
    let cla = button.getAttribute('class');
    button.addEventListener('click', () => buttonClicked(buttonText, cla))});

function buttonClicked(buttonText, cla) {
        console.log(buttonText, cla)
        if (!cla.includes('nodisplay')){
            display.textContent = buttonText
        }
}
