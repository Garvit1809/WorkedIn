import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { userProps } from "../../types/userTypes";
import { BASE_URL, postEnd } from "../../utils/apiRoutes";
import { localStorageUser } from "../../utils/globalConstants";
import { getHeaders } from "../../utils/helperFunction";

const Section = styled.div`
  /* border: 1px solid red; */
  border-radius: 12px;
  padding: 0.5rem;
  padding-bottom: 0;
  background-color: rgba(58, 66, 27, 0.5);
  margin-bottom: 1rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  textarea {
    width: 100%;
    height: 25vh;
    background-color: rgba(236, 227, 212, 255);
    padding: 1rem;
    box-sizing: border-box;
    font-size: 1rem;
    outline: none;
    border: none;
    border-radius: 12px;
    margin-bottom: 1.7rem;
    color: rgb(58, 66, 27);
    resize: none;

    &::placeholder {
      color: rgb(58, 66, 27);
    }

    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: rgb(58, 66, 27);
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1rem;
  width: 100%;

  button {
    border-radius: 4px;
    cursor: pointer;
    padding: 12px 24px;
    background-color: #735f32;
    box-sizing: border-box;
    font-size: 1rem;
    color: #fff;
    font-weight: 400;
    border: 2px solid rgba(236, 227, 212, 255);
    /* border: 2px solid #3a421b; */
    box-shadow: 3px 3px 0px rgba(236, 227, 212, 255);
    translate: -3px -3px;
    transition: all 0.15s ease-in;
    /* line-height: 0; */

    &:hover {
      translate: 0;
      box-shadow: 0 0 0;
    }
  }

  div.input-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 24px;
    background-color: #735f32;
    border: 2px solid rgba(236, 227, 212, 255);
    box-shadow: 3px 3px 0px rgba(236, 227, 212, 255);
    border-radius: 4px;
    color: white;
    font-weight: 400;
    font-size: 1rem;
    box-sizing: border-box;
    cursor: pointer;
    translate: -3px -3px;
    transition: all 0.15s ease-in;
    position: relative;
    overflow: hidden;

    &:hover {
      translate: 0;
      box-shadow: 0 0 0;
    }

    input {
      top: 0;
      left: 0;
      position: absolute;
      z-index: 1000;
      opacity: 0;
      cursor: pointer;
      font-size: 24px;
      height: 100%;
    }
  }
`;

const CreatePost = () => {
  const [userData, setUserData] = useState<userProps>({});

  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(
        localStorage.getItem(localStorageUser) || "{}"
      );
      setUserData(data);
    }
    fetchUserData();
  }, []);

  const createPostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post(
      `${BASE_URL}${postEnd}`,
      {
        description,
        image,
      },
      {
        headers: getHeaders(userData.token ?? ""),
      }
    );
    console.log(data);
    window.location.reload();
  };

  const postImage = (pics: FileList | null) => {
    console.log(pics);
    if (!pics) return;
    const pic = pics[0];
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dkgrvhkxb");
      fetch("https://api.cloudinary.com/v1_1/dkgrvhkxb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
          console.log(data);
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("errrrrrorrrr");
    }
  };

  return (
    <Section>
      <form onSubmit={(e) => createPostHandler(e)}>
        <textarea
          placeholder={`Create a post ${userData.name?.split(" ")[0]}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Buttons>
          <div className="input-container">
            Choose a photo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => postImage(e.target.files)}
            />
          </div>
          <button type="submit">Create Post</button>
        </Buttons>
      </form>
    </Section>
  );
};

export default CreatePost;
