type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
// type Day = Weekday | 'Sat' | 'Sun'

let nextWorkingDayNoKeyError: Weekday = {
    Mon: 'Tue',
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Sat',
}
// Type '{ Mon: string; Tue: string; Wed: string; Thu: string; Fri: string; }' is not assignable to type 'Weekday'.

let nextWorkingDayNoRecordError: { [weekday: Weekday]: Weekday } = {
    Mon: 'Tue',
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Mon',
}
// An index signature parameter type cannot be a literal type or generic type. Consider using a mapped object type instead.ts(1337)

// defines key and value
let nextWorkingDay: Record<Weekday, Weekday> = {
    Mon: 'Tue',
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Mon',
}

let nextWorkingDayRecordError: Record<Weekday, Weekday> = {
    Mon: 'Tue'
}
// Type '{ Mon: "Tue"; }' is missing the following properties from type 'Record<Weekday, Day>': Tue, Wed, Thu, Frits(2739)

let nextWorkingDayMappedType: { [K in Weekday]: Weekday } = {
    Mon: 'Tue',
    Tue: 'Wed',
    Wed: 'Thu',
    Thu: 'Fri',
    Fri: 'Mon',
}

let nextWorkingDayMappedTypeError: { [K in Weekday]: Weekday } = {
    Mon: 'Tue',
}
// Error TS2739: Type '{Mon: "Tue"}' is missing the following properties from type '{Mon: Weekday; Tue: Weekday; Wed: Weekday; Thu: Weekday; Fri: Weekday}': Tue, Wed, Thu, Fri.




// without distribution over conditional types
type Without<T, U> = T extends U ? never : T
type A = Without<boolean | number | string, boolean>
// if there was no distribution then you couldn't do 
type ADistributed = Without<boolean, boolean>
    | Without<number, boolean>
    | Without<string, boolean>
// instead you would go straight to definition with 
typeANoDistribution = boolean | number | string extends boolean ? never : boolean | number | string
// it does not extend so you get never back

type ElementType<T> = T extends unknown[] ? T[number] : T // if it is an array then extract type by indexing array
type AGeneric = ElementType<number[]> // number
type ATest = ElementType<string[]> // string
// use infer instead
type ElementType2<T> = T extends (infer U)[] ? U : T
type B = ElementType2<number[]> // number

// where [].slice is a function 
type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never
// Get the type of Array.slice
// (method) Array<any>.slice(start?: number | undefined, end?: number | undefined): any[]
type F = typeof Array['prototype']['slice']
type A = SecondArg<F> // number | undefined