  var received_message_data  = [],
      sent_message_data = [],
      received_message_data_len = 0;
      sent_message_data_len = 0;
      mini_posts_div = $('.mini-posts'),
      mini_post_article_class = 'mini-post',
      display_message_div = $('.show_message_div'),
      disp_username = $('#dispUsername');
      received_message_users = [],
      received_message_text = [],
      received_message_user_pic = [],
      received_message_created = [],
      sent_message_users = [],
      sent_message_text = [],
      sent_message_user_pic = [],
      sent_message_created = [],
      inbox = "INBOX",
      sentBox = "SENTBOX",
      inbox_choice = "VIEW INBOX  -->",
      sentbox_choice = "VIEW SENTBOX -->",
      loader = $('#loader'),
      is_inbox = true;

  Functions = {
    getData:function(){
      $.ajax({
        url:'http://localhost:8000/get-message-center-data/api/',
        type:'GET',
        headers:{
          'Access-Control-Allow-Origin': '*'
        },
        success:function(data){
          // console.log(data);
          received_message_data = data.received_message_data;
          sent_message_data = data.sent_message_data;
          received_message_data_len = received_message_data.length;
          sent_message_data_len = sent_message_data.length;
          Functions.setData().setUserList().loadInitialData().hideLoader();
        },
        error:function(error){
          console.log(error);
        }
      });
    },



    setData:function(){
      if(received_message_data_len){
        for(var i = 0; i < received_message_data_len ; i++){
          var received_message_details = received_message_data[i],
              sender_username = received_message_details.sender,
              sender_message_text = received_message_details.message,
              sender_profile_pic = received_message_details.sender_profile_pic,
              sender_message_date = received_message_details.created;
              index = Functions.getSenderUserIndex(sender_username);
          received_message_text[index].push(sender_message_text);
          received_message_user_pic[index] = sender_profile_pic;
          received_message_created[index].push(sender_message_date);
        }
        console.log(received_message_user_pic);
      }


      if(sent_message_data_len){
        for(var i = 0 ;i < sent_message_data_len ; i++){
          var sent_message_details = sent_message_data[i],
              receiver_username = sent_message_details.receiver,
              receiver_message_text = sent_message_details.message,
              receiver_profile_pic = sent_message_details.receiver_profile_pic,
              receiver_message_date = sent_message_details.created,
              index = Functions.getReceiverUserIndex(receiver_username);
          sent_message_text[index].push(receiver_message_text);
          sent_message_user_pic[index] = receiver_profile_pic;
          sent_message_created[index].push(receiver_message_date);
        }
        console.log(sent_message_user_pic);
      }
      return Functions;
    },




    getSenderUserIndex:function(username){
      var index = received_message_users.indexOf(username);
      if(index == -1){
        received_message_users.push(username);
        received_message_text.push([]);
        received_message_created.push([]);
        return received_message_users.length - 1;
      }
      return index;
    },




    getReceiverUserIndex:function(username){
      var index = sent_message_users.indexOf(username);
      if(index == -1){
        sent_message_users.push(username)
        sent_message_text.push([]);
        sent_message_created.push([])
        return sent_message_users.length - 1;
      }
      return index;
    },


    setUserList:function(){
      $("#message_type").text(inbox);
      $("#message_select_type").text(sentbox_choice);
      var received_message_users_len = received_message_users.length;
      if(received_message_users_len){
        for(var i = 0; i < received_message_users_len; i++){
          var id = received_message_users[i],
              sender_pic = received_message_user_pic[i];
              if(sender_pic == ''){
                list_elem = "<article onclick = 'Functions.loadReceivedMessage(" + '"' + received_message_users[i] + '"' + ")' data-user = '" + id +"' id = '" + id +"' class = 'mini-post user_name_sec'><header><h3>" + received_message_users[i] + "</h3><a class='author'><img src = '/static/images/default_gravators/github.png' /></a></header></article>";
              }
              else{
                list_elem = "<article onclick = 'Functions.loadReceivedMessage(" + '"' + received_message_users[i] + '"' + ")' data-user = '" + id +"' id = '" + id +"' class = 'mini-post user_name_sec'><header><h3>" + received_message_users[i] + "</h3><a class='author'><img src='/media/" + sender_pic +"' alt='' /></a></header></article>";
              }
          mini_posts_div.append(list_elem);
        }
      }
      else{
        $("#sidebar").css("overflow","hidden");
        $("#message_disp_div").text('').css('overflow','hidden').append('<h1>Yo have no messages</h1>');
      }
      return Functions;
    },


    loadReceivedMessage:function(username){
      var index = Functions.getSenderUserIndex(username),
          sender_username = received_message_users[index],
          message_text_arr = received_message_text[index],
          message_created_date_arr = received_message_created[index],
          message_text_arr_len = message_text_arr.length,
          message_created_date_arr_len = message_created_date_arr.length;
      //clears previous data
      disp_username.text('');
      display_message_div.text('');
      //set values in DOM
      disp_username.append("Messages by" + " " + "'" + sender_username + "'");
      for(var i = 0; i < message_text_arr_len; i++){
        display_message_div.append(message_created_date_arr[i].split(".")[0] + ":<p>" +message_text_arr[i]+"</p><br/>");
      }
    },




    loadInitialData:function(){
      var received_message_users_len = received_message_users.length;
          first_user = '',
          index = 0,
          user_message_arr = [],
          user_message_created_arr = [],
          message_arr_len = 0;
      if(received_message_users_len){
        first_user = received_message_users[0];
        index = Functions.getSenderUserIndex(first_user),
        user_message_arr = received_message_text[index],
        user_message_created_arr = received_message_created[index],
        message_arr_len = user_message_arr.length;

        for(var i = 0; i < message_arr_len; i++){
          display_message_div.append(user_message_created_arr[i].split(".")[0] + ":<p>" +user_message_arr[i]+"</p><br/>");
        }
        disp_username.append("Messages by" + " " + "'" + first_user + "'");
      }
      return Functions;
    },



    setReceiverList:function(){
      $("#message_type").text(sentBox);
      $("#message_select_type").text(inbox_choice);
      display_message_div.text('');
      disp_username.text('');
      mini_posts_div.text('');
      var sent_users_list_len = sent_message_users.length;
      if(sent_users_list_len){
        for(var i = 0 ; i < sent_users_list_len ; i++){
          var receiver_pic = sent_message_user_pic[i],
              receiver_name = sent_message_users[i];
              if(receiver_pic == ''){
                list_item = "<article onclick = 'Functions.loadSentMessage(" + '"' + receiver_name + '"' + ")'  class = 'mini-post user_name_sec'><header><h3>" + receiver_name + "</h3><a class='author'><img src = '/static/images/default_gravators/github.png' /></a></header></article>";
              }
              else{
                list_item = "<article onclick = 'Functions.loadSentMessage(" + '"' + receiver_name + '"' + ")'  class = 'mini-post user_name_sec'><header><h3>" + receiver_name + "</h3><a class='author'><img src='/media/" + receiver_pic +"' alt='' /></a></header></article>";
              }
          mini_posts_div.append(list_item);
        }
      }
      else{
        $("#sidebar").css("overflow","hidden");
        $("#message_disp_div").text('').css('overflow','hidden').append('<h1>Yo have no sent messages</h1>');
      }
      return Functions;
    },



    loadSentMessage:function(username){
      var index = Functions.getReceiverUserIndex(username),
          receiver_name = sent_message_users[index],
          message_text_arr = sent_message_text[index],
          message_created_arr = sent_message_created[index],
          message_text_arr_len = message_text_arr.length,
          message_created_len = message_created_arr.length;
      disp_username.text('');
      display_message_div.text('');
      disp_username.append("Messages sent to '"+ receiver_name + "'");
      for(var i = 0 ; i < message_text_arr_len ; i++){
        display_message_div.append(message_created_arr[i].split(".")[0] + ":<p>" +message_text_arr[i]+"</p><br/>")
      }
    },



    loadInitialReceiverData:function(){
      var sent_message_users_len = sent_message_users.length;
          first_receiver = '',
          index = 0,
          user_message_arr = [],
          user_message_created_arr = [],
          message_arr_len = 0;
      if(sent_message_users_len){
        first_receiver = sent_message_users[0];
        index = Functions.getReceiverUserIndex(first_receiver);
        user_message_arr = sent_message_text[index],
        user_message_created_arr = sent_message_created[index],
        message_arr_len = user_message_arr.length;
        disp_username.append("Messages sent to" + " " + "'" + first_receiver + "'");
        for(var i = 0 ;i < message_arr_len ; i++){
          display_message_div.append(user_message_created_arr[i].split(".")[0] + ":<p>" +user_message_arr[i]+"</p><br/>");
        }
      }
      return Functions;
    },



    setLoader:function(){
      loader.css('display','block');
      return Functions;
    },



    hideLoader:function(){
      loader.css('display','none');
      return Functions;
    }
  }



  $(document).on('ready',function(){
    Functions.setLoader().getData();
    $('#message_select_type').click(function(){
      if(is_inbox == true){
        Functions.setReceiverList().loadInitialReceiverData();
        is_inbox = false;
      }
      else{
        display_message_div.text('');
        disp_username.text('');
        mini_posts_div.text('');
        Functions.setUserList().loadInitialData();
        is_inbox = true;
      }
    });
  });
