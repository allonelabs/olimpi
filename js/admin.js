/* ========================================
   OLIMPI ADMIN — JS
   ======================================== */
(function () {
  'use strict';

  // ───────────────────────────────────────
  // DEFAULT DATA
  // ───────────────────────────────────────
  const DEFAULT_CATEGORIES = [
    { id: 1, name: 'წვენები', description: 'ხილის და ბოსტნეულის წვენები', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop' },
    { id: 2, name: 'წყალი', description: 'მინერალური და სასმელი წყალი', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop' },
    { id: 3, name: 'გამაგრილებელი სასმელები', description: 'გაზირებული და არაგაზირებული სასმელები', image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=300&fit=crop' },
    { id: 4, name: 'ლუდი', description: 'ქართული და იმპორტული ლუდი', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=300&fit=crop' },
    { id: 5, name: 'კონსერვები', description: 'ხილის და ბოსტნეულის კონსერვები', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=300&fit=crop' },
    { id: 6, name: 'მაკარონი', description: 'პასტა და მაკარონის ნაწარმი', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=400&h=300&fit=crop' },
    { id: 7, name: 'ზეთი', description: 'მზესუმზირის, ზეთისხილის და სხვა ზეთები', image: 'https://images.unsplash.com/photo-1474979266404-7eabd7a04a8d?w=400&h=300&fit=crop' },
    { id: 8, name: 'საკონდიტრო', description: 'ტკბილეული, შოკოლადი, ნამცხვარი', image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400&h=300&fit=crop' }
  ];

  const DEFAULT_PRODUCTS = [
    // წვენები
    { id: 1,  name: 'ვაშლის წვენი 1ლ',           category: 'წვენები', weight: '1 ლ',    packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=200&h=200&fit=crop', status: 'active',   description: 'ნატურალური ვაშლის წვენი' },
    { id: 2,  name: 'ფორთოხლის წვენი 1ლ',         category: 'წვენები', weight: '1 ლ',    packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop', status: 'active',   description: 'ნატურალური ფორთოხლის წვენი' },
    { id: 3,  name: 'ატმის ნექტარი 0.5ლ',         category: 'წვენები', weight: '0.5 ლ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop', status: 'active',   description: 'ატმის ნექტარი ბუნებრივი' },
    { id: 4,  name: 'მრავალხილის წვენი 2ლ',       category: 'წვენები', weight: '2 ლ',    packaging: '6 ცალი',  image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=200&h=200&fit=crop', status: 'active',   description: 'მრავალხილის ნატურალური წვენი' },
    { id: 5,  name: 'ყურძნის წვენი 1ლ',           category: 'წვენები', weight: '1 ლ',    packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2ebb1?w=200&h=200&fit=crop', status: 'active',   description: 'ყურძნის ნატურალური წვენი' },
    { id: 6,  name: 'ბროწეულის წვენი 1ლ',         category: 'წვენები', weight: '1 ლ',    packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop', status: 'inactive', description: 'ბროწეულის კონცენტრირებული წვენი' },
    // წყალი
    { id: 7,  name: 'მინერალური წყალი 0.5ლ',      category: 'წყალი',  weight: '0.5 ლ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop', status: 'active',   description: 'გაზირებული მინერალური წყალი' },
    { id: 8,  name: 'მინერალური წყალი 1.5ლ',      category: 'წყალი',  weight: '1.5 ლ',  packaging: '6 ცალი',  image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop', status: 'active',   description: 'გაზირებული მინერალური წყალი' },
    { id: 9,  name: 'სასმელი წყალი 5ლ',           category: 'წყალი',  weight: '5 ლ',    packaging: '4 ცალი',  image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop', status: 'active',   description: 'გაფილტრული სასმელი წყალი' },
    { id: 10, name: 'სასმელი წყალი 0.33ლ',        category: 'წყალი',  weight: '0.33 ლ', packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop', status: 'active',   description: 'პორტატული ზომის სასმელი წყალი' },
    { id: 11, name: 'წყალი გაზის გარეშე 1ლ',     category: 'წყალი',  weight: '1 ლ',    packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop', status: 'active',   description: 'უგაზო სასმელი წყალი' },
    { id: 12, name: 'მინერალური წყალი 19ლ',       category: 'წყალი',  weight: '19 ლ',   packaging: '1 ცალი',  image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop', status: 'inactive', description: 'დიდი ტარა მინერალური წყალი' },
    // გამაგრილებელი
    { id: 13, name: 'კოლა 0.5ლ',                  category: 'გამაგრილებელი სასმელები', weight: '0.5 ლ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop', status: 'active',   description: 'გაზირებული გამაგრილებელი სასმელი' },
    { id: 14, name: 'ლიმონათი 1ლ',                category: 'გამაგრილებელი სასმელები', weight: '1 ლ',    packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop', status: 'active',   description: 'ქართული ლიმონათი' },
    { id: 15, name: 'ტარხუნა 0.5ლ',               category: 'გამაგრილებელი სასმელები', weight: '0.5 ლ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop', status: 'active',   description: 'ტარხუნის გემოს გაზირებული სასმელი' },
    { id: 16, name: 'კრემ-სოდა 1.5ლ',             category: 'გამაგრილებელი სასმელები', weight: '1.5 ლ',  packaging: '6 ცალი',  image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop', status: 'active',   description: 'კრემ-სოდა გამაგრილებელი' },
    { id: 17, name: 'ენერგეტიკული სასმელი 0.25ლ', category: 'გამაგრილებელი სასმელები', weight: '0.25 ლ', packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop', status: 'active',   description: 'ენერგეტიკული სასმელი' },
    { id: 18, name: 'აისტი 0.33ლ',                category: 'გამაგრილებელი სასმელები', weight: '0.33 ლ', packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop', status: 'inactive', description: 'კლასიკური აისტი' },
    // ლუდი
    { id: 19, name: 'ლაგერ ლუდი 0.5ლ',            category: 'ლუდი', weight: '0.5 ლ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&h=200&fit=crop', status: 'active',   description: 'ღია ლაგერ ლუდი' },
    { id: 20, name: 'მუქი ლუდი 0.33ლ',            category: 'ლუდი', weight: '0.33 ლ', packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&h=200&fit=crop', status: 'active',   description: 'მუქი ლუდი პრემიუმ' },
    { id: 21, name: 'ხორბლის ლუდი 0.5ლ',          category: 'ლუდი', weight: '0.5 ლ',  packaging: '20 ცალი', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&h=200&fit=crop', status: 'active',   description: 'ხორბლის ტიპის ლუდი' },
    { id: 22, name: 'უალკოჰოლო ლუდი 0.5ლ',       category: 'ლუდი', weight: '0.5 ლ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&h=200&fit=crop', status: 'active',   description: 'უალკოჰოლო ლუდი' },
    { id: 23, name: 'ლუდი ქილაში 0.33ლ',          category: 'ლუდი', weight: '0.33 ლ', packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&h=200&fit=crop', status: 'active',   description: 'ლუდი ალუმინის ქილაში' },
    { id: 24, name: 'პილსნერ ლუდი 1ლ',            category: 'ლუდი', weight: '1 ლ',    packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=200&h=200&fit=crop', status: 'inactive', description: 'კლასიკური პილსნერ ლუდი' },
    // კონსერვები
    { id: 25, name: 'პომიდვრის პასტა 400გ',       category: 'კონსერვები', weight: '400 გ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&h=200&fit=crop', status: 'active',   description: 'პომიდვრის კონცენტრირებული პასტა' },
    { id: 26, name: 'მწვანე ბარდა 400გ',          category: 'კონსერვები', weight: '400 გ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&h=200&fit=crop', status: 'active',   description: 'მწვანე ბარდა კონსერვირებული' },
    { id: 27, name: 'სიმინდი 340გ',               category: 'კონსერვები', weight: '340 გ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&h=200&fit=crop', status: 'active',   description: 'ტკბილი სიმინდი კონსერვირებული' },
    { id: 28, name: 'კიტრი მწნილი 720მლ',         category: 'კონსერვები', weight: '720 მლ', packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&h=200&fit=crop', status: 'active',   description: 'მწნილი კიტრი' },
    { id: 29, name: 'ზეთისხილი 300გ',             category: 'კონსერვები', weight: '300 გ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&h=200&fit=crop', status: 'active',   description: 'შავი ზეთისხილი კონსერვირებული' },
    { id: 30, name: 'თუნა კონსერვი 185გ',         category: 'კონსერვები', weight: '185 გ',  packaging: '48 ცალი', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&h=200&fit=crop', status: 'inactive', description: 'თუნა ზეთში' },
    // მაკარონი
    { id: 31, name: 'სპაგეტი 500გ',               category: 'მაკარონი', weight: '500 გ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop', status: 'active',   description: 'კლასიკური სპაგეტი' },
    { id: 32, name: 'პენე 500გ',                   category: 'მაკარონი', weight: '500 გ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop', status: 'active',   description: 'პენე რიგატე' },
    { id: 33, name: 'ფარფალე 500გ',                category: 'მაკარონი', weight: '500 გ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop', status: 'active',   description: 'ფარფალე პასტა' },
    { id: 34, name: 'ფუსილი 500გ',                 category: 'მაკარონი', weight: '500 გ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop', status: 'active',   description: 'ხვეული ფუსილი' },
    { id: 35, name: 'ლაზანია 250გ',                category: 'მაკარონი', weight: '250 გ',  packaging: '16 ცალი', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop', status: 'active',   description: 'ლაზანიის ფურცლები' },
    { id: 36, name: 'ვერმიშელი 400გ',              category: 'მაკარონი', weight: '400 გ',  packaging: '24 ცალი', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=200&h=200&fit=crop', status: 'inactive', description: 'წვრილი ვერმიშელი' },
    // ზეთი
    { id: 37, name: 'მზესუმზირის ზეთი 1ლ',        category: 'ზეთი', weight: '1 ლ',    packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1474979266404-7eabd7a04a8d?w=200&h=200&fit=crop', status: 'active',   description: 'რაფინირებული მზესუმზირის ზეთი' },
    { id: 38, name: 'ზეთისხილის ზეთი 0.5ლ',       category: 'ზეთი', weight: '0.5 ლ',  packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1474979266404-7eabd7a04a8d?w=200&h=200&fit=crop', status: 'active',   description: 'ექსტრა ვირჯინ ზეთისხილის ზეთი' },
    { id: 39, name: 'სიმინდის ზეთი 1ლ',           category: 'ზეთი', weight: '1 ლ',    packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1474979266404-7eabd7a04a8d?w=200&h=200&fit=crop', status: 'active',   description: 'რაფინირებული სიმინდის ზეთი' },
    { id: 40, name: 'მზესუმზირის ზეთი 5ლ',        category: 'ზეთი', weight: '5 ლ',    packaging: '4 ცალი',  image: 'https://images.unsplash.com/photo-1474979266404-7eabd7a04a8d?w=200&h=200&fit=crop', status: 'active',   description: 'მზესუმზირის ზეთი ეკონომ' },
    { id: 41, name: 'სოიოს ზეთი 1ლ',              category: 'ზეთი', weight: '1 ლ',    packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1474979266404-7eabd7a04a8d?w=200&h=200&fit=crop', status: 'active',   description: 'სოიოს ზეთი' },
    { id: 42, name: 'ზეთისხილის ზეთი 1ლ',         category: 'ზეთი', weight: '1 ლ',    packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1474979266404-7eabd7a04a8d?w=200&h=200&fit=crop', status: 'inactive', description: 'იმპორტირებული ზეთისხილის ზეთი' },
    // საკონდიტრო
    { id: 43, name: 'შოკოლადის ფილა 100გ',        category: 'საკონდიტრო', weight: '100 გ',  packaging: '40 ცალი', image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=200&h=200&fit=crop', status: 'active',   description: 'რძიანი შოკოლადი' },
    { id: 44, name: 'ვაფლი 200გ',                  category: 'საკონდიტრო', weight: '200 გ',  packaging: '20 ცალი', image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=200&h=200&fit=crop', status: 'active',   description: 'შოკოლადის ვაფლი' },
    { id: 45, name: 'ორცხობილა 300გ',              category: 'საკონდიტრო', weight: '300 გ',  packaging: '20 ცალი', image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=200&h=200&fit=crop', status: 'active',   description: 'კარაქიანი ორცხობილა' },
    { id: 46, name: 'კანფეტი ასორტი 250გ',         category: 'საკონდიტრო', weight: '250 გ',  packaging: '16 ცალი', image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=200&h=200&fit=crop', status: 'active',   description: 'ასორტირებული კანფეტები' },
    { id: 47, name: 'ჰალვა 350გ',                  category: 'საკონდიტრო', weight: '350 გ',  packaging: '12 ცალი', image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=200&h=200&fit=crop', status: 'active',   description: 'მზესუმზირის ჰალვა' },
    { id: 48, name: 'მარმელადი 300გ',              category: 'საკონდიტრო', weight: '300 გ',  packaging: '20 ცალი', image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=200&h=200&fit=crop', status: 'inactive', description: 'ხილის მარმელადი' }
  ];

  const DEFAULT_MESSAGES = [
    { id: 1, firstName: 'გიორგი',  lastName: 'მაისურაძე', email: 'g.maisuradze@mail.ge', subject: 'თანამშრომლობის შეთავაზება',  date: '2026-04-15', status: 'new',  body: 'გამარჯობა, მინდა შემოგთავაზოთ თანამშრომლობა ჩვენი კომპანიის პროდუქციის დისტრიბუციაზე. გვაქვს წარმოება თბილისში და ბათუმში. გთხოვთ დამიკავშირდეთ დეტალებისთვის.' },
    { id: 2, firstName: 'ნინო',    lastName: 'კაპანაძე',  email: 'n.kapanadze@gmail.com', subject: 'ფასების მოთხოვნა',           date: '2026-04-14', status: 'new',  body: 'გთხოვთ გამოგვიგზავნოთ პროდუქციის ფასების განახლებული სია. განსაკუთრებით გვაინტერესებს წვენების და გამაგრილებელი სასმელების კატეგორიები.' },
    { id: 3, firstName: 'დავით',   lastName: 'ჯავახიშვილი', email: 'd.javakhishvili@corp.ge', subject: 'ახალი მაღაზიის გახსნა',  date: '2026-04-12', status: 'read', body: 'ჩვენი ქსელი ხსნის ახალ ფილიალს რუსთავში. გვინდა შევუკვეთოთ პროდუქცია ახალი მაღაზიისთვის. გთხოვთ დაგვიკავშირდეთ.' },
    { id: 4, firstName: 'მარიამ',  lastName: 'ბერიძე',   email: 'm.beridze@outlook.com',  subject: 'მიწოდების გრაფიკი',          date: '2026-04-10', status: 'read', body: 'გვსურს ვიცოდეთ მიწოდების გრაფიკი ქუთაისის რეგიონში. რამდენად ხშირად ხდება მიწოდება და რა არის მინიმალური შეკვეთის ოდენობა?' },
    { id: 5, firstName: 'ალექსანდრე', lastName: 'ნოზაძე', email: 'a.nozadze@business.ge', subject: 'რეკლამაციის განცხადება',     date: '2026-04-08', status: 'new',  body: 'ბოლო მიწოდებაში მიღებული პროდუქციის ნაწილს ვადა ჰქონდა გასული. გთხოვთ დაგვიკავშირდეთ პრობლემის მოგვარებისთვის. შეკვეთის ნომერი: ORD-2026-0412.' }
  ];

  const DEFAULT_NEWS = [
    { id: 1, title: 'ოლიმპი ახალ პარტნიორობას აფორმებს', date: '2026-04-10', content: 'სადისტრიბუციო კომპანია ოლიმპიმ ახალი ხელშეკრულება გააფორმა ერთ-ერთ წამყვან მწარმოებელთან. ეს პარტნიორობა საშუალებას მოგვცემს გავაფართოვოთ პროდუქციის ასორტიმენტი და უფრო კონკურენტული ფასები შევთავაზოთ ჩვენს მომხმარებლებს. ახალი პროდუქტების მიწოდება დაიწყება მომავალი თვიდან.', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=250&fit=crop' },
    { id: 2, title: 'ISO 22000 სერტიფიკატის განახლება',  date: '2026-03-25', content: 'ოლიმპიმ წარმატებით განაახლა ISO 22000 სერტიფიკატი, რაც ადასტურებს კომპანიის ვალდებულებას სურსათის უსაფრთხოების მაღალი სტანდარტების დაცვაზე. აუდიტმა დაადასტურა, რომ ჩვენი საწყობების და ლოჯისტიკის სისტემა სრულად აკმაყოფილებს საერთაშორისო მოთხოვნებს.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop' }
  ];

  const DEFAULT_GALLERY = [
    { id: 1, url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=350&fit=crop', category: 'საწარმო', caption: 'ცენტრალური საწყობი' },
    { id: 2, url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&h=350&fit=crop', category: 'საწარმო', caption: 'ლოჯისტიკის ცენტრი' },
    { id: 3, url: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?w=500&h=350&fit=crop', category: 'პროდუქცია', caption: 'წვენების ხაზი' },
    { id: 4, url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=350&fit=crop', category: 'ღონისძიება', caption: 'პარტნიორთა შეხვედრა 2026' },
    { id: 5, url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=350&fit=crop', category: 'პროდუქცია', caption: 'ახალი ასორტიმენტი' },
    { id: 6, url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=350&fit=crop', category: 'ღონისძიება', caption: 'გუნდის ღონისძიება' }
  ];

  const DEFAULT_PARTNERS = [
    { id: 1, name: 'კოკა-კოლა საქართველო',   description: 'გამაგრილებელი სასმელების წამყვანი მწარმოებელი', logo: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop' },
    { id: 2, name: 'ნაბეღლავი',               description: 'მინერალური წყლის ბრენდი',                     logo: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop' },
    { id: 3, name: 'ბარამბო',                  description: 'საკონდიტრო პროდუქციის მწარმოებელი',           logo: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=200&h=200&fit=crop' },
    { id: 4, name: 'ნიკორა',                   description: 'სუპერმარკეტების ქსელი',                      logo: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop' },
    { id: 5, name: 'სმარტი',                   description: 'საცალო ვაჭრობის ქსელი',                      logo: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=200&h=200&fit=crop' }
  ];

  const DEFAULT_COMPANY = {
    companyName: 'OLIMPI — სადისტრიბუციო კომპანია',
    companyDesc: 'ოლიმპი არის წამყვანი სადისტრიბუციო კომპანია საქართველოში, რომელიც სპეციალიზდება სასურსათო პროდუქციის დისტრიბუციაში.',
    companyMission: 'ჩვენი მისიაა მომხმარებელს შევთავაზოთ მაღალი ხარისხის პროდუქცია კონკურენტულ ფასად, დროულად და საიმედოდ.',
    companyVision: 'ვცდილობთ გავხდეთ კავკასიის რეგიონში ყველაზე საიმედო და ინოვაციური სადისტრიბუციო კომპანია.',
    companyAddress: 'თბილისი, საქართველო',
    companyPhone1: '+995 XXX XXX XXX',
    companyPhone2: '+995 XXX XXX XXX',
    companyEmail: 'info@olimpi.ge',
    companyCerts: 'ISO 22000:2018 — სურსათის უსაფრთხოების მართვის სისტემა\nISO 9001:2015 — ხარისხის მართვის სისტემა',
    companyFB: 'https://facebook.com/olimpi.ge',
    companyIG: 'https://instagram.com/olimpi.ge',
    companyLI: 'https://linkedin.com/company/olimpi'
  };

  const DEFAULT_SETTINGS = {
    siteTitle: 'OLIMPI — სადისტრიბუციო კომპანია',
    siteMeta: 'ოლიმპი — საქართველოს წამყვანი სადისტრიბუციო კომპანია. სასურსათო პროდუქციის სანდო პარტნიორი.',
    siteEmail: 'info@olimpi.ge',
    phones: ['+995 XXX XXX XXX', '+995 XXX XXX XXX'],
    siteFB: 'https://facebook.com/olimpi.ge',
    siteIG: 'https://instagram.com/olimpi.ge',
    siteLI: 'https://linkedin.com/company/olimpi',
    hoursWeekday: '09:00 - 18:00',
    hoursSat: '10:00 - 15:00',
    hoursSun: 'დასვენება',
    siteMap: ''
  };

  // ───────────────────────────────────────
  // STORAGE HELPERS
  // ───────────────────────────────────────
  function getData(key, fallback) {
    const raw = localStorage.getItem('olimpi_' + key);
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return fallback;
  }
  function setData(key, val) {
    localStorage.setItem('olimpi_' + key, JSON.stringify(val));
  }
  function nextId(arr) {
    if (!arr.length) return 1;
    return Math.max(...arr.map(i => i.id)) + 1;
  }

  // Initialize data on first load
  function initData() {
    if (!localStorage.getItem('olimpi_initialized')) {
      setData('categories', DEFAULT_CATEGORIES);
      setData('products', DEFAULT_PRODUCTS);
      setData('messages', DEFAULT_MESSAGES);
      setData('news', DEFAULT_NEWS);
      setData('gallery', DEFAULT_GALLERY);
      setData('partners', DEFAULT_PARTNERS);
      setData('company', DEFAULT_COMPANY);
      setData('settings', DEFAULT_SETTINGS);
      localStorage.setItem('olimpi_initialized', '1');
    }
  }

  // ───────────────────────────────────────
  // DOM REFS
  // ───────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ───────────────────────────────────────
  // TOAST
  // ───────────────────────────────────────
  function toast(msg, type) {
    type = type || 'success';
    const el = document.createElement('div');
    el.className = 'toast toast--' + type;
    el.textContent = msg;
    $('#toastContainer').appendChild(el);
    setTimeout(() => { if (el.parentNode) el.remove(); }, 3200);
  }

  // ───────────────────────────────────────
  // MODAL
  // ───────────────────────────────────────
  function openModal(title, bodyHTML) {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = bodyHTML;
    $('#modalOverlay').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    $('#modalOverlay').style.display = 'none';
    document.body.style.overflow = '';
  }
  // ───────────────────────────────────────
  // IMAGE UPLOAD HELPER
  // ───────────────────────────────────────
  // Returns HTML for a file upload + URL fallback field
  function imageFieldHTML(id, currentValue) {
    currentValue = currentValue || '';
    return '' +
      '<div class="form-group img-upload-group">' +
        '<label>სურათი</label>' +
        '<div class="img-upload">' +
          '<div class="img-upload__preview" id="' + id + 'Preview"' +
            (currentValue ? ' style="background-image:url(\'' + esc(currentValue) + '\')"' : '') + '>' +
            (currentValue ? '' : '<span>სურათის ატვირთვა</span>') +
          '</div>' +
          '<div class="img-upload__actions">' +
            '<label class="btn btn--sm btn--upload" for="' + id + 'File">ფაილიდან ატვირთვა</label>' +
            '<input type="file" id="' + id + 'File" accept="image/*" style="display:none">' +
            '<div class="img-upload__or">ან</div>' +
            '<input type="text" id="' + id + '" placeholder="ჩასვით URL ბმული" value="' + esc(currentValue) + '">' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  // Wire up file input to convert to base64 and set the hidden URL field + preview
  function wireImageUpload(id) {
    var fileInput = $('#' + id + 'File');
    var urlInput = $('#' + id);
    var preview = $('#' + id + 'Preview');
    if (!fileInput) return;

    fileInput.addEventListener('change', function () {
      var file = fileInput.files[0];
      if (!file) return;
      // Max 2MB
      if (file.size > 2 * 1024 * 1024) {
        toast('ფაილი ძალიან დიდია (მაქს. 2MB)', 'error');
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        var dataUrl = e.target.result;
        urlInput.value = dataUrl;
        preview.style.backgroundImage = 'url("' + dataUrl + '")';
        preview.innerHTML = '';
      };
      reader.readAsDataURL(file);
    });

    // Also update preview when URL is pasted manually
    urlInput.addEventListener('input', function () {
      var val = urlInput.value.trim();
      if (val) {
        preview.style.backgroundImage = 'url("' + val + '")';
        preview.innerHTML = '';
      } else {
        preview.style.backgroundImage = '';
        preview.innerHTML = '<span>სურათის ატვირთვა</span>';
      }
    });

    // Click on preview also opens file picker
    preview.addEventListener('click', function () {
      fileInput.click();
    });
  }

  $('#modalClose').addEventListener('click', closeModal);
  $('#modalOverlay').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });

  // ───────────────────────────────────────
  // AUTH
  // ───────────────────────────────────────
  function checkAuth() {
    if (sessionStorage.getItem('olimpi_auth')) {
      $('#loginScreen').style.display = 'none';
      $('#adminShell').style.display = 'flex';
      return true;
    }
    $('#loginScreen').style.display = 'flex';
    $('#adminShell').style.display = 'none';
    return false;
  }

  $('#loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const user = $('#loginUser').value.trim();
    const pass = $('#loginPass').value;
    if (user === 'admin' && pass === 'admin123') {
      sessionStorage.setItem('olimpi_auth', '1');
      checkAuth();
      renderPage('dashboard');
    } else {
      $('#loginError').style.display = 'block';
    }
  });

  $('#logoutBtn').addEventListener('click', function () {
    sessionStorage.removeItem('olimpi_auth');
    checkAuth();
  });

  // ───────────────────────────────────────
  // NAVIGATION
  // ───────────────────────────────────────
  let currentPage = 'dashboard';

  function showPage(page) {
    $$('.page').forEach(p => p.style.display = 'none');
    const el = $('#page-' + page);
    if (el) el.style.display = 'block';
    $$('.sidebar__link').forEach(l => l.classList.remove('active'));
    const link = document.querySelector('.sidebar__link[data-page="' + page + '"]');
    if (link) link.classList.add('active');
    currentPage = page;
    // close mobile sidebar
    $('#sidebar').classList.remove('open');
    $('#sidebarOverlay').classList.remove('open');
    $('#hamburgerBtn').classList.remove('open');
  }

  function renderPage(page) {
    showPage(page);
    switch (page) {
      case 'dashboard':  renderDashboard(); break;
      case 'products':   renderProducts(); break;
      case 'categories': renderCategories(); break;
      case 'company':    renderCompany(); break;
      case 'gallery':    renderGallery(); break;
      case 'news':       renderNews(); break;
      case 'messages':   renderMessages(); break;
      case 'partners':   renderPartners(); break;
      case 'settings':   renderSettings(); break;
    }
  }

  // Sidebar nav
  $$('.sidebar__link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      renderPage(this.dataset.page);
    });
  });

  // Quick action / goto links
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-goto]');
    if (btn) {
      e.preventDefault();
      const page = btn.dataset.goto;
      renderPage(page);
      if (btn.dataset.action === 'add') {
        setTimeout(function () {
          const addBtn = $('#add' + page.charAt(0).toUpperCase() + page.slice(1).replace(/s$/, '') + 'Btn');
          if (addBtn) addBtn.click();
          // special cases
          if (page === 'products') $('#addProductBtn').click();
          if (page === 'news') $('#addNewsBtn').click();
        }, 100);
      }
    }
  });

  // Hamburger
  $('#hamburgerBtn').addEventListener('click', function () {
    this.classList.toggle('open');
    $('#sidebar').classList.toggle('open');
    $('#sidebarOverlay').classList.toggle('open');
  });
  $('#sidebarOverlay').addEventListener('click', function () {
    $('#hamburgerBtn').classList.remove('open');
    $('#sidebar').classList.remove('open');
    this.classList.remove('open');
  });

  // Bell goes to messages
  $('#bellBtn').addEventListener('click', function () {
    renderPage('messages');
  });

  // ───────────────────────────────────────
  // DASHBOARD
  // ───────────────────────────────────────
  function renderDashboard() {
    const products   = getData('products', []);
    const categories = getData('categories', []);
    const partners   = getData('partners', []);
    const messages   = getData('messages', []);
    const newMsgs    = messages.filter(m => m.status === 'new');

    $('#statProducts').textContent   = products.length;
    $('#statCategories').textContent = categories.length;
    $('#statPartners').textContent   = partners.length;
    $('#statMessages').textContent   = messages.length;

    // Badge
    const badge = $('#msgBadge');
    badge.textContent = newMsgs.length;
    badge.style.display = newMsgs.length > 0 ? 'inline-block' : 'none';

    // Bell dot
    $('#bellDot').style.display = newMsgs.length > 0 ? 'block' : 'none';

    // Recent messages
    const tbody = $('#dashMsgTable');
    tbody.innerHTML = '';
    messages.slice(0, 5).forEach(function (m) {
      const tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + esc(m.firstName + ' ' + m.lastName) + '</td>' +
        '<td>' + esc(m.subject) + '</td>' +
        '<td>' + esc(m.date) + '</td>' +
        '<td><span class="badge badge--' + m.status + '">' + (m.status === 'new' ? 'ახალი' : 'წაკითხული') + '</span></td>';
      tbody.appendChild(tr);
    });
  }

  // ───────────────────────────────────────
  // PRODUCTS
  // ───────────────────────────────────────
  function renderProducts() {
    const products = getData('products', []);
    const categories = getData('categories', []);

    // Populate filter
    const sel = $('#productCatFilter');
    const curVal = sel.value;
    sel.innerHTML = '<option value="">ყველა კატეგორია</option>';
    categories.forEach(function (c) {
      sel.innerHTML += '<option value="' + esc(c.name) + '">' + esc(c.name) + '</option>';
    });
    sel.value = curVal;

    renderProductsTable(products);
  }

  function renderProductsTable(allProducts) {
    const search = ($('#productSearch') ? $('#productSearch').value : '').toLowerCase();
    const cat = $('#productCatFilter') ? $('#productCatFilter').value : '';
    let filtered = allProducts || getData('products', []);
    if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
    if (cat) filtered = filtered.filter(p => p.category === cat);

    const tbody = $('#productsTable');
    tbody.innerHTML = '';
    filtered.forEach(function (p) {
      const tr = document.createElement('tr');
      tr.innerHTML =
        '<td><img class="thumb" src="' + esc(p.image) + '" alt="" onerror="this.style.background=\'#eee\'"></td>' +
        '<td><strong>' + esc(p.name) + '</strong></td>' +
        '<td>' + esc(p.category) + '</td>' +
        '<td>' + esc(p.weight) + '</td>' +
        '<td>' + esc(p.packaging) + '</td>' +
        '<td><span class="badge badge--' + p.status + '">' + (p.status === 'active' ? 'აქტიური' : 'არააქტიური') + '</span></td>' +
        '<td class="actions">' +
          '<button class="btn--icon" data-edit-product="' + p.id + '" title="რედაქტირება"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>' +
          '<button class="btn--icon danger" data-delete-product="' + p.id + '" title="წაშლა"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>' +
        '</td>';
      tbody.appendChild(tr);
    });
  }

  // Search & filter events
  document.addEventListener('input', function (e) {
    if (e.target.id === 'productSearch') renderProductsTable();
  });
  document.addEventListener('change', function (e) {
    if (e.target.id === 'productCatFilter') renderProductsTable();
  });

  function productFormHTML(p) {
    p = p || {};
    const categories = getData('categories', []);
    let catOpts = '<option value="">აირჩიეთ კატეგორია</option>';
    categories.forEach(function (c) {
      catOpts += '<option value="' + esc(c.name) + '"' + (p.category === c.name ? ' selected' : '') + '>' + esc(c.name) + '</option>';
    });
    return '' +
      '<div class="form-group"><label>სახელი *</label><input type="text" id="mProdName" value="' + esc(p.name || '') + '" required></div>' +
      '<div class="form-group"><label>კატეგორია *</label><select id="mProdCat">' + catOpts + '</select></div>' +
      '<div class="form-group"><label>აღწერა</label><textarea id="mProdDesc" rows="2">' + esc(p.description || '') + '</textarea></div>' +
      '<div class="form-group"><label>წონა / მოცულობა</label><input type="text" id="mProdWeight" value="' + esc(p.weight || '') + '"></div>' +
      '<div class="form-group"><label>შეფუთვა (ყუთში)</label><input type="text" id="mProdPkg" value="' + esc(p.packaging || '') + '"></div>' +
      imageFieldHTML('mProdImg', p.image) +
      '<div class="form-group"><label>სტატუსი</label><select id="mProdStatus"><option value="active"' + (p.status === 'active' ? ' selected' : '') + '>აქტიური</option><option value="inactive"' + (p.status === 'inactive' ? ' selected' : '') + '>არააქტიური</option></select></div>' +
      '<button class="btn btn--primary btn--full" id="mProdSave">შენახვა</button>';
  }

  // Add product
  $('#addProductBtn').addEventListener('click', function () {
    openModal('პროდუქტის დამატება', productFormHTML());
    wireImageUpload('mProdImg');
    $('#mProdSave').addEventListener('click', function () {
      const name = $('#mProdName').value.trim();
      const cat  = $('#mProdCat').value;
      if (!name) { $('#mProdName').classList.add('error'); return; }
      if (!cat) { $('#mProdCat').classList.add('error'); return; }
      const products = getData('products', []);
      products.push({
        id: nextId(products),
        name: name,
        category: cat,
        description: $('#mProdDesc').value.trim(),
        weight: $('#mProdWeight').value.trim(),
        packaging: $('#mProdPkg').value.trim(),
        image: $('#mProdImg').value.trim() || 'https://via.placeholder.com/200',
        status: $('#mProdStatus').value
      });
      setData('products', products);
      closeModal();
      renderProducts();
      toast('პროდუქტი დაემატა');
    });
  });

  // Edit / Delete product (delegated)
  document.addEventListener('click', function (e) {
    // Edit
    const editBtn = e.target.closest('[data-edit-product]');
    if (editBtn) {
      const id = parseInt(editBtn.dataset.editProduct);
      const products = getData('products', []);
      const p = products.find(x => x.id === id);
      if (!p) return;
      openModal('პროდუქტის რედაქტირება', productFormHTML(p));
      wireImageUpload('mProdImg');
      $('#mProdSave').addEventListener('click', function () {
        const name = $('#mProdName').value.trim();
        const cat  = $('#mProdCat').value;
        if (!name) { $('#mProdName').classList.add('error'); return; }
        if (!cat) { $('#mProdCat').classList.add('error'); return; }
        p.name        = name;
        p.category    = cat;
        p.description = $('#mProdDesc').value.trim();
        p.weight      = $('#mProdWeight').value.trim();
        p.packaging   = $('#mProdPkg').value.trim();
        p.image       = $('#mProdImg').value.trim() || p.image;
        p.status      = $('#mProdStatus').value;
        setData('products', products);
        closeModal();
        renderProducts();
        toast('პროდუქტი განახლდა');
      });
    }
    // Delete
    const delBtn = e.target.closest('[data-delete-product]');
    if (delBtn) {
      if (!confirm('ნამდვილად გსურთ წაშლა?')) return;
      const id = parseInt(delBtn.dataset.deleteProduct);
      let products = getData('products', []);
      products = products.filter(x => x.id !== id);
      setData('products', products);
      renderProducts();
      toast('პროდუქტი წაიშალა', 'danger');
    }
  });

  // ───────────────────────────────────────
  // CATEGORIES
  // ───────────────────────────────────────
  function renderCategories() {
    const categories = getData('categories', []);
    const products = getData('products', []);
    const grid = $('#categoriesGrid');
    grid.innerHTML = '';
    categories.forEach(function (c) {
      const count = products.filter(p => p.category === c.name).length;
      const card = document.createElement('div');
      card.className = 'cat-card';
      card.innerHTML =
        '<img class="cat-card__img" src="' + esc(c.image) + '" alt="" onerror="this.style.background=\'#eee\'">' +
        '<div class="cat-card__body">' +
          '<div class="cat-card__name">' + esc(c.name) + '</div>' +
          '<div class="cat-card__count">' + count + ' პროდუქტი</div>' +
          '<div class="cat-card__actions">' +
            '<button class="btn btn--sm btn--outline" data-edit-cat="' + c.id + '">რედაქტირება</button>' +
            '<button class="btn btn--sm btn--danger" data-delete-cat="' + c.id + '">წაშლა</button>' +
          '</div>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  function categoryFormHTML(c) {
    c = c || {};
    return '' +
      '<div class="form-group"><label>სახელი *</label><input type="text" id="mCatName" value="' + esc(c.name || '') + '"></div>' +
      '<div class="form-group"><label>აღწერა</label><textarea id="mCatDesc" rows="2">' + esc(c.description || '') + '</textarea></div>' +
      imageFieldHTML('mCatImg', c.image) +
      '<button class="btn btn--primary btn--full" id="mCatSave">შენახვა</button>';
  }

  $('#addCategoryBtn').addEventListener('click', function () {
    openModal('კატეგორიის დამატება', categoryFormHTML());
    wireImageUpload('mCatImg');
    $('#mCatSave').addEventListener('click', function () {
      const name = $('#mCatName').value.trim();
      if (!name) { $('#mCatName').classList.add('error'); return; }
      const categories = getData('categories', []);
      categories.push({
        id: nextId(categories),
        name: name,
        description: $('#mCatDesc').value.trim(),
        image: $('#mCatImg').value.trim() || 'https://via.placeholder.com/400x300'
      });
      setData('categories', categories);
      closeModal();
      renderCategories();
      toast('კატეგორია დაემატა');
    });
  });

  document.addEventListener('click', function (e) {
    const editBtn = e.target.closest('[data-edit-cat]');
    if (editBtn) {
      const id = parseInt(editBtn.dataset.editCat);
      const categories = getData('categories', []);
      const c = categories.find(x => x.id === id);
      if (!c) return;
      openModal('კატეგორიის რედაქტირება', categoryFormHTML(c));
      wireImageUpload('mCatImg');
      $('#mCatSave').addEventListener('click', function () {
        const name = $('#mCatName').value.trim();
        if (!name) { $('#mCatName').classList.add('error'); return; }
        c.name = name;
        c.description = $('#mCatDesc').value.trim();
        c.image = $('#mCatImg').value.trim() || c.image;
        setData('categories', categories);
        closeModal();
        renderCategories();
        toast('კატეგორია განახლდა');
      });
    }
    const delBtn = e.target.closest('[data-delete-cat]');
    if (delBtn) {
      if (!confirm('ნამდვილად გსურთ წაშლა?')) return;
      const id = parseInt(delBtn.dataset.deleteCat);
      let categories = getData('categories', []);
      categories = categories.filter(x => x.id !== id);
      setData('categories', categories);
      renderCategories();
      toast('კატეგორია წაიშალა', 'danger');
    }
  });

  // ───────────────────────────────────────
  // COMPANY INFO
  // ───────────────────────────────────────
  function renderCompany() {
    const d = getData('company', DEFAULT_COMPANY);
    const f = $('#companyForm');
    f.companyName.value    = d.companyName || '';
    f.companyDesc.value    = d.companyDesc || '';
    f.companyMission.value = d.companyMission || '';
    f.companyVision.value  = d.companyVision || '';
    f.companyAddress.value = d.companyAddress || '';
    f.companyPhone1.value  = d.companyPhone1 || '';
    f.companyPhone2.value  = d.companyPhone2 || '';
    f.companyEmail.value   = d.companyEmail || '';
    f.companyCerts.value   = d.companyCerts || '';
    f.companyFB.value      = d.companyFB || '';
    f.companyIG.value      = d.companyIG || '';
    f.companyLI.value      = d.companyLI || '';
  }

  $('#companyForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const f = this;
    setData('company', {
      companyName:    f.companyName.value.trim(),
      companyDesc:    f.companyDesc.value.trim(),
      companyMission: f.companyMission.value.trim(),
      companyVision:  f.companyVision.value.trim(),
      companyAddress: f.companyAddress.value.trim(),
      companyPhone1:  f.companyPhone1.value.trim(),
      companyPhone2:  f.companyPhone2.value.trim(),
      companyEmail:   f.companyEmail.value.trim(),
      companyCerts:   f.companyCerts.value.trim(),
      companyFB:      f.companyFB.value.trim(),
      companyIG:      f.companyIG.value.trim(),
      companyLI:      f.companyLI.value.trim()
    });
    toast('კომპანიის ინფორმაცია შენახულია');
  });

  // ───────────────────────────────────────
  // GALLERY
  // ───────────────────────────────────────
  function renderGallery() {
    const gallery = getData('gallery', []);
    const filter = $('#galleryCatFilter').value;
    const filtered = filter ? gallery.filter(g => g.category === filter) : gallery;
    const grid = $('#galleryGrid');
    grid.innerHTML = '';
    filtered.forEach(function (g) {
      const item = document.createElement('div');
      item.className = 'gallery-item';
      item.innerHTML =
        '<img class="gallery-item__img" src="' + esc(g.url) + '" alt="" onerror="this.style.background=\'#eee\'">' +
        '<div class="gallery-item__caption">' + esc(g.caption || '') + (g.category ? ' — ' + esc(g.category) : '') + '</div>' +
        '<div class="gallery-item__overlay">' +
          '<button class="btn btn--sm btn--danger" data-delete-gallery="' + g.id + '">წაშლა</button>' +
        '</div>';
      grid.appendChild(item);
    });
  }

  document.addEventListener('change', function (e) {
    if (e.target.id === 'galleryCatFilter') renderGallery();
  });

  $('#addGalleryBtn').addEventListener('click', function () {
    openModal('სურათის დამატება',
      imageFieldHTML('mGalUrl', '') +
      '<div class="form-group"><label>კატეგორია</label><select id="mGalCat"><option value="">აირჩიეთ</option><option value="პროდუქცია">პროდუქცია</option><option value="საწარმო">საწარმო</option><option value="ღონისძიება">ღონისძიება</option><option value="სხვა">სხვა</option></select></div>' +
      '<div class="form-group"><label>წარწერა</label><input type="text" id="mGalCaption"></div>' +
      '<button class="btn btn--primary btn--full" id="mGalSave">დამატება</button>'
    );
    wireImageUpload('mGalUrl');
    $('#mGalSave').addEventListener('click', function () {
      const url = $('#mGalUrl').value.trim();
      if (!url) { $('#mGalUrl').classList.add('error'); return; }
      const gallery = getData('gallery', []);
      gallery.push({
        id: nextId(gallery),
        url: url,
        category: $('#mGalCat').value,
        caption: $('#mGalCaption').value.trim()
      });
      setData('gallery', gallery);
      closeModal();
      renderGallery();
      toast('სურათი დაემატა');
    });
  });

  document.addEventListener('click', function (e) {
    const delBtn = e.target.closest('[data-delete-gallery]');
    if (delBtn) {
      if (!confirm('ნამდვილად გსურთ წაშლა?')) return;
      const id = parseInt(delBtn.dataset.deleteGallery);
      let gallery = getData('gallery', []);
      gallery = gallery.filter(x => x.id !== id);
      setData('gallery', gallery);
      renderGallery();
      toast('სურათი წაიშალა', 'danger');
    }
  });

  // ───────────────────────────────────────
  // NEWS
  // ───────────────────────────────────────
  function renderNews() {
    const news = getData('news', []);
    const list = $('#newsList');
    list.innerHTML = '';
    news.forEach(function (n) {
      const item = document.createElement('div');
      item.className = 'news-item';
      item.innerHTML =
        '<img class="news-item__img" src="' + esc(n.image || '') + '" alt="" onerror="this.style.background=\'#eee\'">' +
        '<div class="news-item__body">' +
          '<div class="news-item__title">' + esc(n.title) + '</div>' +
          '<div class="news-item__date">' + esc(n.date) + '</div>' +
          '<div class="news-item__excerpt">' + esc(n.content) + '</div>' +
          '<div class="news-item__actions">' +
            '<button class="btn btn--sm btn--outline" data-edit-news="' + n.id + '">რედაქტირება</button>' +
            '<button class="btn btn--sm btn--danger" data-delete-news="' + n.id + '">წაშლა</button>' +
          '</div>' +
        '</div>';
      list.appendChild(item);
    });
  }

  function newsFormHTML(n) {
    n = n || {};
    return '' +
      '<div class="form-group"><label>სათაური *</label><input type="text" id="mNewsTitle" value="' + esc(n.title || '') + '"></div>' +
      '<div class="form-group"><label>თარიღი</label><input type="date" id="mNewsDate" value="' + esc(n.date || new Date().toISOString().slice(0, 10)) + '"></div>' +
      '<div class="form-group"><label>შინაარსი</label><textarea id="mNewsContent" rows="5">' + esc(n.content || '') + '</textarea></div>' +
      imageFieldHTML('mNewsImg', n.image) +
      '<button class="btn btn--primary btn--full" id="mNewsSave">შენახვა</button>';
  }

  $('#addNewsBtn').addEventListener('click', function () {
    openModal('სიახლის დამატება', newsFormHTML());
    wireImageUpload('mNewsImg');
    $('#mNewsSave').addEventListener('click', function () {
      const title = $('#mNewsTitle').value.trim();
      if (!title) { $('#mNewsTitle').classList.add('error'); return; }
      const news = getData('news', []);
      news.unshift({
        id: nextId(news),
        title: title,
        date: $('#mNewsDate').value,
        content: $('#mNewsContent').value.trim(),
        image: $('#mNewsImg').value.trim() || 'https://via.placeholder.com/400x250'
      });
      setData('news', news);
      closeModal();
      renderNews();
      toast('სიახლე დაემატა');
    });
  });

  document.addEventListener('click', function (e) {
    const editBtn = e.target.closest('[data-edit-news]');
    if (editBtn) {
      const id = parseInt(editBtn.dataset.editNews);
      const news = getData('news', []);
      const n = news.find(x => x.id === id);
      if (!n) return;
      openModal('სიახლის რედაქტირება', newsFormHTML(n));
      wireImageUpload('mNewsImg');
      $('#mNewsSave').addEventListener('click', function () {
        const title = $('#mNewsTitle').value.trim();
        if (!title) { $('#mNewsTitle').classList.add('error'); return; }
        n.title   = title;
        n.date    = $('#mNewsDate').value;
        n.content = $('#mNewsContent').value.trim();
        n.image   = $('#mNewsImg').value.trim() || n.image;
        setData('news', news);
        closeModal();
        renderNews();
        toast('სიახლე განახლდა');
      });
    }
    const delBtn = e.target.closest('[data-delete-news]');
    if (delBtn) {
      if (!confirm('ნამდვილად გსურთ წაშლა?')) return;
      const id = parseInt(delBtn.dataset.deleteNews);
      let news = getData('news', []);
      news = news.filter(x => x.id !== id);
      setData('news', news);
      renderNews();
      toast('სიახლე წაიშალა', 'danger');
    }
  });

  // ───────────────────────────────────────
  // MESSAGES
  // ───────────────────────────────────────
  function renderMessages() {
    const messages = getData('messages', []);
    const tbody = $('#messagesTable');
    tbody.innerHTML = '';
    messages.forEach(function (m) {
      const tr = document.createElement('tr');
      tr.innerHTML =
        '<td>' + esc(m.firstName) + '</td>' +
        '<td>' + esc(m.lastName) + '</td>' +
        '<td>' + esc(m.email) + '</td>' +
        '<td>' + esc(m.subject) + '</td>' +
        '<td>' + esc(m.date) + '</td>' +
        '<td><span class="badge badge--' + m.status + '">' + (m.status === 'new' ? 'ახალი' : 'წაკითხული') + '</span></td>' +
        '<td class="actions">' +
          '<button class="btn--icon" data-read-msg="' + m.id + '" title="ნახვა"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>' +
          (m.status === 'new' ? '<button class="btn--icon" data-mark-msg="' + m.id + '" title="წაკითხულად"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></button>' : '') +
          '<button class="btn--icon danger" data-delete-msg="' + m.id + '" title="წაშლა"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg></button>' +
        '</td>';
      tbody.appendChild(tr);
    });

    // Hide detail
    $('#msgDetail').style.display = 'none';

    // Update badge
    const newCount = messages.filter(m => m.status === 'new').length;
    const badge = $('#msgBadge');
    badge.textContent = newCount;
    badge.style.display = newCount > 0 ? 'inline-block' : 'none';
    $('#bellDot').style.display = newCount > 0 ? 'block' : 'none';
  }

  document.addEventListener('click', function (e) {
    // Read message
    const readBtn = e.target.closest('[data-read-msg]');
    if (readBtn) {
      const id = parseInt(readBtn.dataset.readMsg);
      const messages = getData('messages', []);
      const m = messages.find(x => x.id === id);
      if (!m) return;
      // Mark as read
      if (m.status === 'new') {
        m.status = 'read';
        setData('messages', messages);
        renderMessages();
      }
      // Show detail
      $('#msgDetailSubject').textContent = m.subject;
      $('#msgDetailFrom').textContent = m.firstName + ' ' + m.lastName + ' (' + m.email + ')';
      $('#msgDetailDate').textContent = m.date;
      $('#msgDetailBody').textContent = m.body;
      $('#msgDetail').style.display = 'block';
      $('#msgDetail').scrollIntoView({ behavior: 'smooth' });
    }
    // Mark read
    const markBtn = e.target.closest('[data-mark-msg]');
    if (markBtn) {
      const id = parseInt(markBtn.dataset.markMsg);
      const messages = getData('messages', []);
      const m = messages.find(x => x.id === id);
      if (m) {
        m.status = 'read';
        setData('messages', messages);
        renderMessages();
        toast('წაკითხულად მონიშნულია');
      }
    }
    // Delete
    const delBtn = e.target.closest('[data-delete-msg]');
    if (delBtn) {
      if (!confirm('ნამდვილად გსურთ წაშლა?')) return;
      const id = parseInt(delBtn.dataset.deleteMsg);
      let messages = getData('messages', []);
      messages = messages.filter(x => x.id !== id);
      setData('messages', messages);
      renderMessages();
      toast('შეტყობინება წაიშალა', 'danger');
    }
  });

  $('#msgDetailClose').addEventListener('click', function () {
    $('#msgDetail').style.display = 'none';
  });

  // ───────────────────────────────────────
  // PARTNERS
  // ───────────────────────────────────────
  function renderPartners() {
    const partners = getData('partners', []);
    const grid = $('#partnersGrid');
    grid.innerHTML = '';
    partners.forEach(function (p) {
      const card = document.createElement('div');
      card.className = 'partner-card';
      card.innerHTML =
        '<img class="partner-card__logo" src="' + esc(p.logo) + '" alt="" onerror="this.style.background=\'#eee\'">' +
        '<div class="partner-card__name">' + esc(p.name) + '</div>' +
        '<div class="partner-card__desc">' + esc(p.description) + '</div>' +
        '<div class="partner-card__actions">' +
          '<button class="btn btn--sm btn--outline" data-edit-partner="' + p.id + '">რედაქტირება</button>' +
          '<button class="btn btn--sm btn--danger" data-delete-partner="' + p.id + '">წაშლა</button>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  function partnerFormHTML(p) {
    p = p || {};
    return '' +
      '<div class="form-group"><label>სახელი *</label><input type="text" id="mPartName" value="' + esc(p.name || '') + '"></div>' +
      '<div class="form-group"><label>აღწერა</label><textarea id="mPartDesc" rows="2">' + esc(p.description || '') + '</textarea></div>' +
      imageFieldHTML('mPartLogo', p.logo) +
      '<button class="btn btn--primary btn--full" id="mPartSave">შენახვა</button>';
  }

  $('#addPartnerBtn').addEventListener('click', function () {
    openModal('პარტნიორის დამატება', partnerFormHTML());
    wireImageUpload('mPartLogo');
    $('#mPartSave').addEventListener('click', function () {
      const name = $('#mPartName').value.trim();
      if (!name) { $('#mPartName').classList.add('error'); return; }
      const partners = getData('partners', []);
      partners.push({
        id: nextId(partners),
        name: name,
        description: $('#mPartDesc').value.trim(),
        logo: $('#mPartLogo').value.trim() || 'https://via.placeholder.com/200'
      });
      setData('partners', partners);
      closeModal();
      renderPartners();
      toast('პარტნიორი დაემატა');
    });
  });

  document.addEventListener('click', function (e) {
    const editBtn = e.target.closest('[data-edit-partner]');
    if (editBtn) {
      const id = parseInt(editBtn.dataset.editPartner);
      const partners = getData('partners', []);
      const p = partners.find(x => x.id === id);
      if (!p) return;
      openModal('პარტნიორის რედაქტირება', partnerFormHTML(p));
      wireImageUpload('mPartLogo');
      $('#mPartSave').addEventListener('click', function () {
        const name = $('#mPartName').value.trim();
        if (!name) { $('#mPartName').classList.add('error'); return; }
        p.name = name;
        p.description = $('#mPartDesc').value.trim();
        p.logo = $('#mPartLogo').value.trim() || p.logo;
        setData('partners', partners);
        closeModal();
        renderPartners();
        toast('პარტნიორი განახლდა');
      });
    }
    const delBtn = e.target.closest('[data-delete-partner]');
    if (delBtn) {
      if (!confirm('ნამდვილად გსურთ წაშლა?')) return;
      const id = parseInt(delBtn.dataset.deletePartner);
      let partners = getData('partners', []);
      partners = partners.filter(x => x.id !== id);
      setData('partners', partners);
      renderPartners();
      toast('პარტნიორი წაიშალა', 'danger');
    }
  });

  // ───────────────────────────────────────
  // SETTINGS
  // ───────────────────────────────────────
  function renderSettings() {
    const s = getData('settings', DEFAULT_SETTINGS);
    const f = $('#settingsForm');
    f.siteTitle.value    = s.siteTitle || '';
    f.siteMeta.value     = s.siteMeta || '';
    f.siteEmail.value    = s.siteEmail || '';
    f.siteFB.value       = s.siteFB || '';
    f.siteIG.value       = s.siteIG || '';
    f.siteLI.value       = s.siteLI || '';
    f.hoursWeekday.value = s.hoursWeekday || '';
    f.hoursSat.value     = s.hoursSat || '';
    f.hoursSun.value     = s.hoursSun || '';
    f.siteMap.value      = s.siteMap || '';

    // Phones
    const phonesContainer = $('#settingsPhones');
    phonesContainer.innerHTML = '';
    const phones = s.phones || [];
    phones.forEach(function (ph, i) {
      addPhoneField(phonesContainer, ph, i);
    });
    if (phones.length === 0) addPhoneField(phonesContainer, '', 0);
  }

  function addPhoneField(container, value, index) {
    const div = document.createElement('div');
    div.className = 'dynamic-field';
    div.innerHTML =
      '<input type="text" name="phone_' + index + '" value="' + esc(value || '') + '" placeholder="+995 XXX XXX XXX">' +
      '<button type="button" class="btn--icon danger" data-remove-phone><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>';
    container.appendChild(div);
  }

  $('#addPhoneBtn').addEventListener('click', function () {
    const container = $('#settingsPhones');
    addPhoneField(container, '', container.children.length);
  });

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-remove-phone]');
    if (btn) {
      const field = btn.closest('.dynamic-field');
      if ($('#settingsPhones').children.length > 1) {
        field.remove();
      }
    }
  });

  $('#settingsForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const f = this;
    const phones = [];
    $$('#settingsPhones input').forEach(function (inp) {
      const v = inp.value.trim();
      if (v) phones.push(v);
    });
    setData('settings', {
      siteTitle:    f.siteTitle.value.trim(),
      siteMeta:     f.siteMeta.value.trim(),
      siteEmail:    f.siteEmail.value.trim(),
      phones:       phones,
      siteFB:       f.siteFB.value.trim(),
      siteIG:       f.siteIG.value.trim(),
      siteLI:       f.siteLI.value.trim(),
      hoursWeekday: f.hoursWeekday.value.trim(),
      hoursSat:     f.hoursSat.value.trim(),
      hoursSun:     f.hoursSun.value.trim(),
      siteMap:      f.siteMap.value.trim()
    });
    toast('პარამეტრები შენახულია');
  });

  // ───────────────────────────────────────
  // ESCAPE HELPER
  // ───────────────────────────────────────
  function esc(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ───────────────────────────────────────
  // INIT
  // ───────────────────────────────────────
  initData();
  if (checkAuth()) {
    renderPage('dashboard');
  }

})();
