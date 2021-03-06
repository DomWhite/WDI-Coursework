// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require underscore
//= require backbone
//= require_tree .


_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
}

//-------------------------------

var Dish = Backbone.Model.extend({
  defaults: function() {
    this.set('title', this.randDish());
  },
  randDish: function() {
    var names = "cake pudding bourbon muffin beer cheesy".split(' ')
    return _.sample(names, 2).join(' ');
  }
});

var dishes = [];

dishes.push(new Dish({
  title: 'cakepudding',
  starCount: 5
}));

dishes.push(new Dish({
  title: 'bourbon pancakes',
  starCount: 2
}));


var DishItemView = Backbone.View.extend({
  events: {
    "click .star": "addStar",
    "click a": "showDetail"
  },
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  showDetail: function(event) {
    event.preventDefault();
    router.navigate('dishes/0', true);
  },
  addStar: function() {
    var count =  this.model.get('starCount') + 1;
    this.model.set('starCount', count);
  },
  render: function() {
    var htmlMaker = _.template( $('#dish-item-template').html() );
    var html = htmlMaker(this.model.toJSON());
    this.$el.html(html);
  }
});

$('#magic-btn').on('click', function() {
  // create a new dish model object
  var dishModel = new Dish({title: 'fairy floss', starCount: 2});
  // create a new view passing in the data
  var view = new DishItemView({ model: dishModel });
  // render to construct to html
  view.render();
  // append html back to document
  $('#container').append(view.el);
});

$(document).ready(function(){

$.ajax({
	url:'/dishes',
	datatype: 'json',
}).done(function(data) {
	console.log(data);
	
		_.each(data, function(dish) {
	  // create a new view passing in the data
	  var view = new DishItemView({ model: dish });
	  // render to construct to html
	  view.render();
	  // append html back to document
	  $('#container').append(view.el);
	   });
  });
});


