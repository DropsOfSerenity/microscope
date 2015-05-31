Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', function() {
    this.render('postsList');
}, {
    name: 'postsList'
});

Router.route('/post/:_id', function() {
    this.render('postPage', {
        data: function() {
            return Posts.findOne(this.params._id);
        }
    });
}, {
    name: 'postPage'
});

Router.route('/submit', function() {
    this.render('postSubmit');
}, { name: 'postSubmit' });

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn())
            this.render(this.loadingTemplate);
        else
            this.render('accessDenied');
    } else {
        this.next();
    }
}

Router.before(requireLogin, {only: 'postSubmit'});
