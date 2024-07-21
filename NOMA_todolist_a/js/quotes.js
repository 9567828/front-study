const quotes = [
  {
    quote : "우린 실패로부터 배우지만 성공으로부터는 그다지 많은 것을 배우진 못해.",
    author: "로빈슨 가족",
  },
  {
    quote : "두렵지 않다면 넌 살아있는게 아니야",
    author: "굿 다이노",
  },
  {
    quote : "문제는 문제가 아니야, 문제는 그 문제를 대하는 너의 태도야.",
    author: "캐리비안의 해적",
  },
  {
    quote : "기적에도 시간은 조금 걸리기 마련이야",
    author: "신데렐라",
  },
  {
    quote : "어디로 가고 싶은지 모른다면 어디를 가도 좋아",
    author: "이상한 나라의 앨리스",
  },
  {
    quote : "눈 감지 말고 똑바로 봐봐, 두려움의 실체는 생각보다 다를 수 있어",
    author: "니모를 찾아서",
  },
  {
    quote : "난 지금 잠깐 넘어졌지만 곧 다시 일어설거야",
    author: "밤비",
  },
  {
    quote : "과거는 아플 수 있어, 하지만 너는 과거에서 도망치거나 배울수도 있지",
    author: "라이온킹",
  },
  {
    quote : "인생은 가능성으로 가득 차 있어",
    author: "소울",
  },
  {
    quote : "새벽의 빛이 떠오르듯이 나도 떠오를거야",
    author: "겨울왕국",
  },
]

const quote = document.querySelector("#quote span:first-child")
const author = document.querySelector("#quote span:last-child")

const randomText = quotes[Math.floor(Math.random() * quotes.length)]

quote.innerText = randomText.quote
author.innerText = randomText.author