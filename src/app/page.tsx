'use client'
import { useEffect, useState } from "react";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  const questions = [
    {
      questionText: 'Справочник "Грифы доступа" служит для:',
      answerOptions: [
        { answerText: 'ограничения прав доступа пользователей к документам', isCorrect: false },
        { answerText: 'ограничения прав доступа пользователей к документам и их файлам', isCorrect: true },
        { answerText: 'ограничения прав доступа пользователей к документам определенных видов и их файлам', isCorrect: false },
      ],
    },
    {
      questionText: 'Шаблоны файлов предназначены для:',
      answerOptions: [
        { answerText: 'того, чтобы облегчить пользователям ввод новых документов', isCorrect: false },
        { answerText: 'того, чтобы унифицировать бланки в организации, на основании которых создаются документы', isCorrect: false },
        { answerText: 'верные ответы 1 и 2', isCorrect: true },
      ],
    },
    {
      questionText: 'Роли исполнителей:',
      answerOptions: [
        { answerText: 'предназначены для ролевой адресации процессов и задач', isCorrect: true },
        { answerText: 'нужны для разграничения прав доступа по ролям', isCorrect: false },
        { answerText: 'нужны для создания профилей доступа', isCorrect: false },
      ],
    },
    {
      questionText: 'В списке "Исполнители ролей" содержится актуальная (текущая) информация о соответствии пользователей:',
      answerOptions: [
        { answerText: 'выполняемым задачам', isCorrect: false },
        { answerText: 'ролям и объектам адресации', isCorrect: true },
        { answerText: 'бизнес - процессам', isCorrect: false },
        { answerText: 'верные ответы 1 и 3', isCorrect: false },
      ],
    },
    {
      questionText: 'Происходит ли автоматический перенос файлов из информационной базы в тома и обратно при изменении параметра "Тип хранения файлов"?',
      answerOptions: [
        { answerText: 'нет', isCorrect: true },
        { answerText: 'да', isCorrect: false },
      ],
    },
    {
      questionText: 'Является ли реквизит "Руководитель" справочника "Структура предприятия" обязательным для заполнения?',
      answerOptions: [
        { answerText: 'да', isCorrect: true },
        { answerText: 'нет', isCorrect: false },
      ],
    },
    {
      questionText: 'Можно ли разграничить права доступа на уровне папок документов?',
      answerOptions: [
        { answerText: 'да', isCorrect: true },
        { answerText: 'нет', isCorrect: false },
      ],
    },
    {
      questionText: 'Автозаполнение файлов осуществляется:',
      answerOptions: [
        { answerText: 'интерактивно командой "Правила автозаполнения шаблонов файлов"', isCorrect: false },
        { answerText: 'автоматически сразу после сохранения файла в системе', isCorrect: false },
        { answerText: 'интерактивно командой "Заполнить файл данными документа"', isCorrect: false },
        { answerText: 'верны ответы 1 и 3', isCorrect: false },
        { answerText: 'верны ответы 2 и 3', isCorrect: true },
        { answerText: 'верны ответы 1, 2 и 3', isCorrect: false },
      ],
    },
    {
      questionText: 'Является ли обязательным для заполнения реквизит "Вопрос деятельности", если в настройках программы включен учет по вопросам деятельности?',
      answerOptions: [
        { answerText: 'да', isCorrect: true },
        { answerText: 'нет', isCorrect: false },
      ],
    },
    {
      questionText: 'Сформированные отчеты могут рассылаться в формате:',
      answerOptions: [
        { answerText: 'HTML', isCorrect: false },
        { answerText: 'Microsoft Excel, Microsoft Word', isCorrect: false },
        { answerText: 'табличных документов 1С', isCorrect: false },
        { answerText: 'PDF', isCorrect: false },
        { answerText: 'верны варианты 1, 2, 3 и 4', isCorrect: true },
      ],
    },
    {
      questionText: 'Если файл занят для редактирования текущим пользователем, то он выделяются в списке:',
      answerOptions: [
        { answerText: 'красным цветом', isCorrect: false },
        { answerText: 'зеленым цветом', isCorrect: true },
        { answerText: 'серым цветом', isCorrect: false },
      ],
    },
    {
      questionText: 'Если файл занят для редактирования другим пользователем, то он выделяются в списке:',
      answerOptions: [
        { answerText: 'красным цветом', isCorrect: false },
        { answerText: 'зеленым цветом', isCorrect: false },
        { answerText: 'серым цветом', isCorrect: true },
      ],
    },
    {
      questionText: 'Справочник "Виды работ" предназначен для:',
      answerOptions: [
        { answerText: 'аналитического учета работ', isCorrect: false },
        { answerText: 'классификации работ пользователей по необходимым разрезам в разделе учета рабочего времени', isCorrect: true },
        { answerText: 'расчета заработной платы', isCorrect: false },
        { answerText: 'верны ответы 1 и 2', isCorrect: false },
      ],
    },
    {
      questionText: 'Команда для работы с файлами "Занять":',
      answerOptions: [
        { answerText: 'помечает файл в хранилище как занятый текущим пользователем для редактирования, но не открывает внешнее приложение. Приступить непосредственно к редактированию можно будет позже', isCorrect: true },
        { answerText: 'помечает файл как занятый для редактирования и открывает его внешним приложением', isCorrect: false },
        { answerText: 'сохраняет версию редактируемого файла в хранилище, но оставляет его занятым текущим пользователем для редактирования', isCorrect: false },
      ],
    },
    {
      questionText: 'Хранение каких форматов файлов поддерживает система?',
      answerOptions: [
        { answerText: 'любых текстовых', isCorrect: false },
        { answerText: 'любых текстовых и графических', isCorrect: false },
        { answerText: 'любых, ограничений нет', isCorrect: true },
        { answerText: 'только тех, для которых установлено соответствующее приложение', isCorrect: false },
      ],
    },
    {
      questionText: 'Настройка Протокольное мероприятие у вида мероприятия определяет видимость:',
      answerOptions: [
        { answerText: 'закладки Протокол', isCorrect: false },
        { answerText: 'реквизитов для ввода председателя и секретаря', isCorrect: false },
        { answerText: 'верны варианты 1 и 2', isCorrect: true },
      ],
    },
    {
      questionText: 'В действиях закладки "Обработка" изменение порядка доступно:',
      answerOptions: [
        { answerText: 'Только на этапах согласования', isCorrect: false },
        { answerText: 'Можно управлять порядком согласования и подписания для всех типов действий', isCorrect: true },
        { answerText: 'В разрезе каждого исполнителя действия', isCorrect: false },
      ],
    },
    {
      questionText: 'Действие "Рассмотрение" используется для:',
      answerOptions: [
        { answerText: 'ознакомления пользователей с входящими, исходящими, внутренними документами и файлами', isCorrect: false },
        { answerText: 'выдачи поручения одному пользователю (персонально или через роль) и последующей проверки результатов исполнения поручения проверяющим', isCorrect: false },
        { answerText: 'отправки входящих или внутренних документов на исполнение одному или нескольким сотрудникам', isCorrect: false },
        { answerText: 'передачи входящего или внутреннего документа на рассмотрение ответственному лицу или роли', isCorrect: true },
      ],
    },
    {
      questionText: 'Действие "Регистрация" используется для:',
      answerOptions: [
        { answerText: 'Для создания нового документа в системе', isCorrect: false },
        { answerText: 'Для подготовки документа к отправке по ЭДО', isCorrect: false },
        { answerText: 'Для присвоения регистрационного номера документу', isCorrect: true },
        { answerText: 'Для последовательного присвоения временного номера и регистрационного для документа', isCorrect: false },
      ],
    },
    {
      questionText: 'Чтобы посмотреть все задачи по документу нужно:',
      answerOptions: [
        { answerText: 'в карточке задачи выполнить команду Подробнее о задаче в списке команд', isCorrect: false },
        { answerText: 'в карточке документа перейти в раздел Процессы и задачи', isCorrect: true },
        { answerText: 'верны варианты 1 и 2', isCorrect: false },
      ],
    },
    {
      questionText: 'Подзадачи по действиям закладки обработка отображаются:',
      answerOptions: [
        { answerText: 'Под действием из которого они сформированы в специальной группе "Подзадачи"', isCorrect: true },
        { answerText: 'В отдельной форме, доступной по гиперссылке', isCorrect: false },
        { answerText: 'В виде количества в отдельном столбце', isCorrect: false },
      ],
    },
    {
      questionText: 'В настройках обработки документов, ограничения на срок исполнения задачи могут быть:',
      answerOptions: [
        { answerText: 'Настроены в днях с момента старта процесса по документу', isCorrect: false },
        { answerText: 'Настроены в днях с момента поступления задачи исполнителю', isCorrect: false },
        { answerText: 'Настроены в минутах с момента поступления задачи исполнителю', isCorrect: false },
        { answerText: 'Настроены в часах с момента поступления задачи исполнителю', isCorrect: false },
        { answerText: 'Верны 1, 2 и 4', isCorrect: false },
        { answerText: 'Верны 2, 3 и 4', isCorrect: true },
      ],
    },
    {
      questionText: 'При формировании обработки для нового документа, система при заполнении действий обработки может:',
      answerOptions: [
        { answerText: 'Определять участников - При заполнении обработки', isCorrect: false },
        { answerText: 'Определять участников - При запуске в обработку', isCorrect: false },
        { answerText: 'Определять участников - Перед началом выполнения действия', isCorrect: false },
        { answerText: 'Определять участников – Во время выполнения действия', isCorrect: false },
        { answerText: 'Верны 1, 2 и 3', isCorrect: true },
        { answerText: 'Верны 1, 2 и 4', isCorrect: false },
      ],
    },
    {
      questionText: 'Какие виды задач может запустить сотрудник без привязки к документу?',
      answerOptions: [
        { answerText: 'Только поручение', isCorrect: false },
        { answerText: 'Поручение или Ознакомление', isCorrect: true },
        { answerText: 'Любые виды задач', isCorrect: false },
        { answerText: 'Поручение или Согласование', isCorrect: false },
      ],
    },
    {
      questionText: 'С помощью какой настройки можно ограничить выбор директора компании в качестве согласующего?',
      answerOptions: [
        { answerText: 'Настройки доступности по состоянию', isCorrect: false },
        { answerText: 'Правила эскалации', isCorrect: false },
        { answerText: 'Правила коммуникаций', isCorrect: true },
      ],
    },
    {
      questionText: 'Нумератор можно определить для',
      answerOptions: [
        { answerText: 'каждого документа', isCorrect: false },
        { answerText: 'каждого вида документа', isCorrect: true },
        { answerText: 'каждого типа документа', isCorrect: false },
        { answerText: 'каждого тома номенклатуры дел', isCorrect: false },
      ],
    },
    {
      questionText: 'После регистрации документ:',
      answerOptions: [
        { answerText: 'становится частично недоступным для редактирования', isCorrect: false },
        { answerText: 'можно редактировать только, если перевести его в состояние "Проект" или "На регистрации"', isCorrect: false },
        { answerText: 'можно редактировать, только обладая полными правами', isCorrect: false },
        { answerText: 'верны ответы 1, 2 и 3', isCorrect: true },
      ],
    },
    {
      questionText: 'Есть ли возможность указать сразу несколько резолюций в карточке документа?',
      answerOptions: [
        { answerText: 'да', isCorrect: true },
        { answerText: 'нет', isCorrect: false },
        { answerText: 'да, если включена соответствующая настройка', isCorrect: false },
      ],
    },
    {
      questionText: 'Добавить сотрудника на доступ к документу возможно с помощью:',
      answerOptions: [
        { answerText: 'Ручного расширения группы доступа', isCorrect: false },
        { answerText: 'Направления сотруднику подзадачи по документу, через кнопку Отправить', isCorrect: false },
        { answerText: 'Групповой обработки "ИзменениеСписковДоступаОбъектов"', isCorrect: false },
        { answerText: 'Заполнения сотрудника в реквизит карточки документа (Например: Ответственный)', isCorrect: false },
        { answerText: 'Верны все вышеперечисленные', isCorrect: true },
      ],
    },
    {
      questionText: 'У входящего документа можно указать',
      answerOptions: [
        { answerText: 'только одного адресата', isCorrect: true },
        { answerText: 'двух адресатов', isCorrect: false },
        { answerText: 'трех адресатов', isCorrect: false },
        { answerText: 'несколько адресатов', isCorrect: false },
      ],
    },
    {
      questionText: 'При создании сообщения в обсуждении можно:',
      answerOptions: [
        { answerText: 'цитировать исходное сообщение', isCorrect: false },
        { answerText: 'добавить файл(-ы) к сообщению', isCorrect: false },
        { answerText: 'создать на основании сообщения процесс', isCorrect: false },
        { answerText: 'верны варианты 1 и 2', isCorrect: false },
        { answerText: 'верны варианты 1, 2 и 3', isCorrect: true },
      ],
    },
    {
      questionText: 'В списке обсуждений можно выполнить действие:',
      answerOptions: [
        { answerText: 'пометить все темы и сообщения как прочтенные', isCorrect: false },
        { answerText: 'пометить все темы и сообщения как НЕ прочтенные', isCorrect: false },
        { answerText: 'пометить все сообщения ТЕМЫ как прочтенные', isCorrect: true },
        { answerText: 'верны варианты 1 и 2', isCorrect: false },
        { answerText: 'верны варианты 1, 2 и 3', isCorrect: false },
      ],
    },
    {
      questionText: 'При ведении учета по папкам, учетная карточка документа может:',
      answerOptions: [
        { answerText: 'Может не принадлежать ни одной из папок (находиться в корне дерева папок)', isCorrect: false },
        { answerText: 'Может находиться только в одной папке', isCorrect: true },
        { answerText: 'Может одновременно находиться в нескольких папках', isCorrect: false },
      ],
    },
    {
      questionText: 'Может ли пользователь настроить список дополнительных реквизитов по виду документа?',
      answerOptions: [
        { answerText: 'да', isCorrect: true },
        { answerText: 'нет', isCorrect: false },
        { answerText: 'дополнительные реквизиты по виду внутреннего документа могут быть настроены только в конфигураторе программистом', isCorrect: false },
      ],
    },
    {
      questionText: 'Может ли пользователь самостоятельно добавить в систему новый способ доставки корреспонденции?',
      answerOptions: [
        { answerText: 'Да', isCorrect: false },
        { answerText: 'Нет', isCorrect: false },
        { answerText: 'Может добавить только администратор системы', isCorrect: true },
      ],
    },
    {
      questionText: 'На основании документа можно создавать:',
      answerOptions: [
        { answerText: 'Любой другой документ системы', isCorrect: false },
        { answerText: 'Мероприятие и Запись календаря', isCorrect: false },
        { answerText: 'Запись журнала передачи', isCorrect: false },
        { answerText: 'Любой другой документ системы, если для них настроена подходящая связь', isCorrect: false },
        { answerText: 'Верны варианты 1, 2 и 3', isCorrect: false },
        { answerText: 'Верны варианты 2, 3 и 4', isCorrect: true },
      ],
    },
    {
      questionText: 'В системе есть возможность вести согласованную нумерацию связанных документов:',
      answerOptions: [
        { answerText: 'для видов документов "Договор" и "Дополнительное соглашение"', isCorrect: false },
        { answerText: 'для любых видов внутренних документов', isCorrect: false },
        { answerText: 'для любых видов входящих и исходящих документов', isCorrect: false },
        { answerText: 'согласованная нумерация полностью зависит от настроек нумератора', isCorrect: false },
        { answerText: 'верны варианты 2 и 3', isCorrect: true },
      ],
    },
    {
      questionText: 'Где в карточке документа одновременно можно увидеть: Текст резолюций, визы согласования с комментариями и лист подписания?',
      answerOptions: [
        { answerText: 'Только на закладке Обзор', isCorrect: true },
        { answerText: 'Только на закладке Обработка', isCorrect: false },
        { answerText: 'На закладке Реквизиты в поле Состояние документа', isCorrect: false },
      ],
    },
    {
      questionText: 'При работе с документом для учета рабочего времени можно:',
      answerOptions: [
        { answerText: 'воспользоваться командами "Включить хронометраж" и "Указать трудозатраты"', isCorrect: true },
        { answerText: 'выполнить команду "Создать на основании" для создания документа "Ежедневный отчет"', isCorrect: false },
        { answerText: 'связь внутренних документов и Ежедневных отчетов, в которых ведется учет рабочего времени не предусмотрена', isCorrect: false },
      ],
    },
    {
      questionText: 'Для настройки ограничений доступа по грифу необходимо:',
      answerOptions: [
        { answerText: 'В карточке сотрудника отметить все грифы, которые ему доступны', isCorrect: false },
        { answerText: 'В настройке вида документа заполнить табличную часть "Доступ по грифам"', isCorrect: false },
        { answerText: 'В карточке элемента справочника "Грифы доступа", заполнить список сотрудников, которым будет доступен этот гриф', isCorrect: true },
      ],
    },
    {
      questionText: 'При создании нового сотрудника в системе, в какие стандартные рабочие группы он попадает?',
      answerOptions: [
        { answerText: 'Все сотрудники', isCorrect: true },
        { answerText: 'Все пользователи', isCorrect: false },
        { answerText: 'Физические лица организаций', isCorrect: false },
        { answerText: 'Верны все вышеперечисленные', isCorrect: false },
      ],
    },
    {
      questionText: 'Журнал передачи документов служит',
      answerOptions: [
        { answerText: 'для ознакомления пользователей с новыми документами', isCorrect: false },
        { answerText: 'для передачи бумажных версий документов между пользователями', isCorrect: false },
        { answerText: 'для учета в программе фактов выдачи и возврата бумажных версий документов пользователям', isCorrect: true },
      ],
    },
    {
      questionText: 'Если дата начала дела не заполнена, то',
      answerOptions: [
        { answerText: 'она автоматически заполнится датой первого документа, отнесенного к этому делу (тому)', isCorrect: true },
        { answerText: 'она автоматически заполнится датой начала периода', isCorrect: false },
        { answerText: 'система выдаст предупреждение', isCorrect: false },
      ],
    },
    {
      questionText: 'Может ли пользователь осуществлять поиск документа по внешнему штрихкоду?',
      answerOptions: [
        { answerText: 'да', isCorrect: true },
        { answerText: 'нет', isCorrect: false },
      ],
    },
    {
      questionText: 'Чтобы сформировать номенклатуру дел на следующий год нужно:',
      answerOptions: [
        { answerText: 'выполнить копирование требуемых разделов и заголовков из номенклатуры дел прошлых годов', isCorrect: false },
        { answerText: 'выполнить команду "Скопировать номенклатуру дел"', isCorrect: false },
        { answerText: 'выполнить команду "Заполнить разделы по структуре предприятия"', isCorrect: false },
        { answerText: 'верны варианты 1 и 2', isCorrect: true },
        { answerText: 'верны варианты 2 и 3', isCorrect: false },
      ],
    },
    {
      questionText: 'Документ может быть передан:',
      answerOptions: [
        { answerText: 'пользователю', isCorrect: false },
        { answerText: 'контрагенту', isCorrect: false },
        { answerText: 'контактному лицу контрагента', isCorrect: false },
        { answerText: 'верны варианты 1 и 3', isCorrect: true },
        { answerText: 'верны варианты 1, 2 и 3', isCorrect: false },
      ],
    },
    {
      questionText: 'Для заполнения документа "Уничтожение дел" необходимо:',
      answerOptions: [
        { answerText: 'вручную заполнить дела в табличную часть', isCorrect: false },
        { answerText: 'выполнить команду "Заполнить"', isCorrect: false },
        { answerText: 'воспользоваться формой подбора дел', isCorrect: false },
        { answerText: 'верны варианты 1 и 3', isCorrect: false },
        { answerText: 'верны варианты 1, 2 и 3', isCorrect: true },
      ],
    },
    {
      questionText: 'Если связь множественная, то',
      answerOptions: [
        { answerText: 'можно указать несколько связей с другими документами', isCorrect: true },
        { answerText: 'указание только одной связи на другой документ', isCorrect: false },
        { answerText: 'верны ответы 1 и 2', isCorrect: false },
      ],
    },
    {
      questionText: 'Пользователь может добавить к документу:',
      answerOptions: [
        { answerText: 'еще одни внутренний штрихкод', isCorrect: false },
        { answerText: 'еще один внешний штрихкод', isCorrect: false },
        { answerText: 'один или несколько внешних штрихкодов', isCorrect: true },
      ],
    },
    {
      questionText: 'При создании категории можно:',
      answerOptions: [
        { answerText: 'указать список пользователей, которые будут видеть данную категорию в дереве категорий', isCorrect: false },
        { answerText: 'указать список групп пользователей, которые будут видеть данную категорию в дереве категорий', isCorrect: false },
        { answerText: 'указать список ролей, исполнители которых будут видеть данную категорию в дереве категорий', isCorrect: false },
        { answerText: 'верны варианты 1 и 2', isCorrect: true },
        { answerText: 'верны варианты 1, 2 и 3', isCorrect: false },
      ],
    },
    {
      questionText: 'Один объект данных может быть отнесен:',
      answerOptions: [
        { answerText: 'к нескольким разным категориям', isCorrect: true },
        { answerText: 'только к одной категории', isCorrect: false },
        { answerText: 'к одной персональной категории и многим общим категориям', isCorrect: false },
      ],
    },
    {
      questionText: 'Прервать обработку по документу могут:',
      answerOptions: [
        { answerText: 'Подготовивший и его руководитель', isCorrect: false },
        { answerText: 'Сотрудники с ролью Прерывание обработки', isCorrect: false },
        { answerText: 'Помощник или заместитель автора документа', isCorrect: false },
        { answerText: 'Верны варианты 1 и 2', isCorrect: false },
        { answerText: 'Верны 1, 2 и 3', isCorrect: true },
      ],
    },
    {
      questionText: 'Если в обработке документа, которому присвоен гриф доступа с ограничениями прав, попали сотрудники, которые не имеют доступа к данному грифу, то система:',
      answerOptions: [
        { answerText: 'Не позволит сохранить такой документ', isCorrect: false },
        { answerText: 'Не позволит запустить обработку по такому документу', isCorrect: true },
        { answerText: 'Автоматически удалит сотрудника из обработки, после старта процесса', isCorrect: false },
      ],
    },
    {
      questionText: 'В чем отличие рукописной подписи от усиленной электронной подписи?',
      answerOptions: [
        { answerText: 'электронную подпись можно подделать, а рукописную подпись нельзя', isCorrect: false },
        { answerText: 'с помощью электронной подписи можно определить реальное время подписания документа в отличие от рукописной подписи', isCorrect: true },
        { answerText: 'в рукописной подписи содержится метка времени, а в электронной подписи не содержится', isCorrect: false },
        { answerText: 'рукописную подпись можно удостоверить в отличие от электронной подписи', isCorrect: false },
      ],
    },
    {
      questionText: 'Для массового изменения групп доступа в документах служит:',
      answerOptions: [
        { answerText: 'Механизм почтовой рассылки ссылок на доступ', isCorrect: false },
        { answerText: 'Встроенная обработка "Изменение списков доступа объектов"', isCorrect: true },
        { answerText: 'Доступ к документу можно предоставить, только направив задачу сотруднику', isCorrect: false },
      ],
    },
    {
      questionText: 'При выполнении задачи отметка принятия к исполнению',
      answerOptions: [
        { answerText: 'устанавливается автоматически', isCorrect: false },
        { answerText: 'не устанавливается', isCorrect: true },
        { answerText: 'не устанавливается, система выдает предупреждение, чтобы пользователь перед выполнением задачи сначала принял ее к исполнению', isCorrect: false },
      ],
    },
    {
      questionText: 'После включения учета по проектам появляется реквизит "Проект":',
      answerOptions: [
        { answerText: 'в карточках документов', isCorrect: false },
        { answerText: 'файлах и мероприятиях', isCorrect: false },
        { answerText: 'в действиях и задачах', isCorrect: false },
        { answerText: 'верны варианты 1 и 2', isCorrect: false },
        { answerText: 'верны варианты 1, 2 и 3', isCorrect: true },
      ],
    },
    {
      questionText: 'Трудозатраты исполнителей на проект:',
      answerOptions: [
        { answerText: 'можно списывать в целом, если установить признак "Разрешить списание трудозатрат на проект в целом"', isCorrect: true },
        { answerText: 'всегда можно отнести как на проект, так и на проектные задачи', isCorrect: false },
        { answerText: 'можно отнести только на проектные задачи', isCorrect: false },
      ],
    },
    {
      questionText: 'Отрезки диаграммы Ганта выводятся разными цветами для индикации:',
      answerOptions: [
        { answerText: 'текущего состояния выполнения задачи', isCorrect: false },
        { answerText: 'текущего состояния выполнения задачи и просроченности ее выполнения', isCorrect: false },
        { answerText: 'текущего состояния выполнения задачи и сочетания просроченности дат начала и окончания задачи', isCorrect: true },
      ],
    },
    {
      questionText: 'При установке флага "Является договором" нет возможности влиять на флаги:',
      answerOptions: [
        { answerText: 'вести учет по корреспондентам', isCorrect: false },
        { answerText: 'учитывать срок действия', isCorrect: false },
        { answerText: 'внутренней описи', isCorrect: false },
        { answerText: 'верны варианты 1 и 2', isCorrect: true },
        { answerText: 'верны варианты 1, 2 и 3', isCorrect: false },
      ],
    },
    {
      questionText: 'В программе для автоматизации работы с договорами предусмотрено:',
      answerOptions: [
        { answerText: 'продление', isCorrect: false },
        { answerText: 'контроль переданных экземпляров', isCorrect: false },
        { answerText: 'автозаполнение шаблонов файлов', isCorrect: false },
        { answerText: 'верны варианты 1 и 3', isCorrect: false },
        { answerText: 'верны варианты 1, 2 и 3', isCorrect: true },
      ],
    },
    {
      questionText: 'Если в процессе согласования не требуется формирование виз, какую настройку необходимо изменить?',
      answerOptions: [
        { answerText: 'В настройке действия "Согласовать" выключить настройку "Разрешить участникам менять предмет"', isCorrect: false },
        { answerText: 'В настройке вида документа, выключить настройку "Формировать визы согласования"', isCorrect: false },
        { answerText: 'В настройке правил обработки документа, на этапе согласования выключить настройку "Формировать визы согласования"', isCorrect: true },
      ],
    },
    {
      questionText: 'Чем в системе отличается замещающий от помощника?',
      answerOptions: [
        { answerText: 'Замещающий может исполнять задачи за руководителя, а помощник только наблюдать', isCorrect: false },
        { answerText: 'Замещающий исполняет задачи руководителя от своего имени, а помощник от имени руководителя', isCorrect: true },
        { answerText: 'Ничем', isCorrect: false },
      ],
    },
    {
      questionText: 'Какие типы нумераторов, доступные для настройки, существуют в системе?',
      answerOptions: [
        { answerText: 'Регистрационный нумератор; Договорной нумератор', isCorrect: false },
        { answerText: 'Только регистрационный нумератор', isCorrect: false },
        { answerText: 'Регистрационный нумератор; Для Временных номеров', isCorrect: true },
      ],
    },
    {
      questionText: 'Какая настройка в связях отвечает за отображение связи в карточке документа в виде гиперссылки (связь первого уровня)?',
      answerOptions: [
        { answerText: 'Обязательная', isCorrect: false },
        { answerText: 'Обратная', isCorrect: false },
        { answerText: 'Важная', isCorrect: true },
        { answerText: 'Единичная', isCorrect: false },
      ],
    },
    {
      questionText: 'В реестре документов возможно:',
      answerOptions: [
        { answerText: 'Установить отбор только по одному из полей карточки (например, либо по виду документа, либо по организации)', isCorrect: false },
        { answerText: 'Установить отбор сразу по нескольким полям карточки (например, сразу по виду документа, по дате, по организации)', isCorrect: true },
        { answerText: 'Запретить пользоваться отборами', isCorrect: false },
      ],
    },
    {
      questionText: 'При подготовке Исполнения по пунктам, текст поручений может вноситься:',
      answerOptions: [
        { answerText: 'Вручную в каждый пункт отдельно', isCorrect: false },
        { answerText: 'С помощью специальной команды "Взять из файла"', isCorrect: false },
        { answerText: 'Автоматически из шаблона документа', isCorrect: false },
        { answerText: 'Верны 1 и 3', isCorrect: false },
        { answerText: 'Верны 1 и 2', isCorrect: true },
      ],
    },
    {
      questionText: 'При прерывании обработки документа на закладке "Обработка" отображается информация:',
      answerOptions: [
        { answerText: 'Дате и времени прерывания обработки', isCorrect: false },
        { answerText: 'Причине прерывания обработки', isCorrect: false },
        { answerText: 'Пользователе системы, который прервал обработку', isCorrect: false },
        { answerText: 'Сотруднике, который прервал обработку', isCorrect: false },
        { answerText: 'Верны 1, 2 и 4', isCorrect: true },
        { answerText: 'Верны 1 и 4', isCorrect: false },
      ],
    },
    {
      questionText: 'В карточке вида действия доступны следующие настройки:',
      answerOptions: [
        { answerText: 'Выбор типа действия; Наименование действия; Выбор настройки видимости действия; Настройка наименования и описания задач', isCorrect: true },
        { answerText: 'Выбор типа действия; Настройка наименования и описания задач; Выбор настройки видимости действия; Выбор исполнителя действия; Выбор срока исполнения', isCorrect: false },
        { answerText: 'Выбор типа действия; Наименование действия', isCorrect: false },
      ],
    },
    {
      questionText: 'При начале выполнения задачи отметка Взять в работу',
      answerOptions: [
        { answerText: 'устанавливается автоматически, при открытии задачи', isCorrect: true },
        { answerText: 'не устанавливается', isCorrect: false },
        { answerText: 'устанавливается вручную', isCorrect: false },
        { answerText: 'устанавливается автоматически при постановке подзадач', isCorrect: false },
        { answerText: 'Верны 3 и 4', isCorrect: false },
        { answerText: 'Верны 1 и 3', isCorrect: false },
      ],
    },
    {
      questionText: 'После заполнения реквизитов Машиночитаемой доверенности ее необходимо?',
      answerOptions: [
        { answerText: 'Подписать доверенность ЭП доверителя и отправить на регистрацию в реестр ФНС', isCorrect: true },
        { answerText: 'Только сохранить в системе', isCorrect: false },
        { answerText: 'Сохранить и разослать заинтересованным по электронной почте', isCorrect: false },
      ],
    },
    {
      questionText: 'Интеграция с 1С: Кабинет сотрудника позволяет:',
      answerOptions: [
        { answerText: 'Ознакомиться под роспись с документом в личном кабинете 1С:Кабинета сотрудника, созданными в 1С:Документообороте', isCorrect: true },
        { answerText: 'Редактировать персональную информацию в личном кабинете 1С:Кабинета сотрудника и она изменится на стороне 1С:Документооборот', isCorrect: false },
        { answerText: 'Создавать новые документы в личном кабинете 1С:Кабинета сотрудника и они уйдут на обработку в 1С:Документооборот', isCorrect: false },
        { answerText: 'Верны 1 и 2', isCorrect: false },
        { answerText: 'Верны 1 и 3', isCorrect: false },
      ],
    },
    {
      questionText: 'В каких процессах можно использовать подписание ЭП?',
      answerOptions: [
        { answerText: 'Согласование', isCorrect: false },
        { answerText: 'Подписание', isCorrect: false },
        { answerText: 'Рассмотрение', isCorrect: false },
        { answerText: 'Верны ответы 1 и 2', isCorrect: false },
        { answerText: 'Верны ответы 1, 2 и 3', isCorrect: true },
      ],
    },
    {
      questionText: 'Можно ли к карточке документа загрузить с диска файл электронной подписи (с целью подписать документ)?',
      answerOptions: [
        { answerText: 'Да', isCorrect: false },
        { answerText: 'Нет', isCorrect: true },
      ],
    },
    {
      questionText: 'При подписании документа',
      answerOptions: [
        { answerText: 'подписываются все файлы документа, а также сама карточка документа (наименование и содержание)', isCorrect: true },
        { answerText: 'подписываются все файлы документа, а также сама карточка документа (все реквизиты)', isCorrect: false },
        { answerText: 'подписываются только файлы документа', isCorrect: false },
        { answerText: 'подписывается только карточка документа (наименование и содержание)', isCorrect: false },
        { answerText: 'подписывается только карточка документа (все реквизиты)', isCorrect: false },
      ],
    },
    {
      questionText: 'При постановке на контроль объекта системы, в контрольной карточке указывают:',
      answerOptions: [
        { answerText: 'Количество промежуточных проверок, срок контроля, контролера и контролируемого', isCorrect: false },
        { answerText: 'Объект контроля, срок контроля, кого контролировать, кто выступает контролером', isCorrect: true },
        { answerText: 'Контролера, срок контроля, объект контроля, проверяющего результат исполнения, срок проверки', isCorrect: false },
      ],
    },
    {
      questionText: 'Проверяющий в системе - Это:',
      answerOptions: [
        { answerText: 'Сотрудник, который может проверить и принять результат работы исполнителя', isCorrect: true },
        { answerText: 'Администратор системы, который проверяет, что исполнитель не закрыл задачу без отчета об исполнении', isCorrect: false },
        { answerText: 'Сотрудник, который следит за ходом исполнения и его сроками', isCorrect: false },
      ],
    },
  ];

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Выбор 14 случайных вопросов при загрузке компонента
  useEffect(() => {
    const shuffledQuestions = shuffleArray([...questions]).slice(0, 14);
    setSelectedQuestions(shuffledQuestions);
  }, []);


  const handleAnswerOptionClick = (isCorrect: any) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < selectedQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="test">
      {showScore ? (
        <div className="score-section" style={{color: score >= 12 ? 'green' : 'red'}}>
          Вы ответили правильно на {score} из {selectedQuestions.length} вопросов!
        </div>
      ) : selectedQuestions.length > 0 ? (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Вопрос {currentQuestion + 1}</span>/{selectedQuestions.length}
            </div>
            <div className="question-text">
              {selectedQuestions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {selectedQuestions[currentQuestion].answerOptions.map((answerOption: any, index: any) => (
              <button key={index} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div>Загрузка вопросов...</div>
      )}
    </div>
  );
}
