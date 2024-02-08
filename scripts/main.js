/* display a message on page load */

function displayMessage() {
    if (document.cookie.includes("disclaimerAccepted=true")) return;
    fetch("https://api.ipify.org/")
        .then(response => response.text())
        .then(data => {
            if (data == "134.59.215.253") return;
            let container = document.createElement("div");
            container.id = "disclaimer-container";
            container.style.position = "fixed";
            container.style.top = "0";
            container.style.left = "0";
            container.style.width = "100%";
            container.style.height = "100%";
            container.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            container.style.color = "white";
            container.style.display = "flex";
            container.style.alignItems = "center";
            container.style.justifyContent = "center";
            document.body.appendChild(container);

            let msg = document.createElement("div");
            msg.innerHTML = "Attention, ceci est un projet étudiant. Tout le contenu est fictif et ne doit pas être pris au sérieux. Merci de votre compréhension.\
            <br><br>\
            This is a student project. All content is fictional and should not be taken seriously. Thank you for your understanding.\
            <br><br>\
            <button id='accept-disclaimer' onclick='onAcceptDisclaimer()' style='display: block; margin: 0 auto; padding: 10px 20px; font-size: 16px; background-color: green; color: #ffffff; border: none; border-radius: 5px; cursor: pointer;'>Accepter / Accept</button>";
            document.getElementById("disclaimer-container").appendChild(msg);

            msg.style.position = "fixed";
            msg.style.top = "50%";
            msg.style.left = "50%";
            msg.style.transform = "translate(-50%, -50%)";
            msg.style.max_width = "600px";
            msg.style.backgroundColor = "red";
            msg.style.border = "5px solid brown";
            msg.style.border_radius = "20px";
            msg.style.padding = "20px";
            msg.style.color = "white";
            msg.style.text_align = "center";
            msg.style.font_size = "20px";
            msg.style.font_weight = "bold";
            msg.style.font_family = "Arial, sans-serif";
            msg.style.box_shadow = "5px 5px 5px black";
            msg.style.z_index = "1000";
            msg.style.align_items = "center";
            msg.style.justify_content = "center";
        });
}

function onAcceptDisclaimer() {
    let container = document.getElementById("disclaimer-container");
    container.style.display = "none";
    document.cookie = "disclaimerAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

document.addEventListener("DOMContentLoaded", displayMessage);


function submitGoogleForm() {
    document.querySelector('.confirmation').style.display = 'none'
    document.querySelector('.erreur').style.display = 'none'
    if (!checkForm()) {
        document.getElementById('message').innerHTML = 'At least one field is not valid.'
        displaySendMessage('.erreur')
        return;
    }

    var formId = '1FAIpQLScst6VY6WkaKSB31aENezG4yrg9l10Z31RWDSQslIYnrXyydw';
    var formData = new FormData(document.forms[0]);
    fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
    })
        .then(response => {console.log('Success:', response); displaySendMessage('.confirmation')})
        .catch(error => {
            console.error('Error:', error);
            displaySendMessage('.erreur')
        });
}

function checkForm() {
    var inputs = document.querySelectorAll('.input');
    var isValid = true;
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].value && inputs[i].id != 'trap') {
            isValid = false;
            inputs[i].style.setProperty('border', '2px solid red');
        } else if (inputs[i].id == 'trap' && inputs[i].value) { // anti bot trap
            isValid = false;
        } else {
            inputs[i].style.setProperty('border', '0');
        }
    }

    //check if email is valid
    // with regex
    if (!inputs[1].value.match(/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm)) {
        isValid = false;
        inputs[1].style.setProperty('border', '2px solid red');
    }
    return isValid;
}

// dismiss message after 5 seconds
function displaySendMessage(className) {
    let element = document.querySelector(className);
    element.style.display = 'block';
    setTimeout(function () {
        element.style.display = 'none';
    }, 10000);
}