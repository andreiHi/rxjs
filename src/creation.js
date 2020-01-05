import {of, from, Observable, fromEvent, interval, timer, range} from 'rxjs'
import {map, scan} from "rxjs/operators";

let stream$ = of(1, 2, 3, 4, 5, 6, 7); //создание стрима с помощью метода of

stream$.subscribe(value => {
    console.log('Value: ', value);
});

let array$ = from([1, 2, 3, 4]) //работает схожим образом как и of только с массивами
    .pipe(  // позволяет добавить оператор к стриму
        scan((acc, val) => acc.concat(val), []) // объединяет значения в массив элементы будут выводится по мере добавления
    );
array$.subscribe(value => {
    console.log(value);
});

const stream2$ = new Observable(observer => {
    observer.next('First value');
    setTimeout(() => observer.next('After 1000 ms'), 1000);
    setTimeout(() => observer.error('Something went wrong'), 2000);  // обработку ошибок нужно производить в методе subscribe
    setTimeout(() => observer.next('After 3000 ms'), 3000);
    setTimeout(()=> observer.complete(), 1500)  // устанавливает потоку статус завершенности
});

stream2$.subscribe(
    value => console.log(value),
    error => console.log(error),   // обработка ошибок
    () => console.log('Complete')  // вызовится только в случае если небыло ошибок и стрим завершен
);
//альтернативная запись того что выше
stream2$.subscribe({
    next(val) {
        console.log(val);
    },
    error(err) {
        console.log(err);
    },
    complete() {
        console.log('Complete');
    }
});

fromEvent(document.querySelector('canvas'), 'mousemove') // создает стрим из события
    .pipe(
        map(event => ({
            x: event.offsetX,
            y: event.offsetY,
            context: event.target.getContext('2d')
        }))
    )
    .subscribe(pos =>{
        pos.context.fillRect(pos.x, pos.y, 2, 2);

    });

const clear$ = fromEvent(document.getElementById('clear'), 'click');

clear$.subscribe(() => {
    const canvas = document.querySelector('canvas');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
});

let sub = interval(500).subscribe(v=> console.log(v));

setTimeout(()=> {
    sub.unsubscribe();
}, 2000);

timer(2500).subscribe(value => console.log('timer ', value));

range(42, 10).subscribe(value => console.log('range ', value));

const click$ = Observable.create(
    function subscribe (observer) {
        const listener = function (ev) {
            observer.next(ev);
        };
        document.addEventListener('click', listener);
    }
);