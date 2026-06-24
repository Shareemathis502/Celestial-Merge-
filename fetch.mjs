async function check() {
  try {
    const resp = await fetch('https://r.jina.ai/https://appforcestudio.com/playground/-Or2_064HglaboH_I8pk');
    const text = await resp.text();
    console.log(text.substring(0, 5000));
  } catch (e) {
    console.error(e);
  }
}
check();
