// Local Module
const {blog_resource, blog_posts_data} = require('./utils/fetch-blog')
const {contact_us_connection} = require('./utils/contact-us-process')
// Express
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
// axios
const axios = require('axios')
const API_KEY = 'AIzaSyATggcpPcDwU6CX8vd1nGdSARnYDjp0WQ8';

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
// = Author's socials media routes & icons =
const author = {
    name: 'Akbar Angkasa',
    nickname: 'Abay',
    img:'/images/img/people/akbar-angkasa.jpg',
    description: 'Akrab dipanggil Abay manusia berusia 19 tahun berjabatan Mahasiswa pada sebuah politeknik negeri di Indonesia, memiliki minat pada dunia pemprograman khususnya pada bidang Web development.',
    to: 'https://akbarangkasa.com/',
    socials: [
        {
            page:'Instagram',
            icon:'ti-instagram',
            to:'https://www.instagram.com/angkasa_akbar/'
        },
        {
            page:'Website',
            icon:'ti-world',
            to:'https://akbarangkasa.com/'
        },
        {
            page:'Github',
            icon:'ti-github',
            to:'https://github.com/abay-2002'
        },
        {
            page:'LinkedIn',
            icon:'ti-linkedin',
            to:'https://id.linkedin.com/in/akbar-angkasa-908a3317b'
        },
    ]
}

// == Holvamp's socials media ==
const socials_media = [
    {
        to: 'https://www.youtube.com/channel/UCPTBQ8AxU-wsWVcdVgr55Yg',
        b_icon:'bi bi-youtube',
        page: 'Youtube'
    },
    {
        to: 'https://www.instagram.com/holvamp/',
        // bootstrap 5 icons.
        b_icon:'bi bi-instagram',
        page: 'Instagram'
    },
    {
        // invite to Holvamp Discord server.
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

// _______  ___      _______  _______ 
// |  _    ||   |    |       ||       |
// | |_|   ||   |    |   _   ||    ___|
// |       ||   |    |  | |  ||   | __ 
// |  _   | |   |___ |  |_|  ||   ||  |
// | |_|   ||       ||       ||   |_| |
// |_______||_______||_______||_______|

// ===========
// == Blogs ==
// ===========

// Architecture:
// 1. /blogs
// 2. /blogs > /blogs/{course-page}
// 3. /blogs/:id 
// === Holvamp's API soon ===
// = Holvamp's course =
const holvamp_api = [
    {
        course:'HTML Dasar',
        image_general:'holvamp-course-banner.jpg', 
        image_course: 'html-course-banner.jpg',
        // to:'html',
        by:'Holvamp',
        desc: 'Belajar HTML Dasar sebagai pengetahuan yang wajib dikuasai sebelum lanjut belajar CSS, HTML dan teknologi web lainnya.',
        label: 'html'
    },
    {
        course:'CSS Dasar',
        image_general:'holvamp-course-banner.jpg', 
        image_course: 'css-course-banner.jpg',
        // to:'css',
        by:'Holvamp',
        desc: 'Belajar CSS Dasar sebagai pengetahuan yang wajib dikuasai sebelum lanjut belajar teknologi web lainnya.',
        label: 'css'
    },
    {
        course:'Javascript Dasar',
        image_general:'holvamp-course-banner.jpg', 
        image_course: 'javascript-course-banner.jpg',
        // to:'javascript',
        by:'Holvamp',
        desc: 'Belajar Javascript Dasar sebagai pengetahuan yang wajib dikuasai sebelum lanjut belajar teknologi web lainnya.',
        label: 'javascript'
    },
]

// 1. blogs
// Blogs Page
// fetch blog api
// == holvamp_api pages ==
// !!! Holvamp's API (soon) !!!
app.get('/blogs', (req, res) => {   
    res.render('blogs',{
        layout: 'layouts/main-layout.ejs',
        title: "Blogs",
        pages,
        socials_media,
        holvamp_icon_alt,
        products,
        author,
        holvamp_api, // !!! Holvamp's API (soon) !!!
         // !!! Blogger API V3 !!!
    })
})

// 1. blogs
// 2. blogs > blogs/{course-page}
// !!! Holvamp's API (soon) !!!
// == Course page ==
app.get('/blogs/:courses', (req, res) => {   
    const course = req.params.courses
    axios.get(`https://www.googleapis.com/blogger/v3/blogs/7981172435967168790/posts/search?q=label:${course}&key=${API_KEY}`).then(response => {
        const posts = response.data;
        res.render('blog-course', {
            layout: 'layouts/main-layout.ejs',
            title: `${course}`,
            pages,
            socials_media,
            holvamp_icon_alt,
            products,
            author,
            course, // !!! dari parameter !!!
            posts, // !!! Blogger API V3 !!!
            holvamp_api
        });
    }).catch(error => {
        console.log(error)
    });
})

// 1. /blogs
// 2. /blogs > /blogs/{course-page}
// 3. /blogs/{course-page} > /blogs/{course-page}/:id
// == Blog page ==
app.get(`/blogs/:course/:id`, (req, res) => {    
    const id_params = req.params.id
    // == fetch blog post resource ==
    // selflink from Blogger API v3 posts resource
    axios.get(`https://www.googleapis.com/blogger/v3/blogs/7981172435967168790/posts/${id_params}?key=${API_KEY}`).then((response) => {
        const post_data = response.data;
        // == fetch blog post comments list ==
        // link didapat dari hateoas post resource
        axios.get(`https://www.googleapis.com/blogger/v3/blogs/7981172435967168790/posts/${id_params}/comments?key=${API_KEY}`).then(response => {
            const comment_list = response.data
            res.render('blog-post', {
                layout: 'layouts/main-layout.ejs',
                title: `${post_data.title}`,
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

// _______  __    _  ______     _______  _______    _______  ___      _______  _______ 
// |       ||  |  | ||      |   |       ||       |  |  _    ||   |    |       ||       |
// |    ___||   |_| ||  _    |  |   _   ||    ___|  | |_|   ||   |    |   _   ||    ___|
// |   |___ |       || | |   |  |  | |  ||   |___   |       ||   |    |  | |  ||   | __ 
// |    ___||  _    || |_|   |  |  |_|  ||    ___|  |  _   | |   |___ |  |_|  ||   ||  |
// |   |___ | | |   ||       |  |       ||   |      | |_|   ||       ||       ||   |_| |
// |_______||_|  |__||______|   |_______||___|      |_______||_______||_______||_______|

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

app.listen(port, () => {
    console.log(`App is listening to port: ${port}`)
});