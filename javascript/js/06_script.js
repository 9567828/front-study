const gugudan = document.getElementById("gugudan-container");

for (let i = 0; i <= 9; ++i) {
    for (let j = 2; j <=9; ++j) {
        if (i == 0) {
            gugudan.innerHTML += `<div class="dan">${j}단</div>`
        } else {
            gugudan.innerHTML += 
            `<div>
            <span class="j">${j}</span> x ${i} = <span class="result"> ${i*j} </span>
            </div>`
        }
    }
}

// 풀이

for (dan = 2; dan <=9; ++dan) {
    gugudan.innerHTML += `<div class="dan">${dan}단</div>`
}

// 단이 먼저 들어가야 2단 3단 열로 보임
for (gop = 1; gop <=9; ++gop) {
    for (dan = 2; dan <=9; ++dan) {
        gugudan.innerHTML += `<div>${dan} x ${gop} = ${gop*dan}</div>`
    }
}