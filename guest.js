
var bookings = document.getElementById("bookings");


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
    var guestId = currURL.searchParams.get("id");

    var url = 'http://localhost:3000/guestbookings/'+guestId;
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
                var owing = document.createElement("h6");
                var paid = document.createElement("h6");
                h4.innerText = JSON.stringify(myJson[i].prop_name).replace(/['"]+/g, '');
                owing.innerText = "Owing: "+myJson[i].owing;
                paid.innerText = "Paid: "+myJson[i].paid;
                card_horizontal.appendChild(card_stacked);
                card_stacked.appendChild(card_content);
                card_content.appendChild(h4);
                card_content.appendChild(p);
                card_content.appendChild(owing);
                card_content.appendChild(paid);
                var form = document.createElement("form");
                form.id = "pay_"+myJson[i].booking_id;
                var b = document.createElement("button");
                b.className = "btn waves-effect waves-light";
                b.onsubmit= "pay()";
                b.innerText = "Pay Now";
                form.appendChild(b)
                if (myJson[i].owing>0) {
                    card_content.appendChild(form)
                }
                bookings.appendChild(card_horizontal);


            }

        })
        .catch(error => {
            console.log(error)
    bookings.innerText = "No Bookings found"});
}



//Get by id
var leftToReview = async ()=>{
    var currURL = new URL(window.location.href);
    var guestId = currURL.searchParams.get("id");

    var url = 'http://localhost:3000/lefttoreview/'+guestId;
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            for (var i=0;i<myJson.length;i++){

                var cardP= document.createElement("div");
                cardP.className = "card";
                var contentP= document.createElement("div");
                contentP.className = "row";
                contentP.id = "prop_" + myJson[i].prop_id;
                var titleP = document.createElement("h5");
                titleP.className = "card-title";
                titleP.innerText = JSON.stringify(myJson[i].prop_name).replace(/['"]+/g, '');
                var formP = document.createElement("form");
                formP.className= "col s12";
                formP.id = "prop_review_"+myJson[i].prop_id;
                var divp1 = document.createElement("div");
                divp1.className = "row";
                var input_divP = document.createElement("div");
                input_divP.className = "input-field col s3";
                var inputP = document.createElement("input");
                inputP.id = "rating_prop_"+myJson[i].prop_id;
                inputP.name = "rating"
                inputP.type = "number";
                inputP.className = "validate";
                var labelP = document.createElement("label");
                labelP.htmlFor = "rating_prop_"+myJson[i].prop_id;
                labelP.innerText = "Rating out of 5";
                var divp2 = document.createElement("div");
                divp2.className = "row";
                var input_div2P = document.createElement("div");
                input_div2P.className = "input-field col s12";
                var input2P = document.createElement("textarea");
                input2P.id = "description_prop_"+myJson[i].prop_id;
                input2P.name = "description";
                input2P.className = "materialize-textarea";
                var label2P = document.createElement("label");
                label2P.htmlFor = "description_prop_"+myJson[i].prop_id;
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


                var revProp = document.getElementById("reviewproperty")
                revProp.appendChild( contentP);
                var hr = document.createElement('hr');
                revProp.appendChild(hr);





            }

        })
        .catch(error => {
            console.log(error)
        });
}



//Get by id
var leftToReviewOwner = async ()=>{
    var currURL = new URL(window.location.href);
    var guestId = currURL.searchParams.get("id");

    var url = 'http://localhost:3000/lefttoreviewowner/'+guestId;
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            for (var i=0;i<myJson.length;i++){

                var cardP= document.createElement("div");
                cardP.className = "card";
                var contentP= document.createElement("div");
                contentP.className = "row";
                contentP.id = "owner_"+myJson[i].owner_id
                var titleP = document.createElement("h5");
                titleP.className = "card-title";
                titleP.innerText = JSON.stringify(myJson[i].owner_name).replace(/['"]+/g, '');
                var formP = document.createElement("form");
                formP.className= "col s12";
                formP.id = "owner_review_"+myJson[i].owner_id;
                var divp1 = document.createElement("div");
                divp1.className = "row";
                var input_divP = document.createElement("div");
                input_divP.className = "input-field col s3";
                var inputP = document.createElement("input");
                inputP.id = "rating_owner_"+myJson[i].owner_id;
                inputP.name = "rating"
                inputP.type = "number";
                inputP.className = "validate";
                var labelP = document.createElement("label");
                labelP.htmlFor = "rating_owner_"+myJson[i].owner_id;
                labelP.innerText = "Rating out of 5";
                var divp2 = document.createElement("div");
                divp2.className = "row";
                var input_div2P = document.createElement("div");
                input_div2P.className = "input-field col s12";
                var input2P = document.createElement("textarea");
                input2P.id = "description_owner_"+myJson[i].owner_id;
                input2P.name = "description";
                input2P.className = "materialize-textarea";
                var label2P = document.createElement("label");
                label2P.htmlFor = "description_owner_"+myJson[i].prop_id;
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


                var revProp = document.getElementById("reviewOwner")
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
    event.preventDefault();
    var $form = $(this);
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    var to_id = $form[0].id.split("_");
    if (to_id[0].localeCompare("pay")==0){
    pay(to_id[1])
    return
    }

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    var data=indexed_array;

    var currURL = new URL(window.location.href);
    var guestId = currURL.searchParams.get("id");
    data['from'] =  guestId;
    data['to'] = to_id[to_id.length-1];
    var f;
    console.log(to_id[0].localeCompare('prop'));
    if (to_id[0].localeCompare('prop')==0){
        data['type'] = 2;
        console.log("HERE")
    }
    else if (to_id[0].localeCompare('owner')==0){
        data['type'] = 3;
    }
    else{
        data['type']=1;
    }

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

var revErr = document.getElementById("revErr")
var ownerErr = document.getElementById("ownerErr")


async function pay( id){
    console.log("here"+id);
    var url = 'http://localhost:3000/guestpay/'+id;
    var r = await fetch(url).then(function(response) {
        return response.json();
    })
        .then(function(myJson) {
            console.log(myJson)
            window.location=""


        })
        .catch(error => {
            console.log(error)
        });

}





getBookings();
leftToReview();
leftToReviewOwner();



