import { useState, useEffect } from "react";
import { api } from "../../API/api";
import { FindFriendsContainer,FindFriendsPageContainer } from "../../Styles/FindFriends/FindFriendsStyles";
import ProfileCard from "../../Components/FindFriends/ProfileCard";

export default function FindFriends() {
    const [usersList, setUsersList] = useState([]);
    const [me, setMe] = useState({});
    const localAccessToken = localStorage.getItem("accessToken");
    const authorization = {
        headers: {
            Authorization: `Bearer ${localAccessToken}`,
        },
        };

    const retrieveFindFriends = async () => {
        if (localAccessToken) {
            const limit = 15;
            const getUsers = await api.get(`/users/?limit=${limit}`, authorization);
            setUsersList(getUsers.data.results);
        } else {
            console.log("No User Found.");
        }
    };

    const retrieveMe = async () => {
        try {
            if (localAccessToken) {
            const getMe = await api.get("/users/me", authorization);
            setMe(getMe.data)
            }
        } catch (error) {
            console.log(error.message);
        }
        };

        useEffect(() => {
        retrieveFindFriends();
        retrieveMe();
        }, []);

    return (
        <>
            <FindFriendsPageContainer>
            <FindFriendsContainer>
                {usersList &&
                usersList.map((user) => (
                    <ProfileCard userData={user} me={me} key={user.id} />
                ))}
            </FindFriendsContainer>
            </FindFriendsPageContainer>
        </>
        );
    }