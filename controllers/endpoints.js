const endpoints = (req, res) => {
    const user = req.session.user;
    const api_list_endpoints = [
        '/api/languages', '/api/navbar', '/api/contact', '/api/header_logo', '/api/homepage_intro', '/api/homepage_products_heading',
        '/api/homepage_products', '/api/homepage_advantages_heading', '/api/homepage_advantages', '/api/homepage_about',
        '/api/homepage_news_heading', '/api/homepage_news', '/api/homepage_feedback', '/api/aquaculture_intro', '/api/aquaculture_categories',
        '/api/aquaculture_sortOptions', '/api/aquaculture_products', '/api/aquaculture_show_product_btn_text', '/api/acquaculture_content',
        '/api/farmanimals_intro', '/api/farmanimals_categories', '/api/farmanimals_sortOption', '/api/farmanimals_products', '/api/farmanimals_show_product_btn_text',
        '/api/farmanimals_content', '/api/pets_intro', '/api/pets_sortOption', '/api/aboutcompany_intro', '/api/aboutcompany_info', '/api/aboutcompany_heading',
        '/api/aboutcompany_data', '/api/aboutcompany_partners', '/api/aboutcompany_btn', '/api/aboutcompany_vacancies_heading', '/api/aboutcompany_vacancies',
        '/api/aboutcompany_feedback', '/api/procurement_intro', '/api/procurement_aboutcompany', '/api/procurement_advantages', '/api/procurement_suppliers',
        '/api/procurement_feedback', '/api/news_heading', '/api/news_categories', '/api/news_info', '/api/news_content', '/api/contacts_feedback',
        '/api/contacts_address', '/api/contacts_hours', '/api/contacts_links', '/api/questions_and_answers', '/api/footers_heading', '/api/footers_links',
        '/api/footers_schedule', '/api/footers_info', '/api/footers_credit',
    ];
    res.render('endpoints/endpoints', { title: 'Endpoints', api_list_endpoints, user, layout: 'base' });
};

module.exports = {
    endpoints,
};
