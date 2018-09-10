let socket = io.connect('http://localhost:1111');

(() => {
    if ($('#username-h4').text() == "") {
        $('#message').prop('disabled', true);
    }
    else {
        $('#message').prop('disabled', false);
    }
    $('#set-user').on("click", function () {
        if ($('#set-user').text() === "Logout") {
            $('#set-user').text('Set Username');
            $('#username-h4').hide();
            let oldValue = $('#username-h4').text();
            $('#usernameInput').val(oldValue);
            $('#usernameInput').show();
        }
        else {
            let value = $('#usernameInput').val();
            if (value !== "") {
                $('#username-h4').text(value);
                $('#username-h4').show();
                $('#usernameInput').hide();
                $('#set-user').text('Logout');
                $('#message').prop('disabled', false);
            }
        }
    });

    $('#message').on("keypress", function () {
        let user = $('#username-h4').text();
        socket.emit('typing', user);
    });

    $('#send-btn').on("click", function () {
        let message = $('#message').val();
        let sender = $('#username-h4').text();
        let data = {message, sender};
        socket.emit('message', data);
        let messageDom = $(`<p class="p-1 mb-1 rounded"><p class="pl-3 mr-auto text-white bg-secondary rounded">Me: ${message}</p></p>`);
        $('#messages').append(messageDom);
    });
})();

socket.on('message', function (data) {
    let message = $(`<p class="p-1 mb-1"><p class="pl-3 ml-auto text-white bg-primary rounded">${data.sender}: ${data.message}</p></p>`);
    $('#messages').append(message);
});