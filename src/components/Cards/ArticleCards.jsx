import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import { MdOutlineReportGmailerrorred } from "react-icons/md";

import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ArticleInteractions } from "../../Services/Services";
import { jwtDecode } from "jwt-decode";
import { ConfirmDialogue } from "../drawer/ConfirmDialogue";

export function ArticleCards({name , description, image , tags, category, author,id,like,dislike,userInteractions,onokclick }) {
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token)

  const onSubmit = ()=>{
    const preference = 'foryou'
    onokclick(preference);
  }
  useEffect(() => {
    const currentUserInteraction = userInteractions.find(interaction => interaction.user === decoded.user_id);
  
    if (currentUserInteraction) {
      setIsLiked(currentUserInteraction.liked);
      setIsDisliked(currentUserInteraction.disliked);
    } else {
      setIsLiked(false);
      setIsDisliked(false);
    }
  }, []);
  



  // truncate words 
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(' ');
  
    if (words.length > wordLimit) {
      const truncatedDescription = words.slice(0, wordLimit).join(' ') + '...';
      return truncatedDescription;
    }
    return description;
  };


  const truncatedDescription = truncateDescription(description, 35);


  const [isDisliked, setIsDisliked] = useState(false);
  const handledislike = async() => {
    try{
      const data = {
        user : decoded.user_id,
        article : id,
        action : 'dislike'
      }
      const res = await ArticleInteractions(data)
      console.log(res.data,"hi");
      setIsLiked(false);
      setIsDisliked(true);
      onSubmit();
    }catch(error){
      console.log(error);
    }
    
  };
  const [isLiked, setIsLiked] = useState(false);
  const handleLike = async() => {
    try{
      const data = {
        user : decoded.user_id,
        article : id,
        action : 'like'
      }
      const res = await ArticleInteractions(data)
      console.log(res.data,"like");
      setIsLiked(true);
      setIsDisliked(false);
      onSubmit();
    }catch(error){
      console.log(error);
    }
  };

  const handleBlock = async(id) => {
    try{
      const data = {
        user : decoded.user_id,
        article : id,
        action : 'block'
      }
      const res = await ArticleInteractions(data)
      console.log(res.data,"block");
      setIsLiked(false);
      setIsDisliked(false);
      onSubmit();
    }catch(error){
      console.log(error);
    }
  };

  return (
    <Card className="w-full max-w-[48rem] flex-col md:flex-row h-auto md:h-80">
      <CardHeader
        shadow={false}
        floated={false}
        className="mb-3 md:w-2/5 md:shrink-0 md:rounded-r-none"
      >
        <img
          src={image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="p-4 md:p-0">
        <div className="flex justify-between">
          <Typography variant="h6" color="gray" className="mt-4 mb-4 uppercase">
            {category}
          </Typography>
          <div className="mt-4 mr-8 ">
            <Tooltip content="Block this post">
              <button
                className='hover:scale-110'
                // onClick={handleLike}
              >
                <ConfirmDialogue id ={id} header = "Block" content='You wont be able to see this post again' onsubmit={handleBlock} />
                
              </button>
            </Tooltip>
          </div>
        </div>
        <Typography variant="h4" color="blue-gray" className="mb-2 w-3/4">
          {name}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
        {truncatedDescription}



        </Typography>
        <a className="inline-block">
          <div className="flex justify-around">
            <Button variant="text" className="flex items-center gap-2 mr-28">
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
            
            <div className="mt-1 ml-10 flex gap-1">
              <button
                className={` focus:outline-none transform transition-all ${
                  isLiked ? "scale-110 text-blue-700" : ""
                }`}
                onClick={handleLike}
              >
                <FaThumbsUp />
                
              </button>
              <h1 className="text-sm mt-2">{like}</h1>
              
            </div>
            
            <div className="mt-1 ml-5 flex gap-1 ">
              <button
                className={` focus:outline-none transform transition-all mt-1 ${
                  isDisliked ? "scale-110 text-blue-700" : ""
                }`}
                onClick={handledislike}
              >
                <FaThumbsDown />
              </button>
              <h1 className="text-sm mt-2">{dislike}</h1>
              
            </div>
          </div>
        </a>
      </CardBody>
    </Card>
  );
}
