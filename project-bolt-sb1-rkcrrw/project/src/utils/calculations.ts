export type AspectRatioType = '16:9' | '21:9';
export type DimensionType = 'width' | 'height' | 'diagonal';

interface RatioValues {
  width: number;
  height: number;
}

export function calculateDimensionsFromInput(
  value: number,
  inputType: DimensionType,
  ratio: AspectRatioType
): { width: number; height: number; diagonal: number } {
  const ratioValues: Record<AspectRatioType, RatioValues> = {
    '16:9': { width: 16, height: 9 },
    '21:9': { width: 21, height: 9 }
  };

  const { width: ratioWidth, height: ratioHeight } = ratioValues[ratio];
  const aspectRatio = ratioWidth / ratioHeight;

  let width: number;
  let height: number;

  switch (inputType) {
    case 'width':
      width = value;
      height = width / aspectRatio;
      break;
    case 'height':
      height = value;
      width = height * aspectRatio;
      break;
    case 'diagonal':
      // Using Pythagorean theorem: d² = w² + h²
      // And aspect ratio: w = h * r
      // Solving for h: h = d / √(1 + r²)
      const r = aspectRatio;
      height = value / Math.sqrt(1 + r * r);
      width = height * r;
      break;
  }

  const diagonal = Math.sqrt(width * width + height * height);
  return { width, height, diagonal };
}