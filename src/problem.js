import {interval, pipe} from 'rxjs'
import {filter, map, scan, take} from 'rxjs/operators'
const btn = document.getElementById('interval');
const rxjsBtn = document.getElementById('rxjs');
const display = document.querySelector('#problem .result');

const people = [
  {name: 'Vladilen', age: 25},
  {name: 'Elena', age: 17},
  {name: 'Ivan', age: 18},
  {name: 'Igor', age: 14},
  {name: 'Lisa', age: 32},
  {name: 'Irina', age: 23},
  {name: 'Oleg', age: 20}
];

// вывод при клике на кнопку свех людей из массива  которым более 18 лет  интервалом в 1 сек
// решение с помощью js

btn.addEventListener('click', () => {
  btn.disabled = true;
  let i = 0;
  const canDrink = [];
  const interval = setInterval(() => {
    if (people[i]) {
      if (people[i].age >= 18) {
        canDrink.push(people[i].name);
      }
      display.textContent = canDrink.join(' ');
      i++;
    } else {
      clearInterval(interval); // если перебор массива завершен то нужно прервать интервал
      btn.disabled = false;
    }
  }, 500)
});
// решение с помощью rxJs
rxjsBtn.addEventListener('click', () => {
  rxjsBtn.disabled = true;
  interval(500)
      .pipe(
          take(people.length - 1), // сколько элементов нужно взять т.е стрим будет работать данное количество раз
          filter(v => people[v].age >= 18),
          map(v => people[v].name),
          scan((acc, value) => acc.concat(value), []) // позволяет аккамулировать данные в массив
      ).subscribe(res => {
        console.log(res);
        display.textContent = res.join(' ');
        rxjsBtn.disabled = false;
      }, null,     // второй колбэк(null) обрабатывает ошибки
      rxjsBtn.disabled = false) // третий вызывается в случае успешно отработанного стрима
});
display.textContent = 'asasass';