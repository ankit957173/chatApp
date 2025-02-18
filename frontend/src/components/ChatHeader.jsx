import { X, ChevronLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
    const { selectedUser, setSelectedUser, toggleSidebar, isSidebarVisible } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const handleButtonClick = () => {
        if (!isSidebarVisible) {
            toggleSidebar();
        }
        setSelectedUser(null);
    };

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={toggleSidebar} className="mr-2">
                        <ChevronLeft />
                    </button>
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-medium">{selectedUser.fullName}</h3>
                        <p className="text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>
                {/* onclick toggleSidebar should also run in below function  */}
                <button onClick={handleButtonClick}>
                    <X />
                </button>
            </div>
        </div>
    );
};
export default ChatHeader;