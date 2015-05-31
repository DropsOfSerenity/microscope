Posts = new Meteor.Collection('posts');

Posts.allow({
    update: ownsDocument,
    remove: ownsDocument
});

Posts.deny({
    update: function (userId, doc, fields, modifier) {
        // may only edit the following fields
        return (_.without(fields, 'url', 'title').length > 0);
    },
});

Meteor.methods({
    post: function (postAttributes) {
        var user = Meteor.user();
        var postWithSameLink = Posts.findOne({url: postAttributes.url});

        if (!user) throw new Meteor.Error(401, "You must be logged in.");
        if (!postAttributes.title) throw new Meteor.Error(422, "Please fill in a headline.");
        if (postAttributes.url && postWithSameLink) {
            throw new Meteor.Error(302,
                "This link has already been posted.",
                postWithSameLink._id);
        }

        var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });

        var postId = Posts.insert(post);
        return postId;
    }
});
