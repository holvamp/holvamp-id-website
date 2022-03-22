// Local Module
const {blog_resource, blog_posts_data} = require('./utils/fetch-blog')
const {contact_us_connection} = require('./utils/contact-us-process')
// Express
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
// axios
const axios = require('axios')
const API_KEY = 'AIzaSyATggcpPcDwU6CX8vd1nGdSARnYDjp0WQ8';
// HTML parser

// Express view engine EJS.
const expressLayouts = require('express-ejs-layouts');
app.set('view engine', 'ejs');
app.use(expressLayouts);

// built-in middleware.
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));

// === Routing Middleware. ===
// == pages routes ==
const pages = [
    {
        to: '/',
        page_title: 'Utama'
    },
    {
        to: '/about',
        page_title: 'Tentang'
    },
    {
        to: '/blogs',
        page_title: 'Blog'
    },
    {
        to: '/contact-us',
        page_title: 'Kontak'
    },
    {
        to: '/join',
        page_title: 'Gabung'
    },
]
// == icons | socials media routes & icons ==
// = socials media routes & icons =
const author = {
    name: 'Akbar Angkasa',
    nickname: 'Abay',
    img:'/images/img/people/akbar-angkasa.jpg',
    description: 'Akrab dipanggil Abay manusia berusia 19 tahun berjabatan Mahasiswa pada sebuah politeknik negeri di Indonesia, memiliki minat pada dunia pemprograman khususnya pada bidang Web development.',
    to: 'https://akbarangkasa.com/'
}


const socials_media = [
    {
        to: 'https://www.youtube.com/channel/UCPTBQ8AxU-wsWVcdVgr55Yg',
        b_icon:'bi bi-youtube',
        page: 'Youtube'
    },
    {
        to: 'https://www.instagram.com/holvamp/',
        // bootstrap 5 icons
        b_icon:'bi bi-instagram',
        page: 'Instagram'
    },
    {
        to: 'https://discord.gg/k3c5EDtBnU',
        b_icon:'bi bi-discord',
        page: 'Discord'
    },
    {
        to: 'https://www.reddit.com/user/Holvamp',
        b_icon:'bi bi-reddit',
        page: 'Reddit'
    },
]
// = icons =
const holvamp_icon_alt = {
    icon:'holvamp-logo-alt.png',
    icon_title: 'Holvamp',
    icon_alt: 'holvamp-logo',
    to:'/'
}
// == products ==
const products = [
    {
        to: 'https://www.youtube.com/channel/UCPTBQ8AxU-wsWVcdVgr55Yg',
        page: 'Tutorial'
    },
    {
        to: '/blogs',
        page: 'Blogs'
    }
]


// ==== Routing Middleware ====
// Home Page
app.get('/', function(req, res) {
    res.render('index', {
        layout: 'layouts/main-layout.ejs',
        title: "Utama",
        pages,
        socials_media,
        holvamp_icon_alt,
        products,
        author
    })
});

// About Page
app.get('/about', (req, res) => {
    res.render('about',{
        layout: 'layouts/main-layout.ejs',
        title: "Tentang",
        pages,
        socials_media,
        holvamp_icon_alt,
        products,
        author
    })
})

// Blogs Page
// fetch blog api
app.get('/blogs', (req, res) => {
    res.render('blogs',{
        layout: 'layouts/main-layout.ejs',
        title: "Blog",
        pages,
        socials_media,
        holvamp_icon_alt,
        products,
        author,
        blog_resource,
        blog_posts_data
    })
})

// == Blog page ==
app.get('/blogs/:id', (req, res) => {    
    const id_params = req.params.id
    // == fetch blog post resource ==
    axios.get(`https://www.googleapis.com/blogger/v3/blogs/7981172435967168790/posts/${id_params}?key=${API_KEY}`).then((response) => {
        const post_data = response.data;
        // == fetch blog post comments list ==
        // link didapat dari hateoas post resource
        axios.get(`https://www.googleapis.com/blogger/v3/blogs/7981172435967168790/posts/${id_params}/comments?key=${API_KEY}`).then(response => {
            const comment_list = response.data
            res.render('blog', {
                layout: 'layouts/main-layout.ejs',
                title: "Blog",
                pages,
                socials_media,
                holvamp_icon_alt,
                products,
                author,
                post_data,
                comment_list
            })
        }).catch(error => {
            console.log(error)
        })
    }).catch((error) => {
        console.log(error)
    });
});

// Contact-us page
app.get('/contact-us', (req, res) => {
    res.render('contact-us', {
        layout: 'layouts/main-layout.ejs',
        title: "Kontak",
        pages,
        socials_media,
        holvamp_icon_alt,
        products,
        author
    })
})

// Contact-us process data
app.post('/contact-us', (req, res) => {
    contact_us_connection(req.body)
    res.redirect('contact-us')
})

// Join page
app.get('/join', (req, res) => {
    res.render('join', {
        layout: 'layouts/main-layout.ejs',
        title: "Kontak",
        pages,
        socials_media,
        holvamp_icon_alt,
        products,
        author
    })
})

// error handling
app.use('/', (req, res) => {
    res.status(404);
    res.render('404',{
        layout: 'layouts/main-layout.ejs',
        title: "404",
    })
})

app.listen(PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`)
});