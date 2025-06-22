
// Global variables
let posts = [];
let currentPostId = null;
const BASE_URL = 'http://localhost:3000';

// Main function to initialize the app
function main() {
    displayPosts();
    addNewPostListener();
    setupEditFormListeners();
}

// Display all posts in the sidebar
async function displayPosts() {
    try {
        const response = await fetch(`${BASE_URL}/posts`);
        if (!response.ok) throw new Error('Failed to fetch posts');

        posts = await response.json();
        renderPostList();

        if (posts.length > 0) {
            handlePostClick(posts[0]); // Show first post on load
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        displayErrorMessage();
    }
}

// Render the post list in the sidebar
function renderPostList() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';

    if (posts.length === 0) {
        postList.innerHTML = '<li class="empty-state">No posts available</li>';
        return;
    }

    posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.className = 'post-item';
        listItem.innerHTML = `
            <div class="post-title">${post.title}</div>
            <div class="post-author">by ${post.author}</div>
        `;
        listItem.addEventListener('click', () => handlePostClick(post));
        postList.appendChild(listItem);
    });

    updateActivePost(currentPostId);
}

// Handle post click to show details
async function handlePostClick(post) {
    try {
        const response = await fetch(`${BASE_URL}/posts/${post.id}`);
        if (!response.ok) throw new Error('Failed to fetch post details');

        const postData = await response.json();
        currentPostId = postData.id;
        displayPostDetails(postData);
        updateActivePost(postData.id);
    } catch (error) {
        console.error('Error fetching post details:', error);
        currentPostId = post.id;
        displayPostDetails(post);
        updateActivePost(post.id);
    }
}

// Display post details
function displayPostDetails(post) {
    const postDetail = document.getElementById('post-detail');
    const editForm = document.getElementById('edit-post-form');
    editForm.classList.add('hidden');

    postDetail.innerHTML = `
        <div class="post-detail-content">
            <h2 class="post-detail-title">${post.title}</h2>
            <p class="post-detail-author">by ${post.author}</p>
            <div class="post-detail-text">${post.content}</div>
            <div class="post-actions">
                <button class="btn btn-edit" onclick="showEditForm()">✏️ Edit</button>
                <button class="btn btn-delete" onclick="deletePost(${post.id})">🗑️ Delete</button>
            </div>
        </div>
    `;
}

// Highlight selected post
function updateActivePost(postId) {
    const postItems = document.querySelectorAll('.post-item');
    postItems.forEach(item => item.classList.remove('active'));

    const index = posts.findIndex(p => p.id === postId);
    if (index !== -1) {
        postItems[index].classList.add('active');
    }
}

// Handle new post creation
function addNewPostListener() {
    const form = document.getElementById('new-post-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const newPost = {
            title: formData.get('title'),
            content: formData.get('content'),
            author: formData.get('author')
        };

        try {
            const response = await fetch(`${BASE_URL}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPost)
            });

            if (!response.ok) throw new Error('Failed to create post');

            const savedPost = await response.json();
            posts.push(savedPost);
            renderPostList();
            form.reset();
            handlePostClick(savedPost);
            showFormMessage('✅ Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
            showFormMessage('❌ Failed to create post. Please try again.', 'error');
        }
    });
}

// Setup edit form
function setupEditFormListeners() {
    const editForm = document.getElementById('edit-post-form');
    const cancelBtn = document.getElementById('cancel-edit');

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(editForm);
        const updatedPost = {
            title: formData.get('title'),
            content: formData.get('content'),
            author: posts.find(p => p.id === currentPostId)?.author || 'Unknown'
        };

        try {
            const response = await fetch(`${BASE_URL}/posts/${currentPostId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPost)
            });

            if (!response.ok) throw new Error('Failed to update post');

            const savedPost = await response.json();
            updateLocalPost(savedPost);
            renderPostList();
            displayPostDetails(savedPost);
            updateActivePost(currentPostId);
        } catch (error) {
            console.error('Error updating post:', error);
            showFormMessage('❌ Failed to update post.', 'error');
        }
    });

    cancelBtn.addEventListener('click', () => {
        editForm.classList.add('hidden');
        const currentPost = posts.find(p => p.id === currentPostId);
        if (currentPost) displayPostDetails(currentPost);
    });
}

// Show edit form
function showEditForm() {
    const currentPost = posts.find(p => p.id === currentPostId);
    if (!currentPost) return;

    const editForm = document.getElementById('edit-post-form');
    const postDetail = document.getElementById('post-detail');

    document.getElementById('edit-title').value = currentPost.title;
    document.getElementById('edit-content').value = currentPost.content;

    postDetail.innerHTML = '';
    editForm.classList.remove('hidden');
}

// Delete post
async function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete post');

        removeLocalPost(postId);
        renderPostList();

        const postDetail = document.getElementById('post-detail');
        postDetail.innerHTML = `
            <div class="empty-state">
                <h3>Post deleted successfully!</h3>
                <p>Select another post to view its details.</p>
            </div>
        `;

        if (posts.length > 0) {
            setTimeout(() => handlePostClick(posts[0]), 1000);
        }

        showFormMessage('🗑️ Post deleted!');
    } catch (error) {
        console.error('Error deleting post:', error);
        showFormMessage('❌ Failed to delete post.', 'error');
    }
}

// Helper to update local post data
function updateLocalPost(updatedPost) {
    const index = posts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) posts[index] = updatedPost;
}

// Helper to remove post locally
function removeLocalPost(postId) {
    posts = posts.filter(p => p.id !== postId);
}

// Show error when API fails
function displayErrorMessage() {
    const postList = document.getElementById('post-list');
    postList.innerHTML = `
        <li class="empty-state">
            <strong>Unable to connect to the server</strong><br>
            Please make sure json-server is running:<br>
            <code>json-server db.json</code>
        </li>
    `;
}

// Show feedback messages
function showFormMessage(message, type = 'success') {
    const messageBox = document.getElementById('form-message');
    messageBox.textContent = message;
    messageBox.className = `form-message ${type}`;
    messageBox.classList.remove('hidden');

    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 3000);
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', main);
