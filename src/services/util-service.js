export const utilService = {
  makeId,
  getRandomIntInc,
  saveToStorage,
  loadFromStorage,
  debounce,
  timeAgo,
  makeRandNum,
  getRandomColor,
  // applyDrag,
};

function makeRandNum() {
  return Math.trunc(Date.now() % 100);
}

function makeId(length = 5) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function getRandomIntInc(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null);
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function debounce(func, wait = 500) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function timeAgo(input) {
  const date = input instanceof Date ? +input : new Date(+input);
  const formatter = new Intl.RelativeTimeFormat('en');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      let time = formatter.format(Math.round(delta), key);
      if (time.includes('in')) {
        time = time.replace('in ', '');
        time = time.replace('ago', '');
        time += ' ago';
      }
      return time; //? time : 'Just now'
    }
  }
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// export const applyDrag = (arr, dragResult) => {
//   const { removedIndex, addedIndex, payload } = dragResult;
//   if (removedIndex === null && addedIndex === null) return arr;
//   const result = [...arr];
//   let itemToAdd = payload;
//   if (removedIndex !== null) {
//     itemToAdd = result.splice(removedIndex, 1)[0];
//   }
//   if (addedIndex !== null) {
//     result.splice(addedIndex, 0, itemToAdd);
//   }
//   return result;
// }
