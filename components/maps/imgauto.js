const element = document.getElementById("map");
const canvas = document.createElement("canvas");
// Canvas boyutlarını ayarlayın.
const width = 750;
const height = 750;
canvas.width = width;
canvas.height = height;
// Canvas'a HTML elementini aktarın.
const context = canvas.getContext("2d");
const html = document.querySelector("html");
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
context.clearRect(0, 0, windowWidth, windowHeight);
context.drawImage(html, 0, 0, width, height);
// Canvas'ı görüntü olarak kaydedin.
const img = canvas.toDataURL("image/png");
const xhr = new XMLHttpRequest();
console.log(img);
xhr.open("POST", "https://localhost:44347/postimage");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
xhr.send(JSON.stringify({ image: img }));
