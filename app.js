// Local Module
const {contact_us_connection} = require('./utils/contact-us-process');
// Express
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
// axios
const axios = require('axios')
const API_KEY = process.env.API_KEY;

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
        to: '/courses',
        page_title: 'Belajar'
    },
    {
        to: '/contact-us',
        page_title: 'Kontak'
    },
    {
        to: '/community',
        page_title: 'Komunitas'
    },
]
// == icons | socials media routes & icons ==
// = Author's socials media routes & icons =
const author = {
    name: 'Akbar Angkasa',
    nickname: 'Abay',
    img:'/images/img/people/akbar-angkasa.jpg',
    description: 'Akrab dipanggil Abay manusia berusia 19 tahun berjabatan Mahasiswa pada sebuah politeknik negeri di Indonesia, memiliki minat pada dunia pemprograman khususnya pada bidang Web development.',
    role:'Founder | Fullstack Web Developer | Pemateri',
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
        target: 'blank',
        b_icon:'bi bi-youtube',
        page: 'Youtube',
        id:'holvamps-youtube',
        bg_color: 'bg-primary'
    },
    {
        to: 'https://www.instagram.com/holvamp/',
        target: 'blank',
        // bootstrap 5 icons.
        b_icon:'bi bi-instagram',
        page: 'Instagram',
        id:'holvamps-instagram',
        bg_color: 'bg-primary'
    },
    {
        // invite to Holvamp Discord server.
        // to: 'https://discord.gg/k3c5EDtBnU',
        to: '',
        target: '',
        b_icon:'bi bi-discord',
        page: 'Discord',
        id:'holvamps-discord',
        bg_color: 'bg-secondary'
    },
    // {
    //     to: 'https://www.reddit.com/user/Holvamp',
    //     b_icon:'bi bi-reddit',
    //     page: 'Reddit'
    // },
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
        to: '/learn',
        page: 'learn'
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


// === Holvamp's API | Courses page=== 
const courses = [
    {
        title: 'Dasar Web Development',
        desc: 'Belajar dasar mengembangkan aplikasi berbasis web dengan berbagai macam materi yang relevan di bidang pengembangan web(web developement).',
        img: 'dasar-web-development-course-banner.jpg',
        label: 'dasar-web-development',
        author: [
            {
                displayName: 'Akbar Angkasa',
                image: 'akbar-angkasa.jpg'
            }
        ]
    },
    // {
    //     title: 'Dasar Pemrograman Dengan Scratch',
    //     desc: 'Belajar dasar pemrograman untuk pemula menggunakan platform belajar Scratch',
    //     author: 'Akbar Angkasa',
    //     img: 'dasar-pemrograman-dengan-scratch-course-banner.jpg',
    //     label: 'dasar-pemrograman-dengan-scratch'
    // },
]

// =============
// == Courses ==
// =============
// 1.page: /courses
app.get('/courses', (req, res) => {
    res.render('courses', {
        layout: 'layouts/main-layout.ejs',
        title: "Belajar",
        pages,
        socials_media,
        holvamp_icon_alt,
        products,
        author,
        courses, // !!! Holvamp's API (courses) (soon) !!!
    });
});

// ============
// == learns ==
// ============
// learns page
// 2.page: /courses/:label
// !! Blogger API v3 Posts resource by label !!
// :label = learns
app.get('/courses/:label', (req, res) => {   
    const learn_topics_params = req.params.label;
    axios.get(`https://www.googleapis.com/blogger/v3/blogs/7981172435967168790/posts/search?q=label:${learn_topics_params}&key=${API_KEY}`).then(response => {
        const learn_topics = response.data.items; // array of posts by label Blogger API V3 | Posts resource
        res.render('learns',{
            layout: 'layouts/main-layout.ejs',
            title: `${learn_topics_params}`,
            learn_topics_params,
            pages,
            socials_media,
            holvamp_icon_alt,
            products,
            author,
            learn_topics // !!! Blogger API v3 !!!
        });
    }).catch(error => {
        console.log(error)
    });
});

// // learn page
// // 3.page: /courses/:label/:id
// !! Blogger API v3 Posts resource by id (selflink from hateoas) !!
// :label = learns
// :id = learn
app.get('/courses/:label/:id', (req, res) => {
    const post_id = req.params.id
    axios.get(`https://www.googleapis.com/blogger/v3/blogs/7981172435967168790/posts/${post_id}?key=${API_KEY}`).then(response => {
        const post_data = response.data; // array of posts by id Blogger API V3 | Posts resource
        const title = response.data.title;
        res.render('learn', {
            layout: 'layouts/main-layout.ejs',
            title,
            pages,
            socials_media,
            holvamp_icon_alt,
            products,
            author,
            post_data, // !!! Blogger API v3 !!! 
        });
    }).catch(error => {
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

// Community page
app.get('/community', (req, res) => {
    res.render('community', {
        layout: 'layouts/main-layout.ejs',
        title: "Komunitas",
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