# itransition-course-final-project-frontend

<https://itransition-course-final-project-front.onrender.com/>

User with admin rights
user2@user.com
123456789

Web portal for reviews "what should you read/watch/play/work, etc."

САЙТ ДЛЯ УПРАВЛЕНИЯ РЕКОМЕНДАЦИЯМИ "ЧЁ ПОСМОТРЕТЬ/ЧЁ ПОЧИТАТЬ/ВО ЧТО ПОИГРАТЬ/У КОГО ПОРАБОТАТЬ И Т.Д."

FRONTEND: TypeScript/JavaScript, Angular, Bootstrap.
BACKEND: Node.js, NestJS, MySQL.

Неаутентифицированным пользователи доступен только режим read-only (доступен поиск, недоступно создание обзоров, нельзя оставлять комментарии, ставить лайки и рейтинги).

Аутентифицированные пользователи имеют доступ ко всему, кроме админки. В базовом варианте админка представляет собой список пользователей (как ссылок на их страницы).

Требуется поддерживать аутентификацию через социальные сети (не менее двух любых).

Администратор видит каждую страницу пользователя и каждый "обзор" как ее создатель (например, может отредактировать или создать от имени пользователя с его страницы новый "обзор").

На каждой странице доступен полнотекстовый поиск по сайту (результаты поиска - всегда обозоры, например, если текст найден в комментарии, что должно быть возможно, то выводится ссылка на обзор).

У каждого пользователя есть его личная страница, на которой он видит список своих обзоров (таблица с фильтраций и сортировками, возможность создать/удалить/редактировать обзор/открыть в режиме просмотра).

Каждый обзор состоит из: названия обзора, названия произведения (см. также требования со \*), "группа" (из фиксированного набора, например, "Кино", "Книги", "Игры" и т.п.), тэгов (вводится несколько тэгов, необходимо автодополнение - когда пользователь начинает вводить тэг, выпадает список с вариантами слов, которые уже вводились ранее на сайте), текста обзора (с поддержкой форматирования markdown), опциональное изображение-иллюстрация (хранение в облаке) и оценки от автора по 10-б. шкале.

Все картинки сохраняются в облаке, загружаются драг-н-дропом.

На главной странице отображаются: последние добавленные обзоры, обзоры с самыми большими оценками, облако тэгов.

Каждый пользовать может проставить "рейтинг" (1..5 звезд) произведению (не более одного от одного пользователя на один обзор) — средний пользовательский рейтинг отображается рядом с названием обзора везде на сайте.

Также пользователь может поставить лайк собственно самому обзору (не более 1 на обзор от 1 пользователя), эти лайки складываются по всем обзорам пользователя и отображаются рядом с именем пользователя.

Если два пользователя описывают одно кино, это никак не связано между собой (см. требования со звездочкой).

Под обзором в режиме просмотра (или другими пользователями) в конце отображаются комментарии. Комментарии линейные, нельзя комментировать комментарий, новый добавляется только "в хвост". Автоматическая подгрузка комментариев — если у меня открыта страница с комментариями и кто-то другой добавляет новый, он автомагически появляется (возможна задержка в 2-5 секунд).

Сайт должен поддерживать не менее двух языков UI: английский и другой (польский, русский, грузинский, узбекский, др.) (пользователь выбирает и выбор сохраняется). Содержимое, обзоры и комментарии, не переводятся. Сайт должен поддерживать два оформления (темы): светлое и темное (пользователь выбирает и выбор сохраняется).

Обязательно: Bootstrap (или любой другой CSS-фреймворк), поддержка разных разрешений (в том числе телефон), ORM/ODM для доступа к данным, движок для полнотекстового поиск (или средствами базы, или отдельный движок — НЕ ПОЛНОЕ СКАНИРОВАНИЕ селектами).

Требования со звездочкой (лишь опционально, на 10/10, после реализации остальных требований):

- Продвинутая админка, которая позволяет позволяет управлять пользователями (просматривать, блокировать, удалять, назначать других админами).

- Возможность загрузки произвольного числа иллюстраций для обзора и поддержка галереи для просмотра.

- Экспорт обзоров с картинками в PDF.

- Возможность "связывать" разные обзоры на одно произведение от разных пользователей (показывать с одного ссылки на остальные) и считать средний рейтинг. Для этого использовать отдельную сущность "произведение" и связывать обзоры с произведением (при создании обзора или выбирать существующее произведение или создавать новое).

Вы должны использовать готовые компоненты, библиотеки, контролы. Например, контрол для рендеринга маркдауна или для загрузки картинки при помощи drag-n-drop или рендеринга облака тегов, etc.
