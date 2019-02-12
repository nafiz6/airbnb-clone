

var result = document.getElementById("result");

//Get by id
var getProperty = async ()=>{
    var currURL = new URL(window.location.href);
    var loc = currURL.searchParams.get("location");
    var cid = currURL.searchParams.get("check_in_date");
    var cod = currURL.searchParams.get("check_out_date");
    var guests = currURL.searchParams.get("guests");
    if (guests==null)guests=0;
    if (cid==null)cid="";
    if (cod==null)cod="";

    var url = 'http://localhost:3000/property/'+loc+'/'+cid+'/'+cod+'/'+guests;
    if (cid==null || cid=="")url =  'http://localhost:3000/property/'+loc;
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(async function(myJson) {
            for (var i=0;i<myJson.length;i++){
                var card_horizontal = document.createElement("div");
                card_horizontal.className = "card horizontal";
                var card_stacked = document.createElement("div");
                card_stacked.className = "card-stacked";
                var card_content = document.createElement("div");
                card_content.className = "card-content";
                var p = document.createElement("p");
                var card_image = document.createElement("div");
                card_image.className = "card-image ";
                var prop_image = document.createElement("img");


                var type;
                if (JSON.stringify(myJson[i].type) == "1")type="Apartment";
                if (JSON.stringify(myJson[i].type) == "2")type="Resort";
                if (JSON.stringify(myJson[i].type) == "3")type="Hotel";
                p.innerText = type;
                var h4 = document.createElement("h4");
                h4.innerText = JSON.stringify(myJson[i].prop_name).replace(/['"]+/g, '');
                var h6 = document.createElement("h6");
                var owned_by = document.createElement("h6");
                var size = document.createElement("h6");
                owned_by.innerText = "Owned By " + myJson[i].owner_name;
                size.innerText = "Beds: " + myJson[i].no_of_beds + " Guests: " + myJson[i].no_of_guests
                h6.innerText = "Tk. "+ JSON.stringify(myJson[i].price);

                prop_image.src = await getPhoto(myJson[i].prop_id);
                card_image.appendChild(prop_image);
                card_horizontal.appendChild(card_image)
                card_horizontal.appendChild(card_stacked);
                card_stacked.appendChild(card_content);
                card_content.appendChild(p);
                card_content.appendChild(h4);
                card_content.appendChild(h6);
                card_content.appendChild(owned_by);
                card_content.appendChild(size);
                var a = document.createElement("a");
                a.href = "property.html?id="+myJson[i].prop_id + "&cid=" + cid + "&cod=" + cod;
                a.style.color = "black";
                a.appendChild(card_horizontal);
                var names = document.getElementById("property-names")
                names.appendChild(a);
            }

        })
        .catch(error =>{
            console.log(error);
            result.innerText = "No properties found";
})
}


async function getPhoto(id) {
    var pid;
    var url = 'http://localhost:3000/photos/'+id;
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            pid = myJson[0].photo;


        }).catch(error=>{
            console.log(error);
            result.innerText = "No photos found"
        })
    return pid;


}




getProperty();




