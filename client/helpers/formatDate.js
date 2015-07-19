// format time
Template.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(context).format('hh:mm , DD/MM/YYYY');
});

Template.registerHelper('howLongAgo', function(context, options) {
  if(context)
    return moment(context).startOf("hour").fromNow();
});