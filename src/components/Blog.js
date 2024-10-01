// Blog.js
import React from 'react';
// import posts from './posts'; // Array of post metadata

function Blog() {
  return (
    <section id="blog" className="blog">
      <h2>Latest Posts</h2>
      <div className="post-list">
        {/* {posts.map((post) => (
          <div className="post-preview" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <a href={`/blog/${post.slug}`} className="read-more">Read More</a>
          </div>
        ))} */}
      </div>
    </section>
  );
}

export default Blog;
