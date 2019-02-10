
var bookings = document.getElementById("bookings");


var form = document.getElementById("addProperty")

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}


//Get by id
var getBookings = async ()=>{
    var currURL = new URL(window.location.href);
    var ownerId = currURL.searchParams.get("id");

    var url = 'http://localhost:3000/ownerbookings/'+ownerId;
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            for (var i=0;i<myJson.length;i++){
                var card_horizontal = document.createElement("div");
                card_horizontal.className = "card horizontal";
                var card_stacked = document.createElement("div");
                card_stacked.className = "card-stacked";
                var card_content = document.createElement("div");
                card_content.className = "card-content";
                var p = document.createElement("p");
                p.innerText = "Check In Date: " + myJson[i].check_in_date + "\nCheck Out Date: " + myJson[i].check_out_date
                var h4 = document.createElement("h6");
                h4.innerText = JSON.stringify(myJson[i].prop_name).replace(/['"]+/g, '');
                var h6 = document.createElement("h6");
                h6.innerText = "Booked By "+ JSON.stringify(myJson[i].booked_by).replace(/['"]+/g, '');
                card_horizontal.appendChild(card_stacked);
                card_stacked.appendChild(card_content);
                card_content.appendChild(p);
                card_content.appendChild(h4);
                card_content.appendChild(h6);
                bookings.appendChild(card_horizontal);
            }

        })
        .catch(error => {
            console.log(error)
    bookings.innerText = "No Bookings found"});
}

getBookings();


form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    addProperty();

})



var addProperty = async ()=>{
    var data = getFormData($("#addProperty"));
    var currURL = new URL(window.location.href);
    var url = 'http://localhost:3000/addproperty/';
    data["ownerId"] = currURL.searchParams.get("id");
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

        })
        .catch(error =>{
        console.log(error);
});
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});


