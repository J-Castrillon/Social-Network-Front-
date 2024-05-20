import { getFetching } from "../Fetching/Fetchs"

export const GetProfile = async (idProfile, setProfile) => {
    const request = await getFetching(`user/profile/${idProfile}`); 

    if(request?.status === 'Success'){
        console.log(request.userProfile)
        setProfile(request?.userProfile);
    }
}