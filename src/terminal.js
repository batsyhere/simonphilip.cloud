document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      let input = prompt("> What is your code?");
      if (input === "Justice") {
        window.location.href = "https://github.com/batsyhere";
      } else {
        alert("ACCESS DENIED");
      }
    }
  });
  