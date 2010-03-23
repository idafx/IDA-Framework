// JavaScript Document


$(document).ready(function() {
  $('.delete').click(function() {
  var user = <?php echo($user->fullname);?>;
    var answer = confirm('Are you sure to delete this record?');
    return answer;

  }); 
});
