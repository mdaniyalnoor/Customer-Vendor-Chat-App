class WebSockets {
    users = []
    connection = (socket) => {
        socket.on('user_connected', data => {
            let userTemp = this.users.filter(i => i.chatId == data.chatId && i.userId == data.user && socket.id == i.socketId )
            if (userTemp && userTemp.length) {
                return false
            }
            this.users.push({
                socketId: socket.id,
                chatId: data.chatId,
                userId: data.user
            })
            global.io.emit("user_connected", this.users)
        })

        socket.on('message', data => {
            let soc = this.users.filter(i => i.chatId == data.chatId && i.userId == data.reciever)
            if (soc && soc.length) {
                for(let i =0; i < soc.length; i ++){
                    global.io.to(soc[i].socketId).emit('message', {...data.data})
                }
            }
        })

        socket.on('disconnected', data => {
            this.users = this.users.filter((user) => user.socketId !== socket.id);

        })
    }
}

module.exports = new WebSockets()