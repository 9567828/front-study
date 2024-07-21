const arr = [1, 2, 3, 4, 5, 6];

// 배열.forEach() : 배열의 모든 값을 활용해 전달한 함수를 실행한다

// 전달한 콜백함수의 첫 번째 인자로 값이 도착하고
// 두번째 인자로 인덱스값이 도착하고
// 세번째 인자로 원본 배열이 도착한다
arr.forEach((value, index, ori) => {
    console.log(`arr[${index}]=${value}입니다. ${ori}`)
})

const scores = [90, 88, 70, 95, 35, 60];

scores.forEach((score, i) => {
    console.log(`${i}번째 학생의 점수: ${score}`)
});

// 배열.map(): 배열의 모든 값으로 전달한 함수를 실행한 반환값들로 이루어진
//             새로운 배열을 생성하여 반환한다
// 매핑
const scoreAndGrades = scores.map((score) => {
    let grade;
    if (score < 0 || score > 100) {
        grade = 'F';
    } else if (score >= 90) {
        grade = 'A';
    } else if (score >= 80) {
        grade = 'B';
    } else if (score >= 70) {
        grade = 'C';
    } else if (score >= 60) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    // 리턴을 object 타입으로
    return {
        "score": score,
        "grade": grade
    };
});


console.log(scoreAndGrades);

// 연습: 다음 배열을 활용하여 새로운 평균 점수 배열을 생성해 보세요

const students = [
    {
        name: '유재석',
        kor: 90,
        eng: 80,
        math: 70
    },
    {
        name: '일론머스크',
        kor: 10,
        eng: 90,
        math: 100
    },
    {
        name: '마이클타이슨',
        kor: 30,
        eng: 33,
        math: 13
    }
];

const avgScore = students.map((score) => {
    let avg = (score.eng + score.kor + score.math) / 3;

    return {
        "avg": Math.round(avg * 100) / 100.0,
        "name": score.name
    }
});

console.log(avgScore)


// 풀이

const getAvg = stu => Math.round((stu.kor + stu.math + stu.eng) / 3 * 100) / 100;

// 화살표 함수에서 객체를 리턴 하고 싶은 경우 {}가 함수의 body가 아니게 되도록
// 소괄호()로 한 번 감싸줘야 한다.
// ({}) 식으로
const studentAvgs = students.map(student => ({
    ...student,
    avg: getAvg(student),
}));

console.log(studentAvgs);

// 배열.filter() : 전달한 함수를 돌린 결과가 true인 값만 남긴 배열을 생성

// e.g. 평균 점수가 60점 이상인 학생만 남기고 싶다

const passedStudents = studentAvgs.filter(stu => stu.avg >= 60);

console.log("60점 이상: ", passedStudents)

const snacks = ['초코하임', '초코파이', '누네띠네', '스윙칩', '포테토칩', '민트초코하임', '화이트하임', '민트초코송이'];

// e.g. 칩으로 끝나는 과자만 남기기
const chips = snacks.filter(s => s.endsWith('칩'));
console.log(chips);


// e.g. 초코가 포함된 과자만 남기기
const choco = snacks.filter(s => s.includes('초코'));
console.log(choco);

// 배열.reduce() : 배열의 모든 값을 사용해 하나의 결과를 내는 함수
// 맨 뒤에 쉼표 허용 됨 복붙할 때 편해라고
const prices = [1500, 2000, 2300, 800,];

// 이전값, 현재값, 인덱스, 배열 순서로 값을 받는다
// e. g. reduce()를 사용해 총합을 구하는 경우
let result = prices.reduce((prev, curr, index, arr) => {
    console.log('prev: ', prev);
    console.log('curr: ', curr);
    console.log('index: ', index);
    console.log('All Array: ', arr);
    console.log("---------------------------------");

    // 여기서 리턴하는 값이 다음 반복의 prev값이 된다
    return prev + curr;
});
console.log('결과: ', result);

// e. g. 가장 작은 값을 구하기
// acc = 누적되는 장소(곳)
const smallest = prices.reduce((acc, curr) => Math.min(acc, curr));

// e. g. 가장 큰 값
const largest = prices.reduce((acc, curr) => Math.max(acc, curr));

console.log(smallest);
console.log(largest);

// 이렇게 해도 구해진다.
console.log(Math.max(...prices));


/*
    (1) 학생번호, 이름, 국/영/수 랜덤 점수, 급식 만족도(별 0 ~ 5)를 가진
        학생 100명의 자바스크립트 오브젝트 배열을 생성
    (2) 모든 학생들의 평균 점수들로 이루어진 배열을 생성
    (3) 수학 점수가 60점 이하인 학생들로만 이루어진 배열을 생성
    (4) 학생들의 급식 만족도의 평균을 구할 것

    (1), (2), (3)을 모두 html에 보기좋게 출력 할 것
*/

