/**
 * Hide and show password checkbox
 */
$(() => {
    $("#show-password").on("change", () => {
        let type = $("#show-password").prop('checked') ? 'text' : 'password';
        let password = $("#user-password");
        let repeatPassword = $("#user-password-repeat");
        password.attr('type', type);

        if(repeatPassword) {
            repeatPassword.attr('type', type);
        }
    })
});
