import React from 'react'
import { StreamChat } from 'stream-chat'
import { ChannelList, Chat } from 'stream-chat-react'
import { Channel } from 'stream-chat-react'
import Cookies from 'universal-cookie/es6'
import { ChannelContainer, ChannelListContainer } from './components';

const apiKey = "qgtk9ttyha7j";

const client = StreamChat.getInstance(apiKey)l

const App = () => {
    return (
        <div className="app__wraper">
            <Chat client={client} theme="team dark">
                <ChannelListContainer />
                <ChannelContainer />
            </Chat>
        </div>
    )
}

export default App
