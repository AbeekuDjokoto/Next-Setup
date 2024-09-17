import React from 'react';

import copy from 'clipboard-copy';

export function useCopyToClipBoard() {
  const [isCopying, setIsCopying] = React.useState(false);
  const handleCopyClick = async (text: string) => {
    setIsCopying(true);
    setTimeout(async function coping() {
      try {
        await navigator.clipboard.writeText(text);
        await copy(text);
      } catch (error) {
        console.error('Copy to clipboard failed:', error);
      } finally {
        setIsCopying(false);
      }
    }, 1000);
  };

  return {
    isCopying,
    handleCopyClick,
  };
}
