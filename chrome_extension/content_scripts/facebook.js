var profile_pic = document.querySelector ("a[role=link][tabindex='0']>img");
var story = document.querySelectorAll("img[draggable=false]");

if (profile_pic != null && top.location.toString().indexOf("stories") != -1) {
	let videos = document.querySelectorAll("video");
	let username = profile_pic.alt;
	if (videos.length > 0) {
		let script = document.createElement("script");
		script.innerText = `
        document.head.setAttribute('SSvideoURL','null');
		videos = document.querySelectorAll('video'); 
        videoUrl = null; 
		for (var i=videos.length - 1;i >= 0;i--) {
            var reactKey = '';
            keys = Object.keys(videos[i]);
            for (var j=0;j<keys.length;j++) { 
				if (keys[j].indexOf ('__reactFiber') != -1) {
					reactKey = keys[j].split('__reactFiber')[1];
                    break;
				}
			}
            try {
                videoUrl = videos[i].parentElement.parentElement.parentElement.parentElement['__reactProps'+reactKey].children[0].props.children.props.implementations[1].data.hdSrc;
            } catch (e){ }
            if (videoUrl == null){
                try {
                    videoUrl = videos[i].parentElement.parentElement.parentElement.parentElement['__reactProps'+reactKey].children[0].props.children.props.implementations[1].data.sdSrc;
                } catch (e){ }
            }
            if (videoUrl == null){
                try {
                    videoUrl = videos[i].parentElement.parentElement.parentElement.parentElement['__reactProps'+reactKey].children.props.children.props.implementations[1].data.hdSrc;
                } catch (e){ }
            }
            if (videoUrl == null){
                try {
                    videoUrl = videos[i].parentElement.parentElement.parentElement.parentElement['__reactProps'+reactKey].children.props.children.props.implementations[1].data.sdSrc;
                } catch (e){ }
            }
            if (videoUrl == null){
                try {
                    videoUrl = videos[i]['__reactFiber'+reactKey].return.stateNode.props.videoData.$1.hd_src;
                } catch (e){ }
            }
            if (videoUrl == null){
                try {
                    videoUrl = videos[i]['__reactFiber'+reactKey].return.stateNode.props.videoData.$1.sd_src;
                } catch (e){ }
            }
            if (videoUrl != null)
                break;
		}
		document.head.setAttribute('SSvideoURL',videoUrl);`;
		document.head.append (script);
		setTimeout (() => {
            let videoURL = document.head.getAttribute("SSvideoURL");
            if (videoURL == "null") {
                savePhotoStory ();
            } else {
                chrome.runtime.sendMessage (null, {
                    site: "facebook",
                    username: username,
                    url: videoURL
                });
            }
		}, 300);
	} else {
		savePhotoStory ();
	}
} else {
    chrome.runtime.sendMessage (null, { noStories:true });
}
function savePhotoStory (){
    story = story[story.length-1];
    let storyUrl = story.src;
    let username = profile_pic.alt;
    chrome.runtime.sendMessage (null, {
        site: "facebook",
        username: username,
        url: storyUrl
    });
}