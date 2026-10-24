var titles = [
  "@",
  "@i",
  "@ia",
  "@iam",
  "@iam_",
  "@iam_L",
  "@iam_Le",
  "@iam_Leo",
  "@iam_Leoo",
  "@iam_Leo",
  "@iam_Le",
  "@iam_L",
  "@iam_",
  "@iam",
  "@ia",
  "@i",
  "@",
];

function changeTitle() {
  var index = 0;

  setInterval(function() {
      document.title = titles[index];
      index = (index + 1) % titles.length;
  }, 1000);
}

changeTitle();
