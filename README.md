# Sibers test application

Basic local real-time chat application with multiple channels. The data is stored in IndexedDB, BroadcastChannel is used for real-time support. Supported functions:
- You can send basic text messages and read other's in channels
- You can create your own channels for communication or subscribe to existing one
- You can get channel's users list
- If you're owner of the channel, you can block users
- There is users page, where you can search them

## Project Setup

```sh
npm install
npm run dev
```

## Technology stack
<font size="4">

`HTML+CSS+JS` \
`Vue3 (Composition API)` \
`TypeScript` \
`SCSS` \
`Pinia` \
`IndexedDB`

</font>

### Architecture
The application is developed using the FSD (Feature-Sliced Design) architectural methodology.

## Known issues

Due to lack of my time, something small or big have not been completed:
- Channel actions: remove, rename, search
- Channel users search, unblock
- Design is not very interesting
- Registration fields validation
- Some notifications are not made
- There is no any fetch limits and lazy loading

## Thoughts about

Well, it was an interesting experience. To be honest, it was my first chat application. The first thought I had was that I could do this using WebSocket. Just send and receive events and show data. But it must be a local application. So, the next question is where to store data. LocalStorage is very easy to use, but I decided not to use it because it's too simple. Another option is indexedDB. It was created for large applications with local storage. And it was also my first application with indexedDB. Later I realized that it doesn't have any events on data update and I need an additional transfer channel - BroadcastChannel.

Thus, most of the problems were related to questions about where in the application to fetch, store, and pass data. I'm practicing FSD now and it took me a lot of effort to figure out how to build the application and components. But I am glad I spent my time making it, even if the quality is lacking, I will keep practicing to get better.