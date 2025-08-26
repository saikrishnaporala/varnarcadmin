// components/BlogCard.tsx
import { WPPost } from "@/lib/api/getWPBlogs";
import React from "react";



interface BlogCardProps {
  post: WPPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const authorName = post._embedded?.author?.[0]?.name || post.author;

  return (
    <div className="flex max-w-8xl bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <div className="w-1/3">
        <img
          src={imageUrl || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={post.title.rendered}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Content Section */}
      <div className="w-2/3 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <span>{new Date(post.date).toDateString()}</span>
            <span className="ml-4 bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium">
              Marketing
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            {post.title.rendered}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam
            vitae illo. Non aliquid explicabo necessitatibus unde. Sed
            exercitationem placeat consectetur nulla deserunt vel iusto corrupti
            dicta laboris incididunt.
          </p>
        </div>

        {/* Author */}
        <div className="mt-6 flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="/path-to-avatar.jpg" // replace with actual avatar
            alt="Michael Foster"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{authorName}</p>
            <p className="text-sm text-gray-500">Co-Founder / CTO</p>
          </div>
        </div>
      </div>
    </div>
    // <div className="relative rounded-xl overflow-hidden shadow-lg group" key={post.id}>
    //   <img
    //     src={imageUrl || "https://via.placeholder.com/400x200?text=No+Image"}
    //     alt={post.title.rendered}
    //     className="w-full h-30 object-cover"
    //   />

    //   <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
    //     <div className="text-sm flex items-center space-x-2 mb-1">
    //       <span>{new Date(post.date).toDateString()}</span>
    //       <span className="w-6 h-6 rounded-full overflow-hidden" />
    //       <span>{authorName}</span>
    //     </div>
    //     <h3 className="text-lg font-semibold">{post.title.rendered}</h3>
    //   </div>
    // </div>
  );
};

export default BlogCard;
