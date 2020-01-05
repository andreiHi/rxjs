import {Subject, BehaviorSubject, ReplaySubject} from 'rxjs'
//Subject является по сути тем же Observable с доп функционалом кот позваляют емитеть новые события

document.addEventListener('click', () => {
    const stream$ = new Subject();
    stream$.subscribe(value => console.log('Value: ', value)); // нужно подписаться и потом можно емитеть
    stream$.next('Hello'); // не обязательно при создании как в случае с Observable
    stream$.next('RX');
    stream$.next('Js');

    const stream2$ = new BehaviorSubject('First Value'); // тоже самое что и Subject только нужно что то передать в конструктор
    stream2$.subscribe(value => console.log('Value: ', value)); // нужно подписаться и потом можно емитеть
    stream2$.next('Hello BehaviorSubject'); // не обязательно при создании как в случае с Observable
    // если подписаться полле нескольких емитов то будет выведен последний емит

    const replay$ = new ReplaySubject(1); // буфер указывает сколько последних сообщений сохранить
    replay$.next('replay ');
    replay$.next('RXjs replace  ');
    replay$.subscribe(v => console.log(v)); // ReplaySubject позволяет вначале емитеть а потом подписаться и все будет сохранено

});