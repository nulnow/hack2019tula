## http://doc-constructor.site/

📄 Конструктор для документов, на основе готового шаблона, который поможет врачу сократить время на заполенение разных форм и справок, позволяя таким образом, уделить больше времени пациенту

![](http://doc-constructor.site/storage/NBqG6Azxc1.jpg)

Документация:

**Frontend**

основные технологии:
- React, React Router 🌀
- Scss, bootstrap 😜
- laravel-mix (✨обёртка над вебпаком ✨)

> resurces/js/app.js - Точка входа для вебпака

------------
> resources/js/components - Папка с компонентами


------------

Основные компоненты:

*MedConstructor.js* - роутер, навигация
*AddDocumentTypeForm.js* - компонент, добавляющий типы документов
*AddDocumentForm.js* - компонент, генерирующий документы на основе типов
*App.js* - grid всех созданных документов, кнопки "печать"

**Backend**

основные технологии:
- PHP, laravel 🐱‍🏍 (mvc web framework)
- MySQL 🐬

Views
- resuoces/views
	- react.blade.php - отдается на всех страницах, рендрится реактом

Страницы
- /add-document-type Страница добавления типа документа
- /add-document Страница добавления документа
- /my-documents Просмотрщик созданных документов

**Web API**

> app/http/controllers/API.php

|  Метод  |  Роут  |  Описание  |
| ------------ | ------------ | ------------ |
| get  | /documents | список всех документов  |
| post  |  /documents  |  добавление документа  |
|  get  |   /doctypes  |  список всех типов документов  |
|  post  |  /doctypes  |  добавление типа  |
|  post  |  /upload-file  |  загрузка документа  |