const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');

require('dotenv').config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);



app.use(session({
  secret: process.env.SECRET_KEY || 'default_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));



app.get('/', (req, res) => res.redirect('/admin'));

app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/admin/images', require('./routes/images'));
app.use('/admin/header', require('./routes/header'));
app.use('/admin/header_logo', require('./routes/header_logo'));
app.use('/admin/language', require('./routes/language'));
app.use('/admin/navbar', require('./routes/navbar'));
app.use('/admin/contact', require('./routes/contact'));
app.use('/admin/homepage', require('./routes/homepage'));
app.use('/admin/homepage_intro', require('./routes/homepage_intro'));
app.use('/admin/homepage_products_heading', require('./routes/homepage_products_heading'));
app.use('/admin/homepage_products', require('./routes/homepage_products'));
app.use('/admin/homepage_advantages_heading', require('./routes/homepage_advantages_heading'));
app.use('/admin/homepage-advantages', require('./routes/homepage-advantages'));
app.use('/admin/homepage-about', require('./routes/homepage-about'));
app.use('/admin/homepage_news_heading', require('./routes/homepage_news_heading'));
app.use('/admin/homepage_news', require('./routes/homepage_news'));
app.use('/admin/homepage_feedback', require('./routes/homepage_feedback'));
app.use('/admin/aquaculture', require('./routes/aquaculture'));
app.use('/admin/aquaculture_intro', require('./routes/aquaculture_intro'));
app.use('/admin/aquaculture_categories', require('./routes/aquaculture_categories'));
app.use('/admin/aquaculture_sortOptions', require('./routes/aquaculture_sortOptions'));
app.use('/admin/aquaculture_products', require('./routes/aquaculture_products'));
app.use('/admin/aquaculture_show_product_btn_text', require('./routes/aquaculture_show_product_btn_text'));
app.use('/admin/aquaculture_content', require('./routes/aquaculture_content'));
app.use('/admin/farmanimals', require('./routes/farmanimals'));
app.use('/admin/farmanimals_intro', require('./routes/farmanimals_intro'));
app.use('/admin/farmanimals_categories', require('./routes/farmanimals_categories'));
app.use('/admin/farmanimals_sortOption', require('./routes/farmanimals_sortOption'));
app.use('/admin/farmanimals_products', require('./routes/farmanimals_products'));
app.use('/admin/farmanimals_show_product_btn_text', require('./routes/farmanimals_show_product_btn_text'));
app.use('/admin/farmanimals_content', require('./routes/farmanimals_content')); 
app.use('/admin/pets', require('./routes/pets'));
app.use('/admin/pets_intro', require('./routes/pets_intro'));
app.use('/admin/pets_sortOption', require('./routes/pets_sortOption'));
app.use('/admin/aboutcompany', require('./routes/aboutcompany'));
app.use('/admin/aboutcompany_intro', require('./routes/aboutcompany_intro'));
app.use('/admin/aboutcompany_info', require('./routes/aboutcompany_info'));
app.use('/admin/aboutcompany_heading', require('./routes/aboutcompany_heading'));
app.use('/admin/aboutcompany_data', require('./routes/aboutcompany_data'));
app.use('/admin/aboutcompany_btn', require('./routes/aboutcompany_btn'));
app.use('/admin/aboutcompany_partners', require('./routes/aboutcompany_partners'));
app.use('/admin/aboutcompany_vacancies_heading', require('./routes/aboutcompany_vacancies_heading'));
app.use('/admin/aboutcompany_vacancies', require('./routes/aboutcompany_vacancies'));
app.use('/admin/positions', require('./routes/positions'));
app.use('/admin/aboutcompany_feedback', require('./routes/aboutcompany_feedback'));
app.use('/admin/procurement', require('./routes/procurement'));
app.use('/admin/procurement_intro', require('./routes/procurement_intro'));
app.use('/admin/procurement_aboutcompany', require('./routes/procurement_aboutcompany'));
app.use('/admin/procurement_advantages', require('./routes/procurement_advantages'));
app.use('/admin/procurement_suppliers', require('./routes/procurement_suppliers'));
app.use('/admin/procurement_feedback', require('./routes/procurement_feedback'));
app.use('/admin/news', require('./routes/news'));
app.use('/admin/news_heading', require('./routes/news_heading'));
app.use('/admin/news_categories', require('./routes/news_categories'));
app.use('/admin/news_info', require('./routes/news_info'));
app.use('/admin/news_content', require('./routes/news_content'));
app.use('/admin/contacts', require('./routes/contacts'));
app.use('/admin/contacts_feedback', require('./routes/contacts_feedback'));
app.use('/admin/contacts_address', require('./routes/contacts_address'));
app.use('/admin/contacts_hours', require('./routes/contacts_hours'));
app.use('/admin/days', require('./routes/days'));
app.use('/admin/contacts_links', require('./routes/contacts_links'));
app.use('/admin/links', require('./routes/links'));
app.use('/admin/questions', require('./routes/questions'));
app.use('/admin/questions_and_answers', require('./routes/questions_and_answers'));
app.use('/admin/footers', require('./routes/footers'));
app.use('/admin/footers_heading', require('./routes/footers_heading'));
app.use('/admin/footers_links', require('./routes/footers_links'));
app.use('/admin/footers_info', require('./routes/footers_info'));
app.use('/admin/footers_schedule', require('./routes/footers_schedule'));
app.use('/admin/footers_credit', require('./routes/footers_credit'));
app.use('/endpoints', require('./routes/endpoints'));


app.use('/api/languages', require('./api_routes/languages'));
app.use('/api/navbar', require('./api_routes/navbar'));
app.use('/api/contact', require('./api_routes/contact'));
app.use('/api/header_logo', require('./api_routes/header_logo'));
app.use('/api/homepage_intro', require('./api_routes/homepage_intro'));
app.use('/api/homepage_products_heading', require('./api_routes/homepage_products_heading'));
app.use('/api/homepage_products', require('./api_routes/homepage_products'));
app.use('/api/homepage_advantages_heading', require('./api_routes/homepage_advantages_heading'));
app.use('/api/homepage_advantages', require('./api_routes/homepage_advantages'));
app.use('/api/homepage_about', require('./api_routes/homepage_about'));
app.use('/api/homepage_news_heading', require('./api_routes/homepage_news_heading'));
app.use('/api/homepage_news', require('./api_routes/homepage_news'));
app.use('/api/homepage_feedback', require('./api_routes/homepage_feedback'));
app.use('/api/aquaculture_intro', require('./api_routes/aquaculture_intro'));
app.use('/api/aquaculture_categories', require('./api_routes/aquaculture_categories'));
app.use('/api/aquaculture_sortOptions', require('./api_routes/aquaculture_sortOptions'));
app.use('/api/aquaculture_products', require('./api_routes/aquaculture_products'));
app.use('/api/aquaculture_show_product_btn_text', require('./api_routes/aquaculture_show_product_btn_text'));
app.use('/api/acquaculture_content', require('./api_routes/acquaculture_content'));
app.use('/api/farmanimals_intro', require('./api_routes/farmanimals_intro'));
app.use('/api/farmanimals_categories', require('./api_routes/farmanimals_categories'));
app.use('/api/farmanimals_sortOption', require('./api_routes/farmanimals_sortOption'));
app.use('/api/farmanimals_products', require('./api_routes/farmanimals_products'));
app.use('/api/farmanimals_show_product_btn_text', require('./api_routes/farmanimals_show_product_btn_text'));
app.use('/api/farmanimals_content', require('./api_routes/farmanimals_content'));
app.use('/api/pets_intro', require('./api_routes/pets_intro'));
app.use('/api/pets_sortOption', require('./api_routes/pets_sortOption'));
app.use('/api/aboutcompany_intro', require('./api_routes/aboutcompany_intro'));
app.use('/api/aboutcompany_info', require('./api_routes/aboutcompany_info'));
app.use('/api/aboutcompany_heading', require('./api_routes/aboutcompany_heading'));
app.use('/api/aboutcompany_data', require('./api_routes/aboutcompany_data'));
app.use('/api/aboutcompany_partners', require('./api_routes/aboutcompany_partners'));
app.use('/api/aboutcompany_btn', require('./api_routes/aboutcompany_btn'));
app.use('/api/aboutcompany_vacancies_heading', require('./api_routes/aboutcompany_vacancies_heading'));
app.use('/api/aboutcompany_vacancies', require('./api_routes/aboutcompany_vacancies'));
app.use('/api/aboutcompany_feedback', require('./api_routes/aboutcompany_feedback'));
app.use('/api/procurement_intro', require('./api_routes/procurement_intro'));
app.use('/api/procurement_aboutcompany', require('./api_routes/procurement_aboutcompany'));
app.use('/api/procurement_advantages', require('./api_routes/procurement_advantages'));
app.use('/api/procurement_suppliers', require('./api_routes/procurement_suppliers'));
app.use('/api/procurement_feedback', require('./api_routes/procurement_feedback'));
app.use('/api/news_heading', require('./api_routes/news_heading'));
app.use('/api/news_categories', require('./api_routes/news_categories'));
app.use('/api/news_info', require('./api_routes/news_info'));
app.use('/api/news_content', require('./api_routes/news_content'));
app.use('/api/contacts_feedback', require('./api_routes/contacts_feedback'));
app.use('/api/contacts_address', require('./api_routes/contacts_address'));
app.use('/api/contacts_hours', require('./api_routes/contacts_hours'));
app.use('/api/contacts_links', require('./api_routes/contacts_links'));
app.use('/api/questions_and_answers', require('./api_routes/questions_and_answers'));
app.use('/api/footers_heading', require('./api_routes/footers_heading'));
app.use('/api/footers_links', require('./api_routes/footers_links'));
app.use('/api/footers_schedule', require('./api_routes/footers_schedule'));
app.use('/api/footers_info', require('./api_routes/footers_info'));
app.use('/api/footers_credit', require('./api_routes/footers_credit'));


module.exports = app;


