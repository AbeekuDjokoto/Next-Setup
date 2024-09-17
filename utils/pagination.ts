function generateDots({ middle, totalPages }: { middle: any; totalPages: any }) {
  const middleLen = middle.length;
  let beforeDots: any = [],
    afterDots: any = [];
  if (middle[0] > 2) {
    beforeDots = ['dots'];
  }

  if (middle[middleLen - 1] < totalPages - 1) {
    afterDots = ['dots'];
  }

  return { beforeDots, afterDots };
}

function generateMiddle({ page, totalPages }: { page: number; totalPages: number }) {
  let middle = [];

  for (let i = page - 2; i <= page; i++) {
    if (i >= 2 && i !== totalPages) {
      middle.push(i);
    }
  }

  for (let i = page + 1; i < page + 3; i++) {
    if (i < totalPages) {
      middle.push(i);
    }
  }

  return middle;
}

export { generateDots, generateMiddle };
