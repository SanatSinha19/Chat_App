import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUserForSidebar = async(req, res) => {
    try{
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    }catch (error) {
        console.error("Error in getUserForSidebar: ", error.message);
        res.status(500).json({error : "Internal server error"});
    }
};

export const getMessage = async(req, res) => {
    try {
        const {id: userToChatId} = req.params
        const myId = req.user._id;
        const message = await Message.find({
            $or:[
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })
        res.status(200).json(message);
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}