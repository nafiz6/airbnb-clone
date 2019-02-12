
var names = document.getElementById("property-names");

var result = document.getElementById("result");

var currURL = new URL(window.location.href);
var propId = currURL.searchParams.get("id");
var cid = currURL.searchParams.get("cid");
var cod = currURL.searchParams.get("cod");
var elemCid = document.getElementById("checkInDate")
var elemCod = document.getElementById("checkOutDate")
if (cid!="")elemCid.value=cid;
if (cod!="")elemCod.value=cod;
var check = document.getElementById("includePack")

var form = document.getElementById("book")
var packid;

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

//Get by id
var getProperty = async ()=>{
    var currURL = new URL(window.location.href);
    var id = currURL.searchParams.get("id");
    var url = 'http://localhost:3000/getpropertydetails/'+id;
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            console.log(myJson[0])
            var propName = document.getElementById("propName");
            var propLoc = document.getElementById("propLocation");
            var propSize = document.getElementById("propSize");
            var propAmenities = document.getElementById("propAmenities");
            var propDetails = document.getElementById("propDetails");
            var ownerName = document.getElementById("ownerName");
            var ownerDescription = document.getElementById("ownerDescription");
            var price = document.getElementById("price");

            packid = myJson[0].packid;
            if (packid==0 || packid==null){
                var p = document.getElementById("ifpack");
                p.style.display = "none"
            }
            else{
                getPackage()
            }
            console.log(packid);
            price.innerText = "Tk. " + myJson[0].price + "/night"
            propName.innerText = myJson[0].propname;
            propLoc.innerText = myJson[0].city+",  " + myJson[0].country;
            propDetails.innerText = myJson[0].prop_desc;
            propAmenities.innerText = myJson[0].amenities;
            propSize.innerText = "Guests " + myJson[0].no_of_guests + "   Beds " + myJson[0].no_of_beds;
            ownerName.innerText = myJson[0].owner_name;
            ownerDescription.innerText = myJson[0].owner_desc;



        })
        .catch(error =>  result.innerText = "No properties found");
}



var getPackage = async ()=>{
    var url = 'http://localhost:3000/getpackage/'+packid;
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            var packPrice = document.getElementById("packPrice");
            var pack = document.getElementById("package");
            packPrice.innerText = "Tk. "+ myJson[0].price
            pack.innerText = myJson[0].description




        })
        .catch(error => console.log(error));
}


var getPropertyReview = async ()=>{
    var currURL = new URL(window.location.href);
    var id = currURL.searchParams.get("id");
    var url = 'http://localhost:3000/getpropertyreview/'+id;
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

var E = document.getElementById("error");



var submit = async ()=>{
    var data = getFormData($("#book"));
    data["id"] =propId;
    if(check.checked){
        data["packid"]=packid
    }

    var currURL = new URL(window.location.href);
    var url = 'http://localhost:3000/book/';
    console.log(data)
    var r = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            console.log(myJson);
            if (myJson[0].bookguest){
                E.innerText = "SUCCESSFULLY BOOKED!"
                form.style.display = "none"
            }
            else{
                E.innerText = "BOOKING FAILED"
            }
        })
        .catch(error =>{
            E.innerText=error;
        });
}

form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    submit();

})


getProperty();
getPropertyReview();


