const url = 'https://appforcestudio.com/playground/-Or2_064HglaboH_I8pk';
fetch(url)
  .then(res => res.text())
  .then(text => console.log(text.substring(0, 5000)))
  .catch(console.error);
