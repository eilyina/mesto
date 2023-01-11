function evil(n) {
  const binaryN = n.toString(2);
  console.log(binaryN);
  let counter = 0;

  for (let i = 0; i < 7; i++) {
    if (binaryN[i] == '1') {
      counter = counter++;
    };
  };
  if (counter % 2 == 0) {
    console.log("It's Evil!");

  } else {
    console.log("It's Odious!");
  }
}
