import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
  role: string;
  comments: Comment[];
  reactions: { [emoji: string]: number };
  tempComment?: string;
}

interface Comment {
  author: string;
  role: string;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  posts: Post[] = [];
  newPostContent = '';
  currentUser = {
    name: 'Anonymous',
    role: 'donor' // Default to 'donor' if no user found
  };

  ngOnInit(): void {
    // Retrieve posts from localStorage
    const storedPosts = localStorage.getItem('community_posts');
    this.posts = storedPosts ? JSON.parse(storedPosts) : [];

    // Retrieve user information from localStorage (After login/signup)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      this.currentUser = {
        name: parsedUser.fullName || parsedUser.username || 'Anonymous',
        role: parsedUser.role || 'donor' // Default to 'donor' if role is missing
      };
    }
  }

  postMessage(): void {
    if (!this.newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      author: this.currentUser.name,
      content: this.newPostContent.trim(),
      timestamp: new Date(),
      role: this.currentUser.role, // Save the user role with the post
      comments: [],
      reactions: {},
      tempComment: ''
    };

    this.posts.unshift(newPost);
    this.newPostContent = '';
    this.savePosts();
  }

  addComment(post: Post): void {
    const commentText = post.tempComment?.trim();
    if (!commentText) return;

    post.comments.push({
      author: this.currentUser.name,
      content: commentText,
      role: this.currentUser.role, // Save the user role with the comment
      timestamp: new Date()
    });

    post.tempComment = '';
    this.savePosts();
  }

  reactToPost(post: Post, emoji: string): void {
    const updatedPosts = [...this.posts];
    const index = updatedPosts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      const targetPost = updatedPosts[index];
      if (!targetPost.reactions[emoji]) {
        targetPost.reactions[emoji] = 0;
      }
      targetPost.reactions[emoji]++;
      this.posts = updatedPosts;
      this.savePosts();
    }
  }

  savePosts(): void {
    localStorage.setItem('community_posts', JSON.stringify(this.posts));
  }

  clearAllPosts(): void {
    if (confirm('Are you sure you want to delete all posts?')) {
      this.posts = [];
      localStorage.removeItem('community_posts');
    }
  }
}
