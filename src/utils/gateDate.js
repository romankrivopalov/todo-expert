class Dates {
  now = new Date();
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  getNumDay = () => {
    return this.now.getDate();
  }

  getYear = () => {
    return this.now.getFullYear();
  }

  getMonth = () => {
    const month = this.now.getMonth();

    return { name: this.months[this.now.getMonth()], num: month.length > 1 ? month : `0${month}`};
  }

  // метод возвращает массив дат по неделям
  getAllDaysOfMonth = () => {
    // номер дня недели первого числа месяца
    const numFirstDayMonthOfWeek = new Date(this.getYear(), this.now.getMonth(), 1).getDay()
    // количество дней в прошлом месяце
    const numDayOfLastMonth = new Date(this.getYear(), this.now.getMonth(), 0).getDate();
    const numDayOfMonth = new Date(this.getYear(), this.now.getMonth() + 1, 0).getDate();
    const firstWeek = [];
    const secondWeek = [];
    const thirdWeek = [];
    const fourthWeek = [];
    const fifthWeek = [];

    let countA = 0;
    let countB = 1;
    let countC = 1;

    // первая неделя
    for (let i = 0; i < 7; i++) {
      // если первый день месяца понедельник
      if (numFirstDayMonthOfWeek === 1) {
        firstWeek.push(i + 1);
      } else {
        // из общего количества дней вычитаем номер дня недели и добавляем счётчик
        // чтобы определить, когда начинается новый месяц, чтобы добавить их в массив
        const res = numDayOfLastMonth - (numFirstDayMonthOfWeek - 2) + countA;

        // если результат больше, добавляем второй счётчик с 1 числа
        if (res > numDayOfLastMonth) {
          firstWeek.push(countB);

          countB++
        }

        // если результат меньше
        if (res <= numDayOfLastMonth) {
          firstWeek.push(res);

          countA++
        }
      }
    }

    for (let i = firstWeek[6]; i < firstWeek[6] + 7; i++) secondWeek.push(i + 1);
    for (let i = secondWeek[6]; i < secondWeek[6] + 7; i++) thirdWeek.push(i + 1);
    for (let i = thirdWeek[6]; i < thirdWeek[6] + 7; i++) fourthWeek.push(i + 1);

    // последняя неделя
    for (let i = fourthWeek[6]; i < numDayOfLastMonth; i++) {
      let res = numDayOfMonth - i;

      if (res > 0) {
        fifthWeek.push(i + 1);
      } else {
        fifthWeek.push(countC);

        countC++
      }
    }

    return [ firstWeek, secondWeek, thirdWeek, fourthWeek, fifthWeek ]
  }
}

const dates = new Dates()

export default dates
