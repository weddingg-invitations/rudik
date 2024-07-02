document.addEventListener('DOMContentLoaded', function () {
    // конечная дата,
    let
        year = 2024,
        mounth = 7,
        dey = 11;

    const deadline = new Date(year, mounth, dey);
    console.log(deadline);
    // ----------------------------------
    
    // id таймера
    let timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
            // end()
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $days.dataset.title = declensionNum(days, ['день', 'день', 'день']);
        $hours.dataset.title = declensionNum(hours, ['час', 'час', 'час']);
        $minutes.dataset.title = declensionNum(minutes, ['мин', 'мин', 'мин']);
        $seconds.dataset.title = declensionNum(seconds, ['сек', 'сек', 'сек']);
    }
    // получаем элементы, содержащие компоненты даты
    const $days = document.querySelector('.timer__days');
    const $hours = document.querySelector('.timer__hours');
    const $minutes = document.querySelector('.timer__minutes');
    const $seconds = document.querySelector('.timer__seconds');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
});

// animation end
function end() {
    //-----------Var Inits--------------
    canvas = document.getElementById("canvas");
    canvas.style.cssText = 'display: block;'

    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width / 2;
    cy = ctx.canvas.height / 2;

    let confetti = [];
    const confettiCount = 1000;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
        { front: 'red', back: 'darkred' },
        { front: 'green', back: 'darkgreen' },
        { front: 'blue', back: 'darkblue' },
        { front: 'yellow', back: 'darkyellow' },
        { front: 'orange', back: 'darkorange' },
        { front: 'pink', back: 'darkpink' },
        { front: 'purple', back: 'darkpurple' },
        { front: 'turquoise', back: 'darkturquoise' }];

    //-----------Functions--------------
    resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        cx = ctx.canvas.width / 2;
        cy = ctx.canvas.height / 2;
    };

    randomRange = (min, max) => Math.random() * (max - min) + min;

    initConfetti = () => {
        for (let i = 0; i < confettiCount; i++) {
            confetti.push({
                color: colors[Math.floor(randomRange(0, colors.length))],
                dimensions: {
                    x: randomRange(8, 10),
                    y: randomRange(8, 10)
                },

                position: {
                    x: randomRange(0, canvas.width),
                    y: canvas.height - 1
                },

                rotation: randomRange(0, 2 * Math.PI),
                scale: {
                    x: 1,
                    y: 1
                },

                velocity: {
                    x: randomRange(-25, 25),
                    y: randomRange(0, -50)
                }
            });
        }
    };

    //---------Render-----------
    render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetti.forEach((confetto, index) => {
            let width = (confetto.dimensions.x * confetto.scale.x);
            let height = (confetto.dimensions.y * confetto.scale.y);

            // Move canvas to position and rotate
            ctx.translate(confetto.position.x, confetto.position.y);
            ctx.rotate(confetto.rotation);

            // Apply forces to velocity
            confetto.velocity.x -= confetto.velocity.x * drag;
            confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
            confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

            // Set position
            confetto.position.x += confetto.velocity.x;
            confetto.position.y += confetto.velocity.y;

            // Delete confetti when out of frame
            if (confetto.position.y >= canvas.height) confetti.splice(index, 1);

            // Loop confetto x position
            if (confetto.position.x > canvas.width) confetto.position.x = 0;
            if (confetto.position.x < 0) confetto.position.x = canvas.width;

            // Spin confetto by scaling y
            confetto.scale.y = Math.cos(confetto.position.y * 0.1);
            ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

            // Draw confetto
            ctx.fillRect(-width / 2, -height / 2, width, height);

            // Reset transform matrix
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        });

        // Fire off another round of confetti
        if (confetti.length <= 10) initConfetti();

        window.requestAnimationFrame(render);
    };

    //---------Execution--------
    initConfetti();
    render();

    //----------Resize----------
    window.addEventListener('resize', function () {
        resizeCanvas();
    });

    //------------Click------------
    window.addEventListener('click', function () {
        initConfetti();
    });
}