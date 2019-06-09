$(document).ready(function(){
    const navSlide = () => {
        const navdropdown = document.querySelector('.navdropdown');
        const nav = document.querySelector('.navlinks');
        const navlinks = document.querySelectorAll('.navlinks li')

        navdropdown.addEventListener('click', ()=>{
            nav.classList.toggle('nav-active');
            navlinks.forEach((link, index)=>{
                if(link.style.animation){
                    link.style.animation = '';
                }
                else{
                    link.style.animation = `navLinkFade 0.5s ease forwards ${(index / 7) + .15}s`;
                }
            });

            navdropdown.classList.toggle('toggle');
        });
    }

    var smoothScroll = $('.scroll');

    smoothScroll.click(function(e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top
        }, 750)
    })

    var flashMessage = $('#flashMessage');

    flashMessage.hide();
    $('#flashMessage span').css('color', 'white');
    $('#flashMessage h3').css('color', 'white');
    
    $('#gmail').click(function(e){
        e.preventDefault();
        flashMessage.slideDown(1000).delay(4500).slideUp();
    })


    navSlide();

    var zeroBtn = document.getElementById('0');
    var oneBtn = document.getElementById('1');
    var twoBtn = document.getElementById('2');
    var threeBtn = document.getElementById('3');
    var fourBtn = document.getElementById('4');
    var fiveBtn = document.getElementById('5');
    var sixBtn = document.getElementById('6');
    var sevenBtn = document.getElementById('7');
    var eightBtn = document.getElementById('8');
    var nineBtn = document.getElementById('9');

    var decimalBtn = document.getElementById('.');
    var clearBtn = document.getElementById('CE');
    var clearAllBtn = document.getElementById('C');
    var delBtn = document.getElementById('delete');
    var switchBtn = document.getElementById('|');
    var decimalBtn = document.getElementById('.');
    var outputDisplay = document.getElementById('output');
    var historyDisplay = document.getElementById('history');

    var numBtns = document.getElementsByClassName('number');
    var operatorBtns = document.getElementsByClassName('operator');

    var output = 0;
    var opVal;
    var evalArr = [];

    var updateDisplay = (clickedObj) => {
        var text = clickedObj.target.innerText;

        if(output == 0){
            output = '';
        }
        output += text;
        outputDisplay.innerText = output;

    }

    var calculateDisplay = (clickedObj) => {
        var text = clickedObj.target.innerText;
        opVal = output;

        if(!(text == '=')){
            evalArr.push(opVal);
            output = 0;
            outputDisplay.innerText = '0';
            switch(text){
                case '+':
                    evalArr.push('+');
                    historyDisplay.innerText = evalArr.join(' ');
                    break;
                
                case '-':
                    evalArr.push('-');
                    historyDisplay.innerText = evalArr.join(' ');
                    break;
                
                case '×':
                    evalArr.push('*');
                    historyDisplay.innerText = evalArr.join(' ');
                    break;

                case '÷':
                    evalArr.push('/');
                    historyDisplay.innerText = evalArr.join(' ');
                    break;
            }
        }
        else{
            evalArr.push(opVal);
            evalArr = evalArr.join(' ');
            output = eval(evalArr);
            outputDisplay.innerText = output;
            historyDisplay.innerText = evalArr + " " + text;
            evalArr = [];
        }

    }

    for(let i = 0; i < numBtns.length; i++){
        numBtns[i].addEventListener('click', updateDisplay, false);
    }

    clearBtn.addEventListener('click', () => {
        output = '0';
        outputDisplay.innerText = output;
    }, false)

    delBtn.addEventListener('click', () => {
        output = output.slice(0, output.length - 1);
        if(output == ''){
            output = '0';
        }
        outputDisplay.innerText = output;
    }, false)

    clearAllBtn.addEventListener('click', () => {
        output = 0;
        opVal;
        evalArr = [];
        outputDisplay.innerText = '0';
        historyDisplay.innerText = '';
    }, false)

    decimalBtn.addEventListener('click', () => {
        if(!output.includes('.')){
            output += '.';
            outputDisplay.innerText = output;
        }
    }, false)

    for(let i = 0; i < operatorBtns.length; i++){
        operatorBtns[i].addEventListener('click', calculateDisplay, false);
    }
});