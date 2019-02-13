
var result = document.getElementById("result");

var currURL = new URL(window.location.href);
var ownerId = currURL.searchParams.get("id");

//Get by id
var getProfile = async ()=>{
    var currURL = new URL(window.location.href);
    var id = currURL.searchParams.get("id");
    var url = 'http://localhost:3000/ownerprofile/'+id;
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            console.log(myJson[0])
            var ownerLoc = document.getElementById("ownerLocation");
            var ownerName = document.getElementById("ownerName");
            var ownerDescription = document.getElementById("ownerDescription");
            var ownerContact = document.getElementById("ownerContact");
            var joinDate = document.getElementById("joinDate");

            ownerName.innerText = myJson[0].name;
            ownerDescription.innerText = myJson[0].description;
            ownerContact.innerText = "Contact: " +myJson[0].contact;
            ownerLocation.innerText = "Location: "+myJson[0].location;
            joinDate.innerText = "Join Date: "+ myJson[0].join_date;



        })
        .catch(error =>  result.innerText = "No properties found");
}



var getOwnerReview = async ()=>{
    var currURL = new URL(window.location.href);
    var id = currURL.searchParams.get("id");
    var url = 'http://localhost:3000/getownerreview/'+id;
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            for (var i=0;i<myJson.length;i++){
                console.log(myJson[i])
                var li = document.createElement("li");
                var span = document.createElement("span");
                var rating = document.createElement("p");
                var review = document.createElement("p");
                li.className="collection-item avatar";
                span.className = "title";
                span.innerText = myJson[i].name;
                rating.innerText = "Rating: " + myJson[i].rating;
                review.innerText = myJson[i].description;
                li.appendChild(span);
                span.appendChild(rating);
                span.appendChild(review);
                var ul = document.getElementById("propReviews");
                ul.appendChild(li);


            }


        })
        .catch(error => console.log(error));
}

getOwnerReview();
getProfile();

