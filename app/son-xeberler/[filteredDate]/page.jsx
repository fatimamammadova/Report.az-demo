"use client";
import { useEffect, useState } from "react";
import NewsData from "../NewsData/NewsData";
import { getNews } from "@/app/lib/data";

export const FilterDateNews = ({ params: { filteredDate } }) => {
  const [filterData, setFilterData] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const post = await getNews();
      setPosts(post);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (filteredDate && Array.isArray(posts) && posts.length > 0) {
      const currentDate = new Date();
      currentDate;
      let filteredPosts = [];
      switch (filteredDate) {
        case "today":
          filteredPosts = posts.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate.toDateString() === currentDate.toDateString();
          });
          break;
        case "yesterday":
          currentDate.setDate(currentDate.getDate() - 1);
          filteredPosts = posts.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate.toDateString() === currentDate.toDateString();
          });
          break;
        case "this_week":
          currentDate.setDate(currentDate.getDate()); // Set the date to current week
          let CurrentWeekDay = currentDate.getDay(); // Get the day of the week for the current week date
          const currentWeek = [];
          currentDate.setDate(currentDate.getDate() + 1); // Move to Monday
          if (CurrentWeekDay === 1) {
            for (let i = 0; i < 7; i++) {
              const date = new Date(currentDate);
              date.setDate(date.getDate() + i);
              currentWeek.push(date);
            }
          } else {
            for (let i = 0; i < 7; i++) {
              const date = new Date(currentDate);
              date.setDate(date.getDate() - CurrentWeekDay);
              date.setDate(date.getDate() + i);
              currentWeek.push(date);
            }
          }

          filteredPosts = posts.filter((item) => {
            const itemDate = new Date(item.date);
            for (let i = 0; i < currentWeek.length; i++) {
              if (currentWeek[i].toDateString() === itemDate.toDateString()) {
                return item;
              }
            }
          });
          break;
        case "this_month":
          currentDate.setDate(currentDate.getMonth());
          filteredPosts = posts.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate.getMonth() === currentDate.getMonth();
          });
          break;
        case "prev_week":
          currentDate.setDate(currentDate.getDate() - 7); // Set the date to a week ago
          let prevWeekDay = currentDate.getDay(); // Get the day of the week for the week ago date
          const previousWeek = [];
          currentDate.setDate(currentDate.getDate() + 1); // Move to Monday
          if (prevWeekDay === 1) {
            for (let i = 0; i < 7; i++) {
              const date = new Date(currentDate);
              date.setDate(date.getDate() + i);
              previousWeek.push(date);
            }
          } else {
            for (let i = 0; i < 7; i++) {
              const date = new Date(currentDate);
              date.setDate(date.getDate() - prevWeekDay);
              date.setDate(date.getDate() + i);
              previousWeek.push(date);
            }
          }
          filteredPosts = posts.filter((item) => {
            const itemDate = new Date(item.date);
            for (let i = 0; i < previousWeek.length; i++) {
              if (previousWeek[i].toDateString() === itemDate.toDateString()) {
                return item;
              }
            }
          });
          break;
        case "prev_month":
          currentDate.setDate(currentDate.getMonth() - 1);
          filteredPosts = posts.filter((item) => {
            const itemDate = new Date(item.date);
            itemDate;
            return itemDate.getMonth() === currentDate.getMonth();
          });
          break;
        default:
          filteredPosts = [];
      }

      setFilterData(filteredPosts);
    } else {
      setFilterData([]);
    }
  }, [filteredDate, posts]);

  return <NewsData posts={filterData} />;
};

export default FilterDateNews;