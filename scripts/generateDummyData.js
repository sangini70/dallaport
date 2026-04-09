import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'public', 'data');

const koFlowIndex = {
  "exchange-rate": [
    "exchange-rate-basics",
    "exchange-rate-and-interest-rate",
    "exchange-rate-market-impact",
    "exchange-rate-investment-strategy"
  ]
};

const enFlowIndex = {
  "exchange-rate": [
    "exchange-rate-basics",
    "exchange-rate-and-interest-rate",
    "exchange-rate-market-impact",
    "exchange-rate-investment-strategy"
  ]
};

const koPosts = [
  {
    slug: "exchange-rate-basics",
    track: "exchange-rate",
    step: 1,
    prev_slug: null,
    next_slug: "exchange-rate-and-interest-rate",
    related: [
      "exchange-rate-and-interest-rate",
      "exchange-rate-market-impact",
      "exchange-rate-investment-strategy"
    ],
    title: "환율이란 무엇인가?",
    hook: "환율이 올랐다는 뉴스가 내 월급과 무슨 상관이 있을까요?",
    summary: "환율의 기본 개념과 결정 원리를 알아봅니다.",
    content: "## 환율의 정의\n\n환율은 두 나라 돈의 교환 비율입니다. 예를 들어 1달러를 사기 위해 1,300원이 필요하다면, 원/달러 환율은 1,300원입니다.\n\n## 환율이 오르면?\n\n환율이 오른다는 것은 달러의 가치가 높아지고 원화의 가치가 떨어지는 것을 의미합니다. 이를 '원화 약세'라고 부릅니다. 환율 변동은 [금리와의 상관관계](/post/exchange-rate-and-interest-rate)를 이해하는 것이 중요합니다.\n\n- 수출 기업: 유리함 (같은 달러를 벌어도 원화로 환산하면 더 많음)\n- 수입 기업: 불리함 (같은 물건을 사도 원화가 더 많이 듦)\n- 해외 여행객: 불리함 (여행 경비 증가)\n\n이러한 현상은 [시장 전반에 큰 영향](/post/exchange-rate-market-impact)을 미치게 됩니다."
  },
  {
    slug: "exchange-rate-and-interest-rate",
    track: "exchange-rate",
    step: 2,
    prev_slug: "exchange-rate-basics",
    next_slug: "exchange-rate-market-impact",
    related: [
      "exchange-rate-basics",
      "exchange-rate-market-impact",
      "exchange-rate-investment-strategy"
    ],
    title: "환율과 금리의 상관관계",
    hook: "미국이 금리를 올리면 왜 우리나라 환율이 요동칠까요? 그 비밀을 풀어봅니다.",
    summary: "미국 연준 금리 인상이 미치는 영향과 환율의 관계.",
    content: "## 금리와 환율\n\n금리가 높은 나라의 통화 가치는 오르는 경향이 있습니다. 투자자들이 더 높은 이자를 받기 위해 그 나라의 돈을 사려고 하기 때문입니다. [환율의 기초](/post/exchange-rate-basics)에서 배운 것처럼 돈의 가치는 상대적입니다.\n\n## 미국의 금리 인상\n\n미국이 금리를 올리면 달러의 가치가 상승합니다. 이는 곧 원/달러 환율의 상승(원화 가치 하락)으로 이어집니다. 이러한 금리 변화는 [환율 변동성을 활용한 투자 전략](/post/exchange-rate-investment-strategy)을 세우는 데 핵심적인 지표가 됩니다."
  },
  {
    slug: "exchange-rate-market-impact",
    track: "exchange-rate",
    step: 3,
    prev_slug: "exchange-rate-and-interest-rate",
    next_slug: "exchange-rate-investment-strategy",
    related: [
      "exchange-rate-basics",
      "exchange-rate-and-interest-rate",
      "exchange-rate-investment-strategy"
    ],
    title: "고환율 시대, 시장의 움직임",
    hook: "환율 1,400원 돌파, 지금 주식을 사야 할까요, 팔아야 할까요?",
    summary: "고환율 시대, 주식 시장과 부동산 시장은 어떻게 움직이는가?",
    content: "## 주식 시장\n\n고환율은 외국인 투자자들의 자금 이탈을 부추길 수 있어 증시에 부정적인 영향을 미칠 수 있습니다. 이는 앞서 [환율과 금리의 상관관계](/post/exchange-rate-and-interest-rate)에서 살펴본 자본 이동의 결과입니다.\n\n## 부동산 시장\n\n환율 상승은 수입 물가 상승으로 이어져 인플레이션을 유발하고, 이는 금리 인상 압박으로 작용하여 부동산 시장에 부담을 줍니다. 시장의 흐름을 읽었다면 이제 [투자 전략](/post/exchange-rate-investment-strategy)을 고민할 때입니다."
  },
  {
    slug: "exchange-rate-investment-strategy",
    track: "exchange-rate",
    step: 4,
    prev_slug: "exchange-rate-market-impact",
    next_slug: null,
    related: [
      "exchange-rate-basics",
      "exchange-rate-and-interest-rate",
      "exchange-rate-market-impact"
    ],
    title: "환율 변동성을 활용한 투자 전략",
    hook: "위기를 기회로 바꾸는 실전 달러 투자법, 지금 바로 시작할 수 있습니다.",
    summary: "달러 ETF 및 환노출/환헤지 투자 전략.",
    content: "## 달러 투자\n\n환율 상승이 예상될 때는 달러 예금이나 달러 ETF에 투자하여 수익을 낼 수 있습니다. [고환율 시대의 시장 움직임](/post/exchange-rate-market-impact)을 파악하는 것이 우선입니다.\n\n## 환노출 vs 환헤지\n\n해외 주식이나 ETF에 투자할 때, 환율 변동에 노출시킬 것인지(환노출, UH), 환율 변동의 영향을 없앨 것인지(환헤지, H) 선택해야 합니다. [환율의 기초](/post/exchange-rate-basics)를 탄탄히 다졌다면 본인에게 맞는 전략을 선택할 수 있습니다."
  }
];

const enPosts = koPosts.map(post => ({
  ...post,
  title: post.title + " (EN)",
  hook: post.hook + " (EN)",
  summary: post.summary + " (EN)",
  content: post.content.replace(/\/post\//g, '/en/post/') + " (EN)"
}));

// Create directories
fs.mkdirSync(path.join(dataDir, 'ko', 'detail'), { recursive: true });
fs.mkdirSync(path.join(dataDir, 'en', 'detail'), { recursive: true });

// Write flow-index.json
fs.writeFileSync(path.join(dataDir, 'ko', 'flow-index.json'), JSON.stringify(koFlowIndex, null, 2));
fs.writeFileSync(path.join(dataDir, 'en', 'flow-index.json'), JSON.stringify(enFlowIndex, null, 2));

// Write detail JSONs
koPosts.forEach(post => {
  fs.writeFileSync(path.join(dataDir, 'ko', 'detail', `${post.slug}.json`), JSON.stringify(post, null, 2));
});

enPosts.forEach(post => {
  fs.writeFileSync(path.join(dataDir, 'en', 'detail', `${post.slug}.json`), JSON.stringify(post, null, 2));
});

console.log('Dummy data generated successfully.');
