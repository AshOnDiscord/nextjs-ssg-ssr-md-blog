import React, { useRef, useState } from "react";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { v4 as uuidv4 } from "uuid";

type mdFile = {
  file: File;
  preview: string;
  htmlPreview: string;
  id: string;
};

export default function FileInput() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [posts, setPosts] = useState<mdFile[]>([]);
  const [current, setCurrent] = useState<number>(0);

  const mdToHtml = async (md: string): Promise<string> => {
    const html: string = await (
      await remark().use(remarkGfm).use(remarkHtml).process(md)
    ).toString();

    return html;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const mdFiles: mdFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = file.name.split(".").pop();
      if (fileExtension !== "md" && fileExtension !== "markdown") {
        // Reject the file
        continue;
      }

      const reader = new FileReader();
      reader.onloadend = async () => {
        mdFiles.push({
          file,
          preview: reader.result as string,
          htmlPreview: await mdToHtml(reader.result as string),
          id: uuidv4(),
        });
        setPosts(mdFiles);
        console.log(mdFiles);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (!files) return;

    fileInput.current!.files = files;
    const changeEvent = {
      target: fileInput.current,
    } as React.ChangeEvent<HTMLInputElement>;
    handleFileChange(changeEvent);
  };

  const cancelPost = (index: number) => {
    const newPosts = [...posts];
    newPosts.splice(index, 1);
    setPosts(newPosts);

    if (current > newPosts.length - 1 && current !== 0) setCurrent(current - 1);
  };

  const uploadPost = async (index: number) => {
    const post = posts[index].preview;
    // const postTitle = post.slice(-2).replaceAll(" ", "-").toLowerCase();

    cancelPost(index);

    await fetch("http://localhost:5000/", {
      method: "POST",
      body: post,
    });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div
          className="cursor-pointer bg-zinc-900 text-white hover:text-[#0070f3] transition-all font-semibold text-4xl p-4 rounded-md aspect-square flex justify-center items-center w-[min(60vw,60vh)] max-w-[min(min(60vw,60vh),32rem)] border-white hover:border-[#0070f3] border-2"
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
          onClick={() => fileInput.current!.click()}
        >
          <input
            className="sr-only"
            type="file"
            ref={fileInput}
            multiple
            onChange={handleFileChange}
          />
          <p>Upload Markdown</p>
        </div>
      </div>
      {/* Post confirmation */}
      {posts.length > 0 && (
        <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center">
          <div className="bg-zinc-900 w-4/5 rounded-lg max-w-4xl max-h-4xl h-4/5 grid grid-rows-[min-content,auto,min-content]">
            <div className="bg-black/50 p-4 rounded-t-lg">
              <h1 className="font-semibold text-xl">
                {posts[current].file.name}
              </h1>
            </div>
            <p
              className="md m-4 overflow-scroll"
              dangerouslySetInnerHTML={{ __html: posts[current].htmlPreview }}
            ></p>
            <div className="p-4 bg-black/25 flex justify-between">
              <ul className="gap-2 flex">
                {posts.map((post, index) => (
                  <li key={post.id}>
                    <button
                      className={`bg-${
                        index == current ? "[#0070f3]" : "black"
                      } p-1 px-2 rounded-md`}
                      onClick={() => setCurrent(index)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button
                  className="bg-[#0070f3] p-1 px-2 rounded-md"
                  onClick={() => uploadPost(current)}
                >
                  Upload
                </button>
                <button
                  className="p-1 px-2 rounded-md"
                  onClick={() => cancelPost(current)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
