// Fixtures
if (Posts.find().count() === 0) {
    var now = new Date().getTime();

    var tomId = Meteor.users.insert({
        profile: {name: 'Tom Coleman'}
    });
    var tom = Meteor.users.findOne(tomId);
    var sachaId = Meteor.users.insert({
        profile: {name: 'Sacha Greif'}
    });
    var sacha = Meteor.users.findOne(sachaId);

    var telescopeId = Posts.insert({
        title: 'Introducing Telescope',
        author: sacha.profile.name,
        url: 'http://sachagreif.com/introducing-telescope/',
        userId: sacha._id,
        submitted: now - 7 * 3600 * 1000
    });

    Comments.insert({
        postId: telescopeId,
        userId: tom._id,
        author: tom.profile.name,
        submitted: now - 5 * 3600 * 1000,
        body: 'Interesting projects, how do I contribute?'
    });

    Comments.insert({
        postId: telescopeId,
        userId: sacha._id,
        author: sacha.profile.name,
        submitted: now - 3 * 3600 * 1000,
        body: 'By being a baller'
    });

    Posts.insert({
        title: 'Meteor',
        url: 'http://meteor.com',
        userId: tom._id,
        author: tom.profile.name,
        submitted: now - 10 * 3600 * 1000
    });

    Posts.insert({
        title: 'The Meteor Book',
        url: 'http://themeteorbook.com',
        userId: tom._id,
        author: tom.profile.name,
        submitted: now - 12 * 3600 * 1000
    });
}
