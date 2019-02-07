
var form = document.getElementById("signup")

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

var submit = async ()=>{
    var data = getFormData($("#signup"));
    console.log(data)
    var url = 'http://localhost:3000/signup/guest';
    var r = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
        console.log(response);
        return response;
    })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));

        })
        .catch(error =>console.log("ID does not exist"));
}

form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var currURL = new URL(window.location.href);
    if (currURL.searchParams.get("type")=="guest"){
        submit();
    }
})


