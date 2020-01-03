/**
 * @name merge
 * merge classes and return string
 * @param pClasses
 */
export function merge(pClasses: string[]): string | null {
  // check
  if (pClasses.length === 0) return null

  return pClasses
    // concate sub array item if exist
    .reduce((a: string, b: string) => a.concat(b), [] as any)
    // fitler empty values
    .filter((v: any) => v)
    // join array entries as string
    .join(" ")


}






