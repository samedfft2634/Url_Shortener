// variables
const shortBtn = document.getElementById("shortBtn");
const removeBtn = document.getElementById("removeBtn");
const inputUrl = document.getElementById("inputUrl");
const shortUrl = document.getElementById("shortUrl");
const clipBoard = document.getElementById("clipBoard");
const goLink = document.getElementById("goLink");
const goSource = document.getElementById("goSource");
const content = document.getElementById("content");
const results = document.getElementById("results");

const getData = async () => {
	const response = await fetch(
		`https://tinyurl.com/api-create.php?url=` +
			encodeURIComponent(inputUrl.value)
	);
	if (response.status == 200) {
		const data = await response.text();
		shortUrl.value = data;
	} else {
		inputUrl.value = "";
		content.innerHTML = `<h1 style="text-align:center; color: #fff">Invalid URL ‼</h1>`;
		const body = document.querySelector("body");
		body.style.flexDirection = "column";
		setTimeout(() => {
			content.innerHTML = ``;
			body.style.flexDirection = "row";
		}, 2000);
	}
};
inputUrl.addEventListener("focus",()=> inputUrl.value = "")
shortBtn.addEventListener("click", getData);
removeBtn.addEventListener("click", () => {
	shortUrl.value = "";
	inputUrl.value = "";
	goSource.href = "#";
	goSource.target = "";
});
goLink.addEventListener("click", () => {});

const copyClip = () => {
	if (shortUrl.value.trim() ) {
		const url = document.getElementById("shortUrl");
		url.select();
		document.execCommand("copy");
		results.textContent = "Copied ✅";
		results.style.color = "green";
		results.style.textAlign = "end";
		timeOut();
	} else {
		results.textContent = "No  link 👻";
		results.style.color = "#fff";
		results.style.textAlign = "end";
		timeOut();
	}
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
		if(inputUrl.value && !shortUrl.value){
			Swal.fire({
				position: "center",
				icon: "info",
				title: "Short it before go link!",
				showConfirmButton: false,
				timer: 1000,
			});
		}else{
			swal()
		}
	}
});

const swal = () => {
	Swal.fire({
		position: "center",
		icon: "question",
		title: "No link found!",
		showConfirmButton: false,
		timer: 1000,
	});
};

const timeOut = () => {
	setTimeout(() => {
		results.textContent = "";
		results.style.color = "#000";
		results.style.textAlign = "";
	}, 1000);
};

// Try link for debugging : //https://www.youtube.com/watch?v=foa1jeLLXI0