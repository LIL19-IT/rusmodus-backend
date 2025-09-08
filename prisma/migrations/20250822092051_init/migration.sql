-- CreateTable
CREATE TABLE "public"."Homepage_intro" (
    "id" TEXT NOT NULL,
    "video_src" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Homepage_intro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Homepage_products_heading" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Homepage_products_heading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Homepage_products" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Homepage_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Homepage_advantages_heading" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Homepage_advantages_heading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Homepage_advantages" (
    "id" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Homepage_advantages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Homepage_about" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "description1" TEXT NOT NULL,
    "description2" TEXT NOT NULL,
    "img1_url" TEXT NOT NULL,
    "img2_url" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Homepage_about_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Homepage_news_heading" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link_news" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Homepage_news_heading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."homepage_news" (
    "id" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link_about" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "homepage_news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Homepage_feedback" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "checkbox_text" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "placeholder_name" TEXT NOT NULL,
    "placeholder_phone" TEXT NOT NULL,
    "placeholder_email" TEXT NOT NULL,
    "placeholder_question" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Homepage_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Footer_heading" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Footer_heading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Footer_link" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Footer_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Link" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "footerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Footers_info" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Footers_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Social_links" (
    "id" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "url_links" TEXT NOT NULL,
    "footerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Footers_schedule" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Footers_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Schedule_list" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "days" TEXT NOT NULL,
    "hours" TEXT NOT NULL,
    "footerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Schedule_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Footer_credit" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "privacy_policy" TEXT NOT NULL,
    "legal_info" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Footer_credit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aquaculture_intro" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "sub_title1" TEXT NOT NULL,
    "video_src" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aquaculture_intro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aquaculture_sortOptions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aquaculture_sortOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."aquaculture_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aquaculture_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aquaculture_show_product_btn_text" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aquaculture_show_product_btn_text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."aquaculture_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aquaculture_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."aquaculture_content" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "sub_title1" TEXT NOT NULL,
    "sub_title2" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type_title" TEXT NOT NULL,
    "type_text" TEXT NOT NULL,
    "size_title" TEXT,
    "size_text" TEXT,
    "components_title" TEXT NOT NULL,
    "components_text" TEXT NOT NULL,
    "vitamin_title" TEXT NOT NULL,
    "vitamin_text" TEXT NOT NULL,
    "shelf_life_title" TEXT NOT NULL,
    "shelf_life_text" TEXT NOT NULL,
    "storage_conditions_title" TEXT NOT NULL,
    "storage_conditions_text" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "characteristics_title" TEXT NOT NULL DEFAULT 'Default Title',
    "aquaculture_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aquaculture_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Characteristic" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "percent" TEXT NOT NULL,
    "aquacultureContentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Characteristic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Farmanimals_intro" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "sub_title1" TEXT NOT NULL,
    "video_src" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Farmanimals_intro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."farmanimals_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "category_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "farmanimals_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."farmanimals_content" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "sub_title1" TEXT NOT NULL,
    "sub_title2" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type_title" TEXT NOT NULL,
    "type_text" TEXT NOT NULL,
    "components_title" TEXT NOT NULL,
    "components_text" TEXT NOT NULL,
    "vitamin_title" TEXT NOT NULL,
    "vitamin_text" TEXT NOT NULL,
    "shelf_life_title" TEXT NOT NULL,
    "shelf_life_text" TEXT NOT NULL,
    "storage_conditions_title" TEXT NOT NULL,
    "storage_conditions_text" TEXT NOT NULL,
    "characteristics_title" TEXT NOT NULL,
    "feeding_recommendations_title" TEXT NOT NULL,
    "feeding_recommendations_text" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "farmanimals_name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "farmanimals_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Characteristics" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "percent" TEXT NOT NULL,
    "farmAnimalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Characteristics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."farmanimals_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "farmanimals_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Farmanimals_sortOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Farmanimals_sortOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Farmanimals_show_product_btn_text" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Farmanimals_show_product_btn_text_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pets_intro" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "sub_title1" TEXT NOT NULL,
    "video_src" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pets_intro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pets_sortOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pets_sortOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aboutcompany_intro" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "sub_title1" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aboutcompany_intro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aboutcompany_info" (
    "id" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aboutcompany_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aboutcompany_heading" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aboutcompany_heading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aboutcompany_data" (
    "id" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aboutcompany_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aboutcompany_partners" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aboutcompany_partners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aboutcompany_vacancies_heading" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url_text" TEXT NOT NULL,
    "url_link" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aboutcompany_vacancies_heading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aboutcompany_feedback" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "checkbox_text" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "placeholder_name" TEXT NOT NULL,
    "placeholder_phone" TEXT NOT NULL,
    "placeholder_email" TEXT NOT NULL,
    "placeholder_question" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aboutcompany_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aboutcompany_btn" (
    "id" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aboutcompany_btn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Aboutcompany_vacancy" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aboutcompany_vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Position" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url_text" TEXT NOT NULL,
    "url_link" TEXT NOT NULL,
    "aboutCompanyVacancyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Procurement_intro" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "sub_title1" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Procurement_intro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Procurement_aboutcompany" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Procurement_aboutcompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Procurement_advantage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Procurement_advantage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Advantage" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "procurementAdvantageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Advantage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Procurement_supplier" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Procurement_supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "procurementSupplierId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Procurement_feedback" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "checkbox_text" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "placeholder_name" TEXT NOT NULL,
    "placeholder_phone" TEXT NOT NULL,
    "placeholder_email" TEXT NOT NULL,
    "placeholder_question" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Procurement_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."news_info" (
    "id" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link_about" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."news_content" (
    "id" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "sub_title1" TEXT NOT NULL,
    "sub_title2" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name1" TEXT,
    "name2" TEXT,
    "name3" TEXT,
    "img_url" TEXT NOT NULL,
    "img1_url" TEXT,
    "img2_url" TEXT,
    "img3_url" TEXT,
    "img4_url" TEXT,
    "img5_url" TEXT,
    "img6_url" TEXT,
    "img7_url" TEXT,
    "img8_url" TEXT,
    "img11_url" TEXT,
    "video_src" TEXT,
    "description" TEXT,
    "description1" TEXT,
    "description2" TEXT,
    "description3" TEXT,
    "url_text" TEXT,
    "url_link" TEXT,
    "url_text1" TEXT,
    "url_link1" TEXT,
    "url_text2" TEXT,
    "url_link2" TEXT,
    "info_title" TEXT NOT NULL,
    "news_title" TEXT,
    "lang" TEXT NOT NULL,
    "newsInfoId" TEXT,
    "homepageNewsId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."News_heading" (
    "id" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "sub_title1" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_heading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."News_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "News_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contacts_feedback" (
    "id" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "sub_title1" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "checkbox_text" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "placeholder_name" TEXT NOT NULL,
    "placeholder_phone" TEXT NOT NULL,
    "placeholder_email" TEXT NOT NULL,
    "placeholder_question" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contacts_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact_address" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_title" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email_title" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact_hours" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Days" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "contactHoursId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contact_links" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Links" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,
    "url_links" TEXT NOT NULL,
    "contactLinksId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Questions_and_answers" (
    "id" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "sub_title1" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Questions_and_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aquaculture_categories_name_key" ON "public"."aquaculture_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "aquaculture_products_name_key" ON "public"."aquaculture_products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "farmanimals_products_name_key" ON "public"."farmanimals_products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "farmanimals_categories_name_key" ON "public"."farmanimals_categories"("name");

-- AddForeignKey
ALTER TABLE "public"."Link" ADD CONSTRAINT "Link_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "public"."Footer_link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Social_links" ADD CONSTRAINT "Social_links_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "public"."Footers_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Schedule_list" ADD CONSTRAINT "Schedule_list_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "public"."Footers_schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."aquaculture_products" ADD CONSTRAINT "aquaculture_products_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "public"."aquaculture_categories"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."aquaculture_content" ADD CONSTRAINT "aquaculture_content_aquaculture_name_fkey" FOREIGN KEY ("aquaculture_name") REFERENCES "public"."aquaculture_products"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Characteristic" ADD CONSTRAINT "Characteristic_aquacultureContentId_fkey" FOREIGN KEY ("aquacultureContentId") REFERENCES "public"."aquaculture_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."farmanimals_products" ADD CONSTRAINT "farmanimals_products_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "public"."farmanimals_categories"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."farmanimals_content" ADD CONSTRAINT "farmanimals_content_farmanimals_name_fkey" FOREIGN KEY ("farmanimals_name") REFERENCES "public"."farmanimals_products"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Characteristics" ADD CONSTRAINT "Characteristics_farmAnimalId_fkey" FOREIGN KEY ("farmAnimalId") REFERENCES "public"."farmanimals_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Position" ADD CONSTRAINT "Position_aboutCompanyVacancyId_fkey" FOREIGN KEY ("aboutCompanyVacancyId") REFERENCES "public"."Aboutcompany_vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Advantage" ADD CONSTRAINT "Advantage_procurementAdvantageId_fkey" FOREIGN KEY ("procurementAdvantageId") REFERENCES "public"."Procurement_advantage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_procurementSupplierId_fkey" FOREIGN KEY ("procurementSupplierId") REFERENCES "public"."Procurement_supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."news_content" ADD CONSTRAINT "news_content_newsInfoId_fkey" FOREIGN KEY ("newsInfoId") REFERENCES "public"."news_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."news_content" ADD CONSTRAINT "news_content_homepageNewsId_fkey" FOREIGN KEY ("homepageNewsId") REFERENCES "public"."homepage_news"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Days" ADD CONSTRAINT "Days_contactHoursId_fkey" FOREIGN KEY ("contactHoursId") REFERENCES "public"."Contact_hours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Links" ADD CONSTRAINT "Links_contactLinksId_fkey" FOREIGN KEY ("contactLinksId") REFERENCES "public"."Contact_links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
