
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
    var currURL = new URL(window.location.href);
    var url = 'http://localhost:3000/signup/'+currURL.searchParams.get("type");
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
            console.log(myJson.name);
            var result = document.getElementById("result")
            if (JSON.stringify(myJson.name).localeCompare("error")) {result.innerText=JSON.stringify(myJson.detail)}
            else{ result.innerText="Successfully created account"}

        })
        .catch(error =>{
            console.log(error);
        });
}

form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    submit();

})


