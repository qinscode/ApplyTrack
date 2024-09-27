import { useMemo } from "react";

const useHTMLToPlainText = (htmlContent) => {
  return useMemo(() => {
    const temp = document.createElement("div");
    temp.innerHTML = htmlContent;
    const text = temp.textContent || temp.innerText || "";
    return text.replace(/\s+/g, " ").trim();
  }, [htmlContent]);
};

const HTMLToPlainTextCell = ({ htmlContent }) => {
  const plainText = useHTMLToPlainText(htmlContent);

  return { plainText };
};

export default HTMLToPlainTextCell;
