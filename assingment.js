const express = require('express');
const axios = require('axios');
const _ = require('lodash');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to fetch blog data from the provided API
app.get('/api/blog-stats', async (req, res) => {
  try {
    const blogData = await fetchBlogData();
    const analytics = analyzeBlogData(blogData);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching and analyzing blog data' });
  }
});

// Middleware to search blogs based on a query parameter
app.get('/api/blog-search', (req, res) => {
  const query = req.query.query.toLowerCase();
  const blogData = fetchBlogData(); // Fetch data, you can use memoization for optimization
  const matchingBlogs = searchBlogs(blogData, query);
  res.json(matchingBlogs);
});

// Fetch blog data from the provided API
async function fetchBlogData() {
  try {
    const response = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
      headers: {
        'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data from the third-party API');
  }
}

// Data Analysis
function analyzeBlogData(blogData) {
  const totalBlogs = blogData.length;
  const longestTitleBlog = _.maxBy(blogData, (blog) => blog.title.length);
  const privacyBlogs = _.filter(blogData, (blog) =>
    blog.title.toLowerCase().includes('privacy')
  );
  const uniqueTitles = _.uniqBy(blogData, 'title');

  return {
    totalBlogs,
    longestTitle: longestTitleBlog.title,
    privacyBlogs: privacyBlogs.length,
    uniqueTitles: uniqueTitles.map((blog) => blog.title),
  };
}

// Blog Search Function
function searchBlogs(blogData, query) {
  return blogData.filter((blog) =>
    blog.title.toLowerCase().includes(query)
  );
}

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
