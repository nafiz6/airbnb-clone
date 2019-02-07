
var form = document.getElementById("ownerForm")



//Get by id
var getOwner = async ()=>{
    var currURL = new URL(window.location.href);
    console.log(currURL.searchParams.get("id"));
    var url = 'http://localhost:3000/owner/'+currURL.searchParams.get("id");
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
            header.innerText = JSON.stringify(myJson[0].name);
        })
        .catch(error => header.innerText = "ID does not exist");
}

getOwner();




var names = document.getElementById("ownerNames");

for (var i=0;i<10;i++)
{
    var header = document.createElement("h1");
    names.appendChild(header);
}