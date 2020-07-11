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
	document.querySelectorAll(".btn-success")[1].click();
}