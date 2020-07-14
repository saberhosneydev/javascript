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
if (window.location.hostname == "ibb.co") {
	document.querySelector(".btn-download").click();
}
if (window.location.hostname == "www.uploadhouse.com") {
	document.querySelectorAll("a").forEach(item => {
		if (item.innerHTML == "Click here to DOWNLOAD") {
			item.click();
			window.close();
		}
	});
}
if (window.location.hostname == "forums.neswangy.net") {
	document.querySelectorAll("a").forEach(el => {
		if(el.id.startsWith("thread_title")){
		 	window.open(el.href);
		}
	});
	let url = new URL(window.location.href);
	let pageNo = parseInt(url.searchParams.get("page"))+1;
	window.location = "https://forums.neswangy.net/forumdisplay.php?f=15&order=desc&page=" + pageNo;
}

