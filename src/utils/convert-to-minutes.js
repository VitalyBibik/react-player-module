export default (time) => {
    let time1 = Math.round(time);
  return ((time1 - (time1 %= 60)) / 60 + (9 < time1 ? ':' : ':0') + time1);
   }
