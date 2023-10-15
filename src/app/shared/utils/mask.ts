export class GlobalMask {
  //Método para apliar con 0 a la derecha la máscara .
  static modifyMask(mask: string, length: number) {
    if (mask.match(/[\\]/g)?.length > 0) {
      length += mask.match(/[\\]/g).length;
    }
    mask = mask + 'Y'.repeat(length - mask.length);
    return mask;
  }
}
