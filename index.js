var firebaseConfig = {
    apiKey: "AIzaSyDNSIN-14G4hJE96HzX4OxR3_cZVPzSrpA",
  authDomain: "admchat-8dca7.firebaseapp.com",
  databaseURL: "https://admchat-8dca7-default-rtdb.firebaseio.com",
  projectId: "admchat-8dca7",
  storageBucket: "admchat-8dca7.appspot.com",
  messagingSenderId: "159380400241",
  appId: "1:159380400241:web:3edaffe21b2bf4dd4e93d0"
};
  firebase.initializeApp(firebaseConfig);

  const db = firebase.database();
  const username = prompt("Please Tell Us Your Name");

  
  document.getElementById("message-form").addEventListener("submit", sendMessage);

  function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      username,
      message,
    });
  }

  const fetchChat = db.ref("messages/");

  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });
