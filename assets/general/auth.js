jQuery.fn.extend({

    authUpdateTips: function (t) {
        tips
        .text(t)
        .addClass('ui-state-highlight');
        setTimeout(function() {
            tips.removeClass('ui-state-highlight', 1500);
        }, 500);
    },

    authCheckLength: function (o,n,min,max) {

        if ( o.value().length > max || o.value().length < min ) {
            o.addClass('ui-state-error');
            $.authUpdateTips("Length of " + n + " must be between "+min+" and "+max+".");
            return false;
        } else {
            return true;
        }

    },
    authCheckRegexp: function (o,regexp,n) {

        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass('ui-state-error');
            $.authUpdateTips(n);
            return false;
        } else {
            return true;
        }
    },

    authCreateLogin : function() {

        $('<div id="dialog-form" title="Re-Login"> \n\
	<p class="validateTips">All form fields are required.</p> \n\
	<form class="standardform"> \n\
		<label for="username">Username</label> \n\
		<input type="text" name="username" id="username" class="text ui-widget-content ui-corner-all" /> \n\
		<label for="password">Password</label>\n\
		<input type="password" name="password" id="password" value="" class="text ui-widget-content ui-corner-all" /> \n\
	</form>\n\
        </div>\n\
        ').appendTo('body');

        $("#dialog-form").dialog({
            autoOpen: false,
            height: 200,
            width: 350,
            modal: true,
            buttons: {
                Login: function() {
                    var bValid = true;
                    allFields.removeClass('ui-state-error');

                    //                    bValid = bValid && $.authCheckLength(username,"username",3,16);
                    //                    bValid = bValid && $.authCheckLength(password,"password",5,16);
                    //                    bValid = bValid && $.authCheckRegexp(username,/^[a-z]([0-9a-z_])+$/i,"Username may consist of a-z, 0-9, underscores, begin with a letter.");
                    //                    bValid = bValid && $.authCheckRegexp(password,/^([0-9a-zA-Z])+$/,"Password field only allow : a-z 0-9");

                    if (bValid) {
                        // try invoke login
                        $.loginResult = $.authLogin(username, password)

                        $(this).dialog('close');
                    }
                },
                Cancel: function() {
                    $(this).dialog('close');
                }
            },
            close: function() {
                allFields.val('').removeClass('ui-state-error');
            }
        });

        $("#dialog-form").dialog("open");

        switch($.loginResult)
        {
            case 'success':
                return true
            case 'failed':
            default:
                return false
        }
    },

    /**
     * The starter
     */
    authCheck : function() {
        $.getJSON(baseURL+'user/check_session', function(result){

            $.authStatus = result;
            alert('JSON OK!' + result.status)
        //return true // passed! submitting()
        })


        if ($.authStatus.status == 'alive') {
            return true
        }
        // else force re-login
        $.authCreateLogin()
        return false
    },

    authLogin : function(username, password) {

        $.ajax({
            type: 'POST',
            url: baseURL+'user/login',
            data: {
                username:username,
                password:password
            },
            dataType: 'json',
            success: function(data) {
                alert('Login was performed.');
            }
        })

        return $.login.status
    }

})


$(document).ready(function(){

    var username = $("#username"),
    password = $("#password"),
    allFields = $([]).add(name).add(password),
    tips = $(".validateTips");

    
    $("form[name=dataentry]").submit(function(){
        $.authCheck()
    });

})