"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return <div className="mt-16 prompt_layout">
    {data.map((post)=>(
      <PromptCard
      key={post._id}
      post={post}
      handleTagClick={handleTagClick}
      />
    ))}
  </div>;
};

const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredposts,setFilteredposts] = useState([]);
  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();

    setsearchText(searchValue);

    const filtered = posts.filter(
      (post) =>
       
        (post.creator.username && post.creator.username.toLowerCase().includes(searchValue)) ||
        (post.tag && post.tag.toLowerCase().includes(searchValue)) ||
        (post.prompt && post.prompt.toLowerCase().includes(searchValue))  ||
        (post.creator.email && post.creator.email.toLowerCase().includes(searchValue)) 
       
      );

    console.log(posts);

    console.log(filtered);

    setFilteredposts(filtered);


  };
  console.log(searchText);
  


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredposts(data);
    };

    fetchPosts();
   
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={filteredposts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
