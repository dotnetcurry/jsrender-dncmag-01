/// <reference path="../jsrender.js" />
/// <reference path="../jquery-1.7.2.js" />


$(function () {
    $("#addContactPopup").hide();
    var addList = [{
        "Name": "Minal Agarwal",
        "Email": "minalsagarwal@isobfuscated.com",
        "Gravatar": "http://www.gravatar.com/avatar/8a00acdf326a8a8806ccc662a136c438.jpg",
        "Address": {
            "Line1": "1234",
            "Line2": "Obfuscated Lane",
            "City": "Nice City",
            "State": "Maharashtra",
            "Zip": "411000"
        }
    },
    {
        "Name": "Suprotim Agarwal",
        "Email": "suprotimagarwal@isobfuscated.com",
        "Gravatar": "http://www.gravatar.com/avatar/0960a6d6c7c472d54d33f77f8048fa29.jpg",
        "Address": {
            "Line1": "9999",
            "Line2": "Obfuscated Lane",
            "City": "Nice City",
            "State": "Maharashtra",
            "Zip": "411000"
        }
    },
    {
        "Name": "Sumit Maitra",
        "Email": "sumitkm@isobfuscated.com",
        "Gravatar": "http://www.gravatar.com/avatar/147bacafcdb00d67d3336ecdf4078ba5.jpg",
        "Address": {
            "Line1": "Far Far Away",
            "Line2": "",
            "City": "City",
            "State": "MH",
            "Zip": "411000"
        }
    }];

    renderAddresses();

    function renderAddresses() {
        $('#contactListContainer').html(
            $('#contactListTemplate').render(addList)
        );
    }

    $(document).on("click", "#addNew", function () {
        $("#addContactPopup").dialog({
            minWidth: 400,
            width: 500,
            maxWidth: 600,
            title: "Add New Contact",
            buttons: [
                {
                    text: "Add",
                    click: function () {
                        var user = {
                            "Name": $("#nameText").val(),
                            "Email": $("#emailText").val(),
                            "Gravatar": "",
                            "Address": {
                                "Line1": $("#Line1").val(),
                                "Line2": $("#Line2").val(),
                                "City": $("#City").val(),
                                "State": $("#State").val(),
                                "Zip": $("#Zip").val()
                            }
                        };
                        contactAdd(user);
                        clearTextData();
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Cancel",
                    click: function () {
                        clearTextData();
                        $(this).dialog("close");
                    }
                }]
        });

        function clearTextData() {
            $("#nameText").val('');
            $("#Line1").val('');
            $("#Line1").val('');
            $("#City").val('');
            $("#State").val('');
            $("#Zip").val('');
            $("#emailText").val('')
        }
        function contactAdd(data) {
            var gravatarUrl = calculateGravatar(data.Email);
            data.Gravatar = gravatarUrl;
            addList.push(data);
            renderAddresses();
        }

        function calculateGravatar(emailAddress) {
            var grav = "";
            var email = emailAddress.toLowerCase().trim();
            var hash = CryptoJS.MD5(email);
            grav = "http://www.gravatar.com/avatar/" + hash + ".jpg";
            return grav;
        }
    });
});