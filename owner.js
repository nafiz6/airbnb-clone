
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
                var owing = document.createElement("h6");
                var paid = document.createElement("h6");
                h6.innerText = "Booked By "+ JSON.stringify(myJson[i].booked_by).replace(/['"]+/g, '');
                owing.innerText = "Owed by guest: Tk." + myJson[i].owing;
                paid.innerText = "Paid by guest: Tk." + myJson[i].paid;
                card_horizontal.appendChild(card_stacked);
                card_stacked.appendChild(card_content);
                card_content.appendChild(p);
                card_content.appendChild(h4);
                card_content.appendChild(h6);
                card_content.appendChild(owing)
                card_content.appendChild(paid)
                bookings.appendChild(card_horizontal);
            }

        })
        .catch(error => {
            console.log(error)
    bookings.innerText = "No Bookings found"});

    var url = 'http://localhost:3000/getpropertybyowner/'+ownerId
    await fetch(url).then(function(response) {
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
                var h4 = document.createElement("h6");
                h4.innerText = JSON.stringify(myJson[i].name).replace(/['"]+/g, '');
                card_horizontal.appendChild(card_stacked);
                card_stacked.appendChild(card_content);
                card_content.appendChild(h4);
                var props = document.getElementById("props")
                props.appendChild(card_horizontal);
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

E = document.getElementById("error")


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
            if (myJson.length!=1 && myJson.length!=0){
                E.innerText="Error input";
            }
            else{
                form.style.display="node"
                E.innerText="Successfully added property";
            }

        })
        .catch(error =>{
        console.log(error);
        E.innerText = error;
});
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
});


var leftToReviewGuest = async ()=>{
    var currURL = new URL(window.location.href);
    var ownerid = currURL.searchParams.get("id");

    var url = 'http://localhost:3000/lefttoreviewguest/'+ownerid;
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            for (var i=0;i<myJson.length;i++){
                console.log(myJson)

                var cardP= document.createElement("div");
                cardP.className = "card";
                var contentP= document.createElement("div");
                contentP.className = "row";
                contentP.id = "guest_"+myJson[i].guest_id
                var titleP = document.createElement("h5");
                titleP.className = "card-title";
                titleP.innerText = JSON.stringify(myJson[i].guest_name).replace(/['"]+/g, '');
                var formP = document.createElement("form");
                formP.className= "col s12";
                formP.id = "guest_review_"+myJson[i].guest_id;
                var divp1 = document.createElement("div");
                divp1.className = "row";
                var input_divP = document.createElement("div");
                input_divP.className = "input-field col s3";
                var inputP = document.createElement("input");
                inputP.id = "rating_guest_"+myJson[i].guest_id;
                inputP.name = "rating"
                inputP.type = "number";
                inputP.className = "validate";
                var labelP = document.createElement("label");
                labelP.htmlFor = "rating_guest_"+myJson[i].guest_id;
                labelP.innerText = "Rating out of 5";
                var divp2 = document.createElement("div");
                divp2.className = "row";
                var input_div2P = document.createElement("div");
                input_div2P.className = "input-field col s12";
                var input2P = document.createElement("textarea");
                input2P.id = "description_guest_"+myJson[i].guest_id;
                input2P.name = "description";
                input2P.className = "materialize-textarea";
                var label2P = document.createElement("label");
                label2P.htmlFor = "description_guest_"+myJson[i].prop_id;
                label2P.innerText = "Review";
                input_divP.appendChild(inputP);
                input_divP.appendChild(labelP);
                input_div2P.appendChild(input2P);
                input_div2P.appendChild(label2P);
                divp1.appendChild(input_divP);
                divp2.appendChild(input_div2P);
                formP.appendChild(divp1);
                formP.appendChild(divp2);
                var buttonP = document.createElement("button");
                buttonP.className = "btn waves-effect waves-light red lighten-2";
                buttonP.type = "submit";
                buttonP.innerText = "Submit Review"
                formP.appendChild(buttonP)
                formP.action = "reviewSubmit.html"
                contentP.appendChild(titleP);
                contentP.appendChild(formP);


                cardP.appendChild(contentP);


                var revProp = document.getElementById("reviewGuest")
                revProp.appendChild( contentP);
                var hr = document.createElement('hr');
                revProp.appendChild(hr);





            }

        })
        .catch(error => {
            console.log(error)
        });
}




$(document).delegate('form', 'submit',async function(event) {
    if (form.id.localeCompare("addProperty")==0)return;
    event.preventDefault();
    var $form = $(this);
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    var to_id = $form[0].id.split("_");


    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    var data=indexed_array;

    var currURL = new URL(window.location.href);
    var ownerId = currURL.searchParams.get("id");
    data['from'] =  ownerId;
    data['to'] = to_id[to_id.length-1];
    var f;
    console.log(to_id[0].localeCompare('prop'));

    data['type']=1;


    var url = 'http://localhost:3000/review/';

    console.log(data);

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
            console.log(myJson.length);
            if (myJson.length==1){
                f = document.getElementById(to_id[0] +"_"+ data['to']);
                console.log(to_id[0] +"_"+ data['to'])
                f.style.display = "none";
            }
            else{
                ownerErr.innerText ="Error in input";
            }

        })
        .catch(error =>{
            console.log(error);
        });



});

leftToReviewGuest();