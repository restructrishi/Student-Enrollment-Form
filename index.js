$(document).ready(function () {
    // On page load, reset the form
    resetForm();

    // Event listener for when Roll No is input
    $("#stdrollno").on("input", function () {
        var rollNoVal = $(this).val();

        // If Roll No is entered, enable the other fields
        if (rollNoVal) {
            enableFormFields();
        } else {
            resetForm(); // If Roll No is empty, reset the form
        }
    });

    // Event listener for Save button
    $("#saveBtn").on("click", function () {
        var jsonData = validateAndGetFormData();
        if (jsonData !== "") {
            saveStudent(jsonData);  // Function to handle saving the student data
        }
    });

    // Event listener for Reset button
    $("#resetBtn").on("click", function () {
        resetForm();  // Reset the form on click
    });
});

// Function to enable all fields except Roll No
function enableFormFields() {
    $("#stdfullname").prop("disabled", false);
    $("#class").prop("disabled", false);
    $("#birthDate").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrollmentDate").prop("disabled", false);
    $("#saveBtn").prop("disabled", false);
    $("#resetBtn").prop("disabled", false);
}

// Function to reset the form
function resetForm() {
    $("#stdrollno").val("").prop("disabled", false);
    $("#stdfullname").val("").prop("disabled", true);
    $("#class").val("").prop("disabled", true);
    $("#birthDate").val("").prop("disabled", true);
    $("#address").val("").prop("disabled", true);
    $("#enrollmentDate").val("").prop("disabled", true);
    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);
    $("#stdrollno").focus();
}

// Function to validate the form data and return JSON string
function validateAndGetFormData() {
    var stdrollnoVar = $("#stdrollno").val();
    var stdfullnameVar = $("#stdfullname").val();
    var classVar = $("#class").val();
    var birthDateVar = $("#birthDate").val();
    var addressVar = $("#address").val();
    var enrollmentDateVar = $("#enrollmentDate").val();

    // Basic validation
    if (stdrollnoVar === "") {
        alert("Roll No is required");
        $("#stdrollno").focus();
        return "";
    }
    if (stdfullnameVar === "") {
        alert("Full Name is required");
        $("#stdfullname").focus();
        return "";
    }
    if (classVar === "") {
        alert("Class is required");
        $("#class").focus();
        return "";
    }
    if (birthDateVar === "") {
        alert("Birth Date is required");
        $("#birthDate").focus();
        return "";
    }
    if (addressVar === "") {
        alert("Address is required");
        $("#address").focus();
        return "";
    }
    if (enrollmentDateVar === "") {
        alert("Enrollment Date is required");
        $("#enrollmentDate").focus();
        return "";
    }

    // Create JSON object with form data
    var jsonData = {
        rollNo: stdrollnoVar,
        fullName: stdfullnameVar,
        class: classVar,
        birthDate: birthDateVar,
        address: addressVar,
        enrollmentDate: enrollmentDateVar
    };

    return JSON.stringify(jsonData);
}

// Function to handle saving the student data (dummy function, to be replaced with actual API call)
function saveStudent(jsonData) {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90932000|-31949225517856293|90962645",
            jsonStr, "STUDENT", "Std-REL");
    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
}
