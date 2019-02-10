
var form = document.getElementById("login")

var currURL = new URL(window.location.href);
var sub = document.getElementById("submit");
sub.innerText= "Login as " + currURL.searchParams.get("type")

var a =document.getElementById("signup")
a.href = "signup.html?type="+currURL.searchParams.get("type");

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

var submit = async ()=>{
    var data = getFormData($("#login"));
    var currURL = new URL(window.location.href);
    var url = 'http://localhost:3000/login/'+currURL.searchParams.get("type");
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
            var result = document.getElementById("result")
            if (myJson.length ==0)result.innerText = "Incorrect username or password"
            else{
                window.location = currURL.searchParams.get("type")+".html?id="+myJson[0].id
            }
        })
        .catch(error =>{
        console.log(error);
});
}

form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    submit();

})