const lastName = ['김', '이', '박', '최']
const firstName = ['영수', '영호', '영자', '영숙', '영철', '정숙', '순자']

// const getGrades = [];
// function setStarIcon () {
//     for (let i = 0; i < 100; ++i) {
//         getGrades[i] = Math.floor(Math.random() * 6);
//         if (getGrades[i] == 0) {
//             getGrades[i] = 0;
//         } else if (getGrades[i] == 1) {
//             getGrades[i] = '★';
//         } else if (getGrades[i] == 2) {
//             getGrades[i] = '★★';
//         } else if (getGrades[i] == 3) {
//             getGrades[i] = '★★★';
//         } else if (getGrades[i] == 4) {
//             getGrades[i] = '★★★★';
//         } else {
//             getGrades[i] = '★★★★★';
//         }
//         console.log(getGrades[i])
//     }
// }
// setStarIcon();


function genStars () {
    const rating = Math.floor(Math.random() * 6);

    let stars = '';
    for (let j = 0; j < rating; ++j) {
        stars += `<i class="fa-solid fa-star" style="color: #FFD43B;"></i>`;
    }
    for (let j = rating; j < 5; ++j) {
        stars += `<i class="fa-regular fa-star" style="color: #FFD43B"></i>`;
    }
    
    return {
        star: stars,
        rating: rating,
    };
}

const stuInfo = [];
for (let i = 0; i < 100; ++i) {
    const getLast = Math.floor(Math.random() * lastName.length);
    const getFirst = Math.floor(Math.random() * firstName.length);

    stuInfo[i] = {
        stuNum : 100 + i,
        name: lastName[getLast]+firstName[getFirst],
        kor: Math.floor(Math.random() * 100 + 1),
        eng: Math.floor(Math.random() * 100 + 1),
        math: Math.floor(Math.random() * 100 + 1),
        star: genStars().star,
        rating : genStars().rating,
    }
};
console.log(stuInfo);

const avgs = stu => Math.round((stu.kor + stu.math + stu.eng) / 3 * 100) / 100;
const getStuAvgs = stuInfo.map(student => ({
    ...student,
    avg: avgs(student),
}));

console.log('평균: ', getStuAvgs);

const mathScoreCnt = stuInfo.filter(student => student.math <= 60);
// const mathScore = stuInfo.filter(m => ({
//     name: m.name,
//     sixtyFilter: m.math <= 60,
// }));
console.log('60이하', mathScoreCnt);

// 만족도
const avgStar = stuInfo.reduce((sum, stu) => sum + stu.rating, 0) / stuInfo.length;
console.log(avgStar)

const studentNumber = document.querySelector(".stu-num");
const studentName = document.querySelector(".stu-name");
const stuKorScore = document.querySelector(".stu-kor-score");
const stuEngScore = document.querySelector(".stu-eng-score");
const stuMathScore = document.querySelector(".stu-math-score");
const stuStar = document.querySelector(".stu-stars");
const stuAvg = document.querySelector(".stu-avg");
const underSixty = document.querySelector(".stu-math-under-sixty")
const HEAD = document.querySelector(".head");
const infoWrap = document.querySelector(".stu-info-wrap");

for (let i = 0; i < 100; ++i) {
    studentNumber.innerHTML += `<div>${stuInfo[i].stuNum}</div>`;
    studentName.innerHTML += `<div>${stuInfo[i].name}</div>`;
    stuKorScore.innerHTML += `<div>${stuInfo[i].kor}</div>`;
    stuEngScore.innerHTML += `<div>${stuInfo[i].eng}</div>`;
    stuMathScore.innerHTML += `<div>${stuInfo[i].math}</div>`;
    stuStar.innerHTML += `<div class="stu-star">${stuInfo[i].star}</div>`;
    stuAvg.innerHTML += `<div>${getStuAvgs[i].avg}</div>`;
    underSixty.innerHTML += `<div>${stuInfo[i].math <= 60 ? "보충수업" : "패스"}</div>`;
};

// 60점 이하 학생 추가

// 상단
const underSixtyCnt = document.querySelector(".under-sixty-cnt");
underSixtyCnt.innerHTML = `보충수업 필요한 학생수: <p>${mathScoreCnt.length}<p>`;

// 60 이하 학생 필터
// const underSixtyFilter = document.querySelector(".stu-math-under-sixty");
// underSixtyFilter = "";
// mathScoreCnt.forEach(student => {
//     underSixtyFilter += `<div>${student.math}</div>`;
// })

// 급식 만족도 추가
const starAvg = document.querySelector(".star-avg");
starAvg.innerHTML = `급식만족도: <p>${avgStar}<p>`

HEAD.addEventListener('click', function() {
    const rightArrow = document.querySelector(".head-right-arrow");
    infoWrap.classList.toggle("off");
    rightArrow.classList.toggle("active");
})