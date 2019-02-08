
var bookings = document.getElementById("bookings");



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
                h4.innerText = JSON.stringify(myJson[i].prop_name).replace(/['"]+/g, '');
                card_horizontal.appendChild(card_stacked);
                card_stacked.appendChild(card_content);
                card_content.appendChild(h4);
                card_content.appendChild(p);
                bookings.appendChild(card_horizontal);

                var cardP= document.createElement("div");
                cardP.className = "card";
                var contentP= document.createElement("div");
                contentP.className = "row";
                var titleP = document.createElement("h5");
                titleP.className = "card-title";
                titleP.innerText = JSON.stringify(myJson[i].prop_name).replace(/['"]+/g, '');
                var formP = document.createElement("form");
                formP.className= "col s12";
                var divp1 = document.createElement("div");
                divp1.className = "row";
                var input_divP = document.createElement("div");
                input_divP.className = "input-field col s3";
                var inputP = document.createElement("input");
                inputP.id = "rating_prop"+myJson[i].prop_id;
                inputP.placeholder="Rating";
                inputP.type = "number";
                inputP.className = "validate";
                var labelP = document.createElement("label");
                labelP.htmlFor = "rating_prop"+myJson[i].prop_id;
                labelP.innerText = "Rating";
                var divp2 = document.createElement("div");
                divp2.className = "row";
                var input_div2P = document.createElement("div");
                input_div2P.className = "input-field col s12";
                var input2P = document.createElement("textarea");
                input2P.id = "description_prop"+myJson[i].prop_id;
                input2P.placeholder="Review";
                input2P.className = "materialize-textarea";
                var label2P = document.createElement("label");
                label2P.htmlFor = "description_prop"+myJson[i].prop_id;
                label2P.innerText = "Review";
                input_divP.appendChild(inputP);
                input_divP.appendChild(labelP);
                input_div2P.appendChild(input2P);
                input_div2P.appendChild(label2P);
                divp1.appendChild(input_divP);
                divp2.appendChild(input_div2P);
                formP.appendChild(divp1);
                formP.appendChild(divp2);
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
    bookings.innerText = "No Bookings found"});
}






getBookings();



