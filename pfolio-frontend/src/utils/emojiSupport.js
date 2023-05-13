import emoji from "node-emoji";

export const emojiSupport = (text) => {
  return emoji.emojify(text);
};
