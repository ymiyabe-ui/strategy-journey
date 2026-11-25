import type { CharacterId } from "./types";

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  /** 吹き出し・名札の色 */
  color: string;
}

export const CHARACTERS: Record<CharacterId, Character> = {
  nana: {
    id: "nana",
    name: "ナナ先生",
    role: "ノースライト戦略研究所 主任コンサルタント",
    color: "#ff8c7c",
  },
  you: {
    id: "you",
    name: "あなた",
    role: "新米コンサルタント",
    color: "#74b3ff",
  },
  taisho: {
    id: "taisho",
    name: "大将",
    role: "定食屋『ひだまり亭』の店主",
    color: "#ffc247",
  },
  narrator: {
    id: "narrator",
    name: "",
    role: "",
    color: "#a8b0d0",
  },
};
