

export {
    GET,
    POST,
    POST_IMAGE
    }


 function GET(route, callback) {
    var xhttp = new XMLHttpRequest();
     xhttp.onreadystatechange = function () {
         if (xhttp.readyState === 4 && xhttp.status === 200)
             callback(xhttp.responseText);
    }
     xhttp.open("GET", route, true);
     xhttp.send(null);
}



function POST(route, items, callback){

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) { // callback not called if api returns null due to status == 200
            callback(xhttp.responseText);
        }
    };
    xhttp.open("POST", route, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(items));
}

function POST_IMAGE(route,image, callback) {

    let formData = new FormData();
    formData.append("file", image); // the argument iFormFile in the api MUST be names file

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            callback(xhttp.responseText);
        }
    };
    xhttp.open("POST", route);
    xhttp.send(formData);
}
