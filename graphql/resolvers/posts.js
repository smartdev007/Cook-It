const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../util/check-auth');

module.exports = {
  Query: {
    async getPosts(_, {category, search_str}) {
      console.log("I am a fury, here's getPosts() data\n");
      console.log(category, "  ", search_str);
      category = category=="Any" ? "" : category;
      let filter = {};
      try {
        const posts = await Post.find(
          {$and : [
            {catagory : new RegExp(category, "i")},
            { $or : [
                {title: new RegExp(search_str, "i")}, {content :  new RegExp(search_str, "i")}
            ]}
          ]}
        ).sort({ createdAt: -1 });
        console.log(posts,"posts")
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { title,content,image,youtube, catagory }, context) {
      console.log(title,'', youtube);
      const user = checkAuth(context);

      if (title.trim() === '') {
        throw new Error('title must not be empty');
      }
      if (content.trim() === '') {
        throw new Error('content must not be empty');
      }
      if (image.trim() === '') {
        throw new Error('image must not be empty');
      }
      if (catagory.trim() === '') {
        throw new Error('catagory must not be empty');
      }
      
      const newPost = new Post({
        title,
        content,
        image,
        youtube,
        catagory,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          // Post already likes, unlike it
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // Not liked, like post
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError('Post not found');
    }
  }
};