# Markdown Blog
A Next.js blog with Markdown, uses Firebase as the DB(as I'm too lazy to write a SQLite backend). Uses Remark as the markdown converter. Uses SSG with SSR as a fallback for the Next.js server. To view a blog access `link/posts/postID`.

## Running & Building
Pnpm is used instead of npm so there maybe problems when using npm instead.  
Server is started on `localhost:3000` by default.  
Start - `pnpm dev`  
Build - `pnpm build`  

## Todo
- [ ] Setup TailwindCSS and make a base stylesheet to apply for all posts.
- [ ] Add an explorer
- [ ] Make a way to create posts
    - [ ] Built in Editor
    - [ ] Drag and drop files
