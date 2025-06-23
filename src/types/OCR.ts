export interface ResultItem {
  "통신사": string,
  "요금제 이름": string,
  "요금제 금액": string,
  "실 납부금액": string
}

export interface ChatResult {
  "item": ResultItem,
  "message": string
}
