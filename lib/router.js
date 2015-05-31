Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [Meteor.subscribe('posts'), Meteor.subscribe('notifications')];
    }
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
    name: 'postPage',
    waitOn: function() {
        return Meteor.subscribe('comments', this.params._id);
    }
});

Router.route('/post/:_id/edit', function() {
    this.render('postEdit', {
        data: function() {
            return Posts.findOne(this.params._id);
        }
    });
}, {
    name: 'postEdit'
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
Router.before(function() { clearErrors(); this.next(); });
