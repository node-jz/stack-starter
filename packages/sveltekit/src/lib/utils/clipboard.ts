const copyToClipboard = (text: string, isHtml: boolean = false) => {
  if (isHtml) {
    const blobInput = new Blob([text], { type: 'text/html' });
    navigator.clipboard.write([new ClipboardItem({ 'text/html': blobInput })]);
  } else {
    navigator.clipboard.writeText(text);
  }
};
export default {
  copyToClipboard,
};
