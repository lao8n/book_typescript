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