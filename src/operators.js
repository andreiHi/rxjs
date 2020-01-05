import {fromEvent, interval} from "rxjs";
import {filter, map, reduce, scan, switchMap, take, takeLast, tap} from "rxjs/operators";

const stream$ = interval(1000)
    .pipe(
        tap(v => console.log('Tap ', v)), // используется для дебага
        map(value => value * 3),
        filter(value => value % 2 === 0),
        take(10), // указывает сколько значений нужно получить
        takeLast(5) // выводит только последние 5
    );

// stream$.subscribe({
//     next: v => console.log('Next ', v),
//     error: err => console.log('Error', err),
//     complete: () => console.log('complete')
// });
//
// const stream2$ = interval(1000)
//     .pipe(
//         scan((acc, value) => acc + value, 0) // складывает значения в аккамулятор и seed начальное значение
//
//     );
//
// stream2$.subscribe({
//     next: v => console.log('Next ', v),
//     error: err => console.log('Error', err),
//     complete: () => console.log('complete')
// });

const stream3$ = interval(1000)
    .pipe(
        tap(v=> console.log('Tap ', v)),
        take(5),
        reduce((acc, value) => acc + value, 0) // складывает значения в аккамулятор и seed начальное значение
        // выполняется только при завершении стрима
    );


stream3$.subscribe({
    next: v => console.log('Next ', v),
    error: err => console.log('Error', err),
    complete: () => console.log('complete')
});
//объединение стримов
fromEvent(document, 'click')
    .pipe(
        switchMap((event) =>{
            return interval(500)
                .pipe(
                    tap(v => console.log(v)),
                    take(5),
                    reduce((acc, value) => acc + value, 0)
                );
        })
    )
    .subscribe({
        next: value => console.log(value),
        complete: () => console.log('complete')
    });