const chatRoutes = {
    sendMessage: 'https://www.jobeee.website/v2/api/chat/message',

    createConvo: 'https://www.jobeee.website/v2/api/chat/convo',

    getConvo: (userId:string) => `https://www.jobeee.website/v2/api/chat/convo/${userId}`,

    uploadMedia: 'https://www.jobeee.website/v2/api/chat/message',

    chatMessage: (id:string) => `https://www.jobeee.website/v2/api/chat/message/${id}`,

    chatNotification: 'https://www.jobeee.website/v2/api/chat/getallmessages',

    deleteAllNotification: 'https://www.jobeee.website/v2/api/chat/deleteallmessages',

    deleteSingleNotification: 'https://www.jobeee.website/v2/api/chat/deleteallmessagesatindex',
};

export default chatRoutes;
