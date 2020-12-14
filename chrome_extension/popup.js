// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let supportedSites = ["www.file-upload.com", "imagetwist.com", "ibb.co", "pixxxels.cc", "www.uploadhouse.com","up4net.com"];
let download_queue = [];
function preparePorn(){
	chrome.tabs.query({}, function(tabs) {
		for (var i = 0; i < tabs.length; i++) {
			if (new RegExp(supportedSites.join("|")).test(new URL(tabs[i].url).hostname)) {
				chrome.tabs.executeScript(tabs[i].id, {file: 'change.js'});
			}
		}
	});
	download_queue = [];
	setTimeout(() => {
		chrome.tabs.query({}, function(tabs) {
			let foundTabs = [];
			for (var i = 0; i < tabs.length; i++) {
				if (new RegExp(supportedSites.join("|")).test(new URL(tabs[i].url).hostname) && (tabs[i].url.includes(".jpg") || tabs[i].url.includes(".png"))) {
					download_queue.push(tabs[i].url);
					foundTabs.push(tabs[i].id);
				}
			}
			chrome.tabs.remove(foundTabs);
		});
	}, 1000);
}
chrome.contextMenus.onClicked.addListener(function(info, tab) {
	if (info.menuItemId == "PreparePorn") {
		preparePorn();
	}
	if (info.menuItemId == "downloadImages") {
		download_queue.forEach(item => {
			let file = "";
			if (item.includes(".jpg")) {
				file = "savedImages/file.jpg"
			}else {
				file = "savedImages/file.png"
			}
			chrome.downloads.download ({
				url: item,
				filename: file,
				saveAs: false
			});
		})
	}
	if (info.menuItemId == "navigateNeswangy") {
		chrome.tabs.executeScript({ code: `if (window.location.href.startsWith("https://forums.neswangy.net/forumdisplay.php")) {
			document.querySelectorAll("a").forEach(el => {
				if(el.id.startsWith("thread_title")){
					window.open(el.href);
				}
			});
			let url = new URL(window.location.href);
			let pageNo = parseInt(url.searchParams.get("page"))+1;
			window.location = "https://forums.neswangy.net/forumdisplay.php?f=15&order=desc&page=" + pageNo;
		}`});
	}
	if (info.menuItemId == "downloadStory") {
		console.log(tab.url);
		if (tab.url.includes("facebook.com")) {
			chrome.tabs.executeScript({
				file: 'content_scripts/facebook.js'
			});
		}
		if (tab.url.includes("instagram.com/stories/")) {
			chrome.tabs.executeScript({
				file: 'content_scripts/instagram.js'
			});
		}
	}


});
chrome.runtime.onInstalled.addListener(function(details){
	chrome.contextMenus.create({
		id: "SaberHosneyDev",
		title: "SaberHosneyDev",
		contexts: ["all"]
	});

	chrome.contextMenus.create({
		id: "downloadStory",
		title: "Download Story",
		parentId: "SaberHosneyDev",
		contexts: ["all"]
	});
	chrome.contextMenus.create({
		id: "PreparePorn",
		title: "PreparePorn",
		parentId: "SaberHosneyDev",
		contexts: ["all"]
	});
	chrome.contextMenus.create({
		id: "navigateNeswangy",
		title: "Navigate Neswangy",
		parentId: "SaberHosneyDev",
		contexts: ["all"]
	});
	chrome.contextMenus.create({
		id: "downloadImages",
		title: "Download PornImages",
		parentId: "SaberHosneyDev",
		contexts: ["all"]
	});
});
chrome.runtime.onMessage.addListener(function (message, sender) {
	let date = new Date ();
	let dateString = date.getFullYear () + "-" + date.getMonth () + "-" + date.getDay ();
	let fileExtension = message.url.split ("?")[0].split (".").pop ();

	chrome.downloads.download ({
		url: message.url,
		filename: message.username + "'s " + message.site + " " + dateString + " story" + "." + fileExtension,
		saveAs: true
	});
});
