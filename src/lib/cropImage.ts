/**
 * Utilidad para recortar imágenes usando canvas
 */

export interface Area {
  x: number
  y: number
  width: number
  height: number
}

/**
 * Crea una imagen a partir de una URL
 */
export function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })
}

/**
 * Obtiene la orientación de rotación de una imagen
 */
export function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180
}

/**
 * Calcula el nuevo tamaño del bounding box después de rotación
 */
export function rotateSize(
  width: number,
  height: number,
  rotation: number
): { width: number; height: number } {
  const rotRad = getRadianAngle(rotation)
  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  }
}

/**
 * Recorta y opcionalmente rota una imagen
 * Retorna un Blob de la imagen recortada
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<Blob | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return null
  }

  const rotRad = getRadianAngle(rotation)

  // Calcular tamaño del bounding box de la imagen rotada
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  )

  // Establecer tamaño del canvas para que coincida con el bounding box
  canvas.width = bBoxWidth
  canvas.height = bBoxHeight

  // Trasladar el canvas al centro del bounding box
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
  ctx.rotate(rotRad)
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
  ctx.translate(-image.width / 2, -image.height / 2)

  // Dibujar la imagen rotada
  ctx.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')
  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    return null
  }

  // Establecer el tamaño del canvas recortado al tamaño del área de recorte
  croppedCanvas.width = pixelCrop.width
  croppedCanvas.height = pixelCrop.height

  // Dibujar la porción recortada de la imagen rotada
  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // Retornar como Blob
  return new Promise((resolve) => {
    croppedCanvas.toBlob(
      (blob) => {
        resolve(blob)
      },
      'image/jpeg',
      0.95 // Calidad de compresión
    )
  })
}

/**
 * Convierte un Blob a File
 */
export function blobToFile(blob: Blob, fileName: string): File {
  return new File([blob], fileName, { type: blob.type, lastModified: Date.now() })
}
