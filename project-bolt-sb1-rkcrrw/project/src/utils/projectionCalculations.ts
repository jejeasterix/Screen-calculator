export interface ProjectionValues {
  throwDistance?: number;
  minThrowRatio?: number;
  maxThrowRatio?: number;
  imageWidth?: number;
}

export function calculateProjectionValues(values: ProjectionValues): ProjectionValues {
  const result: ProjectionValues = { ...values };

  // Si on a la distance et la largeur, on peut calculer les ratios
  if (values.throwDistance && values.imageWidth) {
    const ratio = values.throwDistance / values.imageWidth;
    result.minThrowRatio = ratio;
    result.maxThrowRatio = ratio;
  }
  // Si on a les ratios et la largeur, on peut calculer les distances
  else if ((values.minThrowRatio || values.maxThrowRatio) && values.imageWidth) {
    if (values.minThrowRatio) {
      result.throwDistance = values.imageWidth * values.minThrowRatio;
    }
    if (values.maxThrowRatio) {
      result.throwDistance = values.imageWidth * values.maxThrowRatio;
    }
  }
  // Si on a les ratios et la distance, on peut calculer la largeur
  else if ((values.minThrowRatio || values.maxThrowRatio) && values.throwDistance) {
    if (values.minThrowRatio) {
      result.imageWidth = values.throwDistance / values.minThrowRatio;
    }
    if (values.maxThrowRatio) {
      result.imageWidth = values.throwDistance / values.maxThrowRatio;
    }
  }

  return result;
}
