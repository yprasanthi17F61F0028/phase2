var sietk;
var result;
var store;
var tx;
    var indexedDb= window.indexedDB || windows.mozIndexedDB ||
                 window.webkitIndexedDB|| window.msIndexedDB;
  //db creation
  sietk = indexedDB.open("mydb",1);
  sietk.onerror=function (e) {
    console.log("error"+e);

  }
  sietk.onupgradeneeded = function (e) {
  result = e.target.result;
  store=result.createObjectStore ("resume",{keyPath:"name"});
  }
sietk.onsuccess=function(e){
  result = e.target.result;
  function getdata(callback){
    tx = result.transaction("resume",IDBTransaction.READ_ONLY);
    store = tx.objectStore("resume");
     data =[];
    tx.oncomplete = function(e){
      callback(result);
      console.log(result);

    }
    var cursor = store.openCursor();
    cursor.onerror = function(e){
      console.log("error"+e);

    }
    cursor.onsuccess = function(e){
      var resultcursor = e.target.result;
      if (resultcursor){
        data.push(resultcursor.value);
        resultcursor.continue();
      }
    }
  }
var parent = document.querySelector(".parent");
getdata(function(d){
  console.log(d);
  for(var i=0; i< data.length;i++){
var child = document.createElement("div");
child.classList.add("child");
parent.append(child);


var img = document.createElement("img");
img.src ="image2.png";
img.alt =data[i].name;
child.append(img);

var name = document.createElement("h2");
name.textContent = data[i].name;
child.append(name);

var email = document.createElement("p");
email.textContent = data[i].email;
child.append(email);

var an = document.createElement("a");
an.textContent = "view profile";
an.href ="resume.html?name="+data[i].name;
child.append(an);
}
})
}
