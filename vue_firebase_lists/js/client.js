var firebaseConfig = {
	apiKey: "AIzaSyAk3SIJrDFe33CzKMINKLqBFDwUNAWFM34",
	authDomain: "tester-2c6ad.firebaseapp.com",
	databaseURL: "https://tester-2c6ad.firebaseio.com",
	projectId: "tester-2c6ad",
	storageBucket: "tester-2c6ad.appspot.com",
	messagingSenderId: "657723668202",
	appId: "1:657723668202:web:53ffb8ca16089ad7774993",
	measurementId: "G-E8QXZ0PW7G"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
let guid = null;
let list_id = null;
let lists = db.collection("lists");
let items = db.collection("items");
var app = new Vue({
	el: '#app',
	data: {
		message: 'Login to access your dashboard !',
		passwordLength: 0,
		loggedIn: false
	},
	methods: {
		register: function (event) {
			event.preventDefault();
			let email = document.querySelector("#inputEmailRegister");
			let password = document.querySelector("#inputPasswordRegister");
			firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode);
				console.log(errorMessage);
			});
			document.querySelector("#registerModal .close").click();
		},
		login: function (event) {
			event.preventDefault();
			let email = document.querySelector("#inputEmail");
			let password = document.querySelector("#inputPassword");
			firebase.auth().signInWithEmailAndPassword(email.value, password.value).catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
			document.querySelector("#loginModal .close").click();
		},
		signout: function () {
			firebase.auth().signOut().then(function () {
				this.loggedIn = false;
			}).catch(function (error) {
				console.log(error);
			});
		},
		createList: function (event) {
			event.preventDefault();
			let name = document.querySelector("#listName");
			lists.add({
				name: name.value,
				uid: guid
			})
				.then(function (docRef) {
					console.log("Document written with ID: ", docRef.id);
					updatePage();
					document.querySelector("#createListModal .close").click();
				})
				.catch(function (error) {
					console.error("Error adding document: ", error);
				});
		},
		deleteList: function (id) {
			lists.doc(id).delete().then(function () {
				console.log("Document successfully deleted!");
				updatePage();
				document.querySelector("#confirmDeleteModal .close").click();
			}).catch(function (error) {
				console.error("Error removing document: ", error);
			});
		}
	}
});
function checkLength() {
	let password = document.querySelector("#inputPasswordRegister");
	app.$data.passwordLength = password.value.length;
}
function updatePage() {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
			guid = uid;
			app.$data.loggedIn = true;
			getLists();
			app.$forceUpdate();
		} else {
			app.$data.loggedIn = false;
			app.$forceUpdate();
		}
	});
}
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		var providerData = user.providerData;
		guid = uid;
		app.$data.loggedIn = true;
		getLists();
		app.$forceUpdate();
	} else {
		app.$data.loggedIn = false;
		app.$forceUpdate();
	}
});
function getLists() {

	lists.where("uid", "==", guid).get()
		.then(function (querySnapshot) {
			let x = document.querySelector("#listsTable");
			x.innerHTML = "";
			querySnapshot.forEach(function (doc) {
				x.innerHTML += `
				<li class="list-group-item">
				<a href="#${doc.id}" id="${doc.id}" class="link-dark pt-0" onclick="document.querySelector('#itemsHeader').innerHTML = '${doc.data().name} - items';getItems('${doc.id}');">${doc.data().name}</a>
				<a href="#" class="d-inline-block ml-2 link-danger" id="${doc.id}" onclick="changeOnClick('${doc.id}')" data-toggle="modal" data-target="#confirmDeleteModal">
					<i class="gg-trash"></i>
				</a>
			</li>
				`;
			});

		})
		.catch(function (error) {
			console.log("Error getting documents: ", error);
		});
}
function getItems(id) {
	items.where("list_id", "==", id).get()
		.then(function (querySnapshot) {
			let x = document.querySelector("#itemsTable");
			x.innerHTML = "";
			querySnapshot.forEach(function (doc) {
				x.innerHTML += `
				<li class="list-group-item">
				<a href="#${doc.id}" id="${doc.id}" class="link-dark pt-0" onclick="document.querySelector('#itemsHeader').innerHTML = '${doc.data().name} - items';getItems('${doc.id}');">${doc.data().name}</a>
				<a href="#" class="d-inline-block ml-2 link-danger" id="${doc.id}" onclick="changeOnClick('${doc.id}')" data-toggle="modal" data-target="#confirmDeleteModal">
					<i class="gg-trash"></i>
				</a>
			</li>
				`;
			});
		})
		.catch(function (error) {
			console.log("Error getting documents: ", error);
		});
}
function changeOnClick(id) {
	document.getElementById("confirmDelete").setAttribute("onClick", "app.deleteList('" + id + "')");
}