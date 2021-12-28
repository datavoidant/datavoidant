$(document).ready(function() {
  // Enable pusher logging - don't include this in production
  Pusher.logToConsole = true;

  var pusher = new Pusher('41ee7bfae92a5d90b05a', {
    cluster: 'us2',
    encrypted: false
  });

  var channel = pusher.subscribe('public-chat');
  channel.bind('message-added', onMessageAdded);

  $('#btn-chat').click(function() {
    const message = $("#message").val();
    $("#message").val("");
  //  curr_url = window.location.href
  //  console.log("here is the url",curr_url)
    //send message

    $.post( curr_url + "/message", {
      message
    });
  });

  function onMessageAdded(data) {
    let template = $("#new-message").html();
    template = template.replace("{{body}}", data.message);
    console.log(message)
    $(".chat").append(template);
  }
});
