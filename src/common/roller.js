export const randomFace = sides => {
  return Math.floor((Math.random() * sides)) + 1;
}


export const roll = dice => {
  dice = dice.replace(/- */,'+ -');
  dice = dice.replace(/D/,'d');
  var re = / *\+ */;
  var items = dice.split(re);
  var res = [];
  var type = [];
  for ( let i=0; i<items.length; i++) {
    var match = items[i].match(/^[ \t]*(-)?(\d+)?(?:(d)(\d+))?[ \t]*$/);
    if (match) {
      var sign = match[1]?-1:1;
      var num = parseInt( match[2] || "1", 10);
      var max = parseInt( match[4] || "0", 10);
      if (match[3]) {
        for (let j=1; j<=num; j++) {
          res[res.length] = sign * Math.ceil(max*Math.random());
          type[type.length] = max;
        }
      }
      else {
        res[res.length] = sign * num;
        type[type.length] = 0;
      }
    }
    else return null;
  }
  if (res.length === 0) return null;
  return {"res":res, "type":type};
}
