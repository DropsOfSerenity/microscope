Template.commentSubmit.events({
    'submit form': function (e) {
        e.preventDefault();

        var $body = $(e.target).find('[name=body]');
        var commentData = {
            body: $body.val(),
            postId: this._id
        };

        Meteor.call('comment', commentData, function(error, commentId) {
            if (error) {
                throwError(error.reason);
            } else {
                $body.val('');
            }
        });

    }
});
