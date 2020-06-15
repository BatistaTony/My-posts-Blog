"use strict";

//bring the model

const Post = use("App/Models/Post");

class PostController {
  async index({ view }) {
    const posts = await Post.all();

    return view.render("posts.index", {
      title: "Latest post",
      posts: posts.toJSON(),
    });
  }

  async details({ params, view }) {
    const post = await Post.find(params.id);

    return view.render("posts.details", {
      post,
    });
  }

  async add({ view }) {
    return view.render("posts.add");
  }

  async store({ request, response, session }) {
    const post = new Post();

    post.title = request.input("title");
    post.body = request.input("body");

    await post.save();

    session.flash({ notification: "Post Added !" });

    return response.redirect("posts");
  }

  async edit({ params, view }) {
    const post = await Post.find(params.id);

    return view.render("posts.edit", {
      post,
    });
  }

  async update({ params, request, response, session }) {
    const post = await Post.find(params.id);

    post.title = request.input("title");
    post.body = request.input("body");

    await post.save();

    session.flash({ notification: "Post updated" });

    return response.redirect("/posts");
  }

  async destroy({ params, session, response }) {
    const post = await Post.find(params.id)
    
    await post.delete()

     session.flash({ notification: "Post deleted" });

     return response.redirect("/posts");

  }
}

module.exports = PostController;
