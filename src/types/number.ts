export type Between<
    LENGTH extends number,
    ACC extends unknown[] = [],
> = ACC['length'] extends LENGTH
    ? ACC
    : Between<LENGTH, [...ACC,1]>

export type NumericRange<
   START_ARR extends number[], 
   END extends number, 
   ACC extends number=never>
=START_ARR['length'] extends END 
   ? ACC | END
   : NumericRange<[...START_ARR,1], END, ACC | START_ARR['length']>

   
// usage: NumericRange<Between<20>,40>

