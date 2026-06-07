type RichTextNode = {
  type?: string;
  text?: string;
  children?: RichTextNode[];
};

export function richTextToParagraphs(value: any): string[] {
  const rootChildren = value?.root?.children;
  if (!Array.isArray(rootChildren)) return [];

  return rootChildren
    .filter((node) => node?.type === "paragraph")
    .map((node) => collectNodeText(node).trim())
    .filter(Boolean);
}

function collectNodeText(node: RichTextNode): string {
  if (!node) return "";
  if (typeof node.text === "string") return node.text;
  if (!Array.isArray(node.children)) return "";
  return node.children.map(collectNodeText).join("");
}
