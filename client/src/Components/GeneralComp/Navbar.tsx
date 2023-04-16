import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userProps } from "../../types/userTypes";
import { localStorageUser } from "../../utils/globalConstants";

const Section = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  background-color: rgba(137,117,88,255);
`;

const Logo = styled.div`
  position: absolute;
  left: 0;
  margin-left: 7vw;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  height: 3.5rem;
  z-index: 10;
  padding: 0rem 1.5rem;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color:#3a421b;
  h2{
    color: #d6ec6f;
  }
  `;

const Menu = styled.ul`
/* border: 1px solid red; */
position: absolute;
right: 0;
list-style: none;
display: flex;
align-items: center;
justify-content: space-between;
margin-right: 4rem;
height: 3rem;
z-index: 10;
cursor: auto;
`;

const MenuItem = styled.li`
margin: 0 1rem;
background-color: rgba(58, 66, 27,1);
height: 3rem;
color: #d6ec6f;
display: flex;
align-items: center;
justify-content: center;
padding: 0 1rem;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
font-size: 1rem;
cursor: pointer;
`;

const Navbar = () => {
  const [localUser, setLocalUser] = useState<userProps>({});

  async function fetchUserData() {
    const data = await JSON.parse(
      localStorage.getItem(localStorageUser) || "{}"
    );
    setLocalUser(data);
  }

  useEffect(() => {
    fetchUserData();
    // console.log(params.id);
  }, []);

  const navigate = useNavigate()

  const profileNavigator = () => {
    navigate(`/profile/${localUser.name}`, {
      state: {
        id: localUser._id
      }
    })
  }

  return (
    <Section>
      <Logo>
        <h2>WorkedIn</h2>
      </Logo>
      <Menu>
        <Link to="/">
          <MenuItem>Home</MenuItem>
        </Link>
        <Link to="/chats">
          <MenuItem>Chats</MenuItem>
        </Link>
        <Link to="/contracts">
          <MenuItem>My Contracts</MenuItem>
        </Link>
        <Link to="/profile/me" >
          <MenuItem>Profile</MenuItem>
        </Link>
      </Menu>
    </Section>
  );
};

export default Navbar;
