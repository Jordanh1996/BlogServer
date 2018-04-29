<h1>Blog Server</h1>

<p>Link to web page: https://blog-jordan.herokuapp.com<p>

<h2>Description</h2>
    <p>The purpose of this web server is to allow the user to extract, post, remove and edit blogs from the server.</p>
    <p>The web page purpose is to store text files in your user, the files are not private so everyone else can see your text files, but not edit them. This site is very handy for learning purposes to store your text documents on the server, and to share with other people.</p>

<h2>Technologies</h2>
    <ul>Routes: Express.</ul>
    <ul>Authentication: jsonwebtoken, bcrypt.</ul>
    <ul>Database: MongoDB.</ul>
    <ul>Cache: Redis</ul>

<h2>Problems & Solutions</h2>
    <ul>Issues with the Cross-Origin-Resource Sharing permissions, solved it by using cors third party library.</ul>
    <ul>Had issues after retrieving data from redis. The data was regular objects while data that comes from the MySQL database are models. Solved by turning the regular objects to model instances.</ul>