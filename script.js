// Save posts in localStorage so they persist
function getPosts() {
  return JSON.parse(localStorage.getItem('posts') || '[]');
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

function renderPosts() {
  const posts = getPosts();
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';
  if (posts.length === 0) {
    postsContainer.innerHTML = '<p>No posts yet. Write your first one below!</p>';
    return;
  }
  posts.reverse().forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <h2>${post.title}</h2>
      <div>${post.content.replace(/\n/g, '<br>')}</div>
      <small>Posted on ${new Date(post.date).toLocaleString()}</small>
    `;
    postsContainer.appendChild(div);
  });
}

document.getElementById('postForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();
  if (!title || !content) return;
  const posts = getPosts();
  posts.push({
    title,
    content,
    date: new Date().toISOString()
  });
  savePosts(posts);
  this.reset();
  renderPosts();
});

window.onload = renderPosts;
