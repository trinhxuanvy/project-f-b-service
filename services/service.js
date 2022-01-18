exports.randomStr = (length) => {
  var result = "";
  var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lower = "abcdefghijklmnopqrstuvwxyz";
  var number = "0123456789";
  var upperLength = upper.length;
  var lowerLength = lower.length;
  var numberLength = number.length;

  for (var i = 0; i < 2; i++) {
    result += upper.charAt(Math.floor(Math.random() * upperLength));
  }
  for (var i = 0; i < 3; i++) {
    result += lower.charAt(Math.floor(Math.random() * lowerLength));
  }
  for (var i = 0; i < 3; i++) {
    result += number.charAt(Math.floor(Math.random() * numberLength));
  }

  return result.shuffle();
};

String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};
