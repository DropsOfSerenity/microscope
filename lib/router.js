Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [Meteor.subscribe('notifications')];
    }
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

PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    limit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: {submitted: -1}, limit: this.limit()};
    },
    waitOn: function() {
        return Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.posts().count() === this.limit();
        var nextPath = this.route.path({
            postsLimit: this.limit() + this.increment
        });
        return {
            posts: this.posts(),
            nextPath: hasMore ? nextPath : null
        }
    }
})

Router.route('/:postsLimit?', {
    name: 'postsList',
    controller: 'PostsListController'
});


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
