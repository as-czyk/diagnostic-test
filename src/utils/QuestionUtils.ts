export const QuestionUtils = {
  replaceMathExpressions: (
    str: string,
    mathExpressions: any,
    mode: "unicode" | "latex" = "latex"
  ): string => {
    return str.replace(/{{(.*?)}}/g, (_, key) => {
      if (mode === "unicode") return mathExpressions[key]?.unicode;
      return `** ${mathExpressions[key]?.[mode]} **`;
    });
  },
};
