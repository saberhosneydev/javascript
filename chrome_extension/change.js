if (window.location.hostname == "www.file-upload.com") {
	if (document.querySelectorAll(".mnbt1")[1] === undefined) {
		if (document.querySelector("#downloadbtn") === undefined) {
			document.querySelector("#download-btn").click();
		}else {
			document.querySelector("#downloadbtn").click();
		}
	}else {
		document.querySelectorAll(".mnbt1")[1].click();
	}
}
if (window.location.hostname == "imagetwist.com") {
	document.querySelectorAll(".ddownloader")[0].click();
}
if (window.location.hostname == "ibb.co") {
	if (window.location.href.startsWith("https://ibb.co/album/")) {
		Array.from(document.querySelectorAll(".image-container")).forEach(image => {
			window.open(`${image.children[0].src}`, "_blank");
		});
	}else {
		document.querySelector(".btn-download").click();
	}
}

if (window.location.hostname == "pixxxels.cc") {
	window.location = document.getElementById("download").href.slice(0, -5);
}
if (window.location.hostname == "www.uploadhouse.com") {
	document.querySelectorAll("a").forEach(item => {
		if (item.innerHTML == "Click here to DOWNLOAD") {
			item.click();
			window.close();
		}
	});
}