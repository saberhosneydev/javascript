var imgs = document.querySelectorAll ("img")
if (imgs.length == 2) {
    let storyUrl = imgs[0].src;
    let videos = document.querySelectorAll ("video");
    if (videos.length == 1){
        storyUrl = videos[0].children[0].src;
    }
    let username = document.querySelectorAll ("a")[1].innerText;
    chrome.runtime.sendMessage (null, {
        site: "instagram",
        username: username,
        url: storyUrl
    });
} else {
    chrome.runtime.sendMessage (null, { noStories:true });
}