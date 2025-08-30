# **EasyShop** _FrontEnd_
[Live Demo](https://easy-shop-puce.vercel.app)
### Deploy in vercel 
- **deploy issue** // use vercel.json for 404,500 and nested routing or other issue 
- **package.json** // and engine node 22.x(2025August), add main (must be index.js)
- **.env handle** // like use some variable value (URL) different both site localhost and vercel 
- **cookie not set problem** // with credential every cookie use get or post 

### problems && setup guided front-end
#### redirect problem solved:
- **AppWrapper** // must be use because authenticated user storing in state(for all page access) like redux dispatch call 
- **private rout** // must be at lest one time dispatch user from private rout because when navigate suddenly you lost token 
#### other issue :
- **Reload problem in private rout** //state loading correction initially true loading
    - use <Navigate to> normally but when use useEffect then use navigate()
- **redirect and back problem** // when navigate then use replace 
- **folder structure issue** // maintain clean structure like pages,component,layout,rout,server,app,feature etc use 
- **animation use** //key=location.pathname, and location=location use in <Routes key location>
- **dark mode** // handling with tailwind and  use only index.css and index.html use "dark" class
- **theme** // use other class in html file for use other theme like blue , red, yellow, green etc

## vercel deploying :
- must be main file name is **index.js**
- vercel.json file
- package.json configure //must use node version like 20.x in 2025 august
- cors setup
- cookie setup
- routing issue // 404,500
