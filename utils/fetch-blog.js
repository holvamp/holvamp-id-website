const axios = require('axios');

// === Blogs ===
// === Blogger-API | Fetch Blog Resources ===
// = Blogger API Key =
const API_KEY = 'AIzaSyATggcpPcDwU6CX8vd1nGdSARnYDjp0WQ8';
const blog_resource_url = 'https://www.googleapis.com/blogger/v3/blogs/byurl?url=https://holvamp-belajar-html.blogspot.com/&key=';
const blog_resource = [];
let fetch_blog_resource = () => {
  const result = axios.get(`${blog_resource_url}${API_KEY}`)
  .then(function (response) {
     blog_resource.push(response.data)
  })
  .catch(function (error) {
    console.log(error);
  })
  return result
}
fetch_blog_resource();

// === Blogger-API | Fetch Blog Posts from Blogs Resources > Post resource ===
const blog_posts_url = 'https://www.googleapis.com/blogger/v3/blogs/7981172435967168790/posts?key=';  // url from hateoas
const blog_posts_data = [];
let fetch_blog_posts = () => {
  const result = axios.get(`${blog_posts_url}${API_KEY}`)
  .then(function (response) {
     blog_posts_data.push(response.data)
  })
  .catch(function (error) {
    console.log(error); 
  })
  return result
}
fetch_blog_posts()

// === Blogger-API | Fetch Blog posts from blogs resources by q:label ===
module.exports = {blog_resource, blog_posts_data}