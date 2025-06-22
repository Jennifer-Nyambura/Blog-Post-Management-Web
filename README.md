# Blog-Post-Management-Web
# Blog Post Manager

A simple and elegant blog post management application that allows users to view, create, edit, and delete blog posts. Built with vanilla JavaScript, HTML, and CSS.

## Author
**Jennifer Nyambura**

## Features

- **View All Posts** - See a list of all blog posts with titles and authors
- **Post Details** - Click on any post to view its full content
- **Add New Posts** - Create new blog posts with title, content, and author
- **Edit Posts** - Update existing post titles and content
- **Delete Posts** - Remove posts with confirmation dialog
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Modern UI** - Beautiful gradient design with smooth animations

## Screenshots

The application features a clean, modern interface with:
- A sidebar showing all blog posts
- A main content area for post details
- An edit form for updating posts
- A form at the bottom for adding new posts

## Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - DOM manipulation and API communication
- **JSON Server** - Mock REST API for backend functionality

## Project Structure

```
blog-post-manager/
├── index.html          # Main HTML file
├── src/
│   └── index.js        # JavaScript functionality
├── css/
│   └── styles.css      # Styling and layout
└── db.json            # Sample data for JSON server
```

## Setup Instructions

### Prerequisites
- Node.js installed on your computer
- A modern web browser

### Installation

1. **Clone or download the project files**
   ```bash
   git clone <your-repo-url>
   cd blog-post-manager
   ```

2. **Install JSON Server globally**
   ```bash
   npm install -g json-server@0.17.4
   ```

3. **Start the backend API**
   ```bash
   json-server db.json
   ```
   This will start the API at `http://localhost:3000`

4. **Start the frontend**
   - Option 1: Use live-server
     ```bash
     npm install -g live-server
     live-server
     ```
   - Option 2: Simply open `index.html` in your web browser

## API Endpoints

The application uses the following REST API endpoints:

- `GET /posts` - Retrieve all blog posts
- `GET /posts/:id` - Retrieve a single post by ID
- `POST /posts` - Create a new blog post
- `PATCH /posts/:id` - Update an existing post
- `DELETE /posts/:id` - Delete a post

## How to Use

1. **Viewing Posts**: When the page loads, you'll see a list of all blog posts in the sidebar. The first post's details will automatically appear in the main content area.

2. **Reading a Post**: Click on any post title in the sidebar to view its full content, including title, author, and content.

3. **Adding a New Post**: Scroll down to the "Add New Post" form, fill in the title, content, and author fields, then click "Add Post".

4. **Editing a Post**: When viewing a post's details, click the "Edit" button to modify the title and content. Click "Update Post" to save changes or "Cancel" to discard them.

5. **Deleting a Post**: When viewing a post's details, click the "Delete" button and confirm the deletion when prompted.

## Core Features Implemented

### Core Deliverables ✅
- [x] Display all blog post titles and authors in a list
- [x] Click on post titles to view full details
- [x] Add new blog posts through a form
- [x] Proper main() function initialization

### Advanced Deliverables ✅
- [x] First post loads automatically on page load
- [x] Edit functionality with dedicated form
- [x] Delete functionality with confirmation dialog

### Extra Advanced Deliverables ✅
- [x] POST requests to persist new posts to the backend
- [x] PATCH requests to persist post updates to the backend
- [x] DELETE requests to persist post deletions to the backend

## Sample Data

The `db.json` file includes 5 sample blog posts covering topics like:
- JavaScript fundamentals
- CSS design techniques
- Node.js API development
- React Hooks
- Database design

## Browser Compatibility

This application works in all modern browsers including:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

This project is open source and available under the MIT License.

---

**Built with ❤️ by Jennifer Nyambura**