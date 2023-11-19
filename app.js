// variables
const shortBtn = document.getElementById("shortBtn");
const removeBtn = document.getElementById("removeBtn");
const inputUrl = document.getElementById("inputUrl");
const shortUrl = document.getElementById("shortUrl");
const clipBoard = document.getElementById("clipBoard");
const goLink = document.getElementById("goLink");
const goSource = document.getElementById("goSource");
const content = document.getElementById("content");

const getData = async () => {
	const response = await fetch(
		`https://tinyurl.com/api-create.php?url=` +
			encodeURIComponent(inputUrl.value)
	);
	if (response.ok) {
		const data = await response.text();
		shortUrl.value = data;
	} else {
		content.innerHTML = `<h1 style="text-align:center; color: #fff">Invalid URL ‼</h1>`;
		const body = document.querySelector("body");
		body.style.flexDirection = "column";
		setTimeout(() => {
			content.innerHTML = ``;
			body.style.flexDirection = "row";
		}, 2000);
	}
};

shortBtn.addEventListener("click", getData);
removeBtn.addEventListener("click", () => {
	shortUrl.value = "";
	inputUrl.value = "";
});
goLink.addEventListener("click", () => {});

const copyClip = () => {
	const url = document.getElementById("shortUrl");
	url.select();
	document.execCommand("copy");
	shortUrl.value = "Copied ✅";
	shortUrl.style.color = "green";
	shortUrl.style.textAlign = "end";
};
clipBoard.addEventListener("click", copyClip);

shortUrl.addEventListener("input", () => {
	shortUrl.value = shortUrl.value.slice(0, -1);
});

goSource.addEventListener("click", () => {
	if (shortUrl.value) {
		goSource.href = shortUrl.value;
		goSource.target = "_blank";
	} else {
		alert("Bulunamadi.");
	}
});
//https://www.youtube.com/watch?v=foa1jeLLXI0
