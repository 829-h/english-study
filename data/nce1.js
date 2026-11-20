// 新概念英语第一册（经典版课题）
// 只给课号、课题，以及自己编写的重点词和短句；不抄课文原文。课文和录音请在「外研U学」App 里听。
// 奇数课：重点词 + 短句；偶数课：句型练习短句。

const w = (s) => s.split(';').map((x) => { const [en, zh] = x.split('='); return { en: en.trim(), zh: zh.trim() }; });
const s = (list) => list.map(([en, zh]) => ({ en, zh }));
const L = (lesson, title, words, sentences) => ({ lesson, title, words: words ? w(words) : [], sentences: s(sentences) });

export const NCE1 = [
  L(1, 'Excuse me!', 'excuse me=打扰一下;yes=是的;is=是;this=这个;your=你的;pardon=请再说一遍;thank you=谢谢你', [
    ['Excuse me! Is this your pen?', '打扰一下！这是你的笔吗？'],
    ['Yes, it is. Thank you.', '是的，是我的。谢谢你。'],
  ]),
  L(2, 'Is this your…?', null, [
    ['Is this your book?', '这是你的书吗？'],
    ['Is this your cup?', '这是你的杯子吗？'],
    ['Yes, it is.', '是的，是我的。'],
  ]),
  L(3, 'Sorry, sir.', 'sorry=对不起;sir=先生;my=我的;umbrella=雨伞;please=请;here=这里;it=它', [
    ['My coat, please.', '请把我的外套给我。'],
    ['Sorry, sir. Is this your umbrella?', '对不起，先生。这是您的雨伞吗？'],
    ['No, it is not.', '不，不是的。'],
  ]),
  L(4, 'Is this your…?', null, [
    ['Is this your car? No, it isn\'t.', '这是你的车吗？不，不是。'],
    ['Is this your hat? Yes, it is.', '这是你的帽子吗？是的，是我的。'],
  ]),
  L(5, 'Nice to meet you.', 'good morning=早上好;Mr.=先生;Miss=小姐;new=新的;student=学生;nice=高兴的;meet=见面;too=也', [
    ['Good morning, Miss Wang.', '早上好，王小姐。'],
    ['This is Tom. He is a new student.', '这是汤姆，他是新同学。'],
    ['Nice to meet you. Nice to meet you, too.', '很高兴认识你。我也很高兴认识你。'],
  ]),
  L(6, 'What make is it?', null, [
    ['What make is it? It\'s a Ford.', '它是什么牌子的？是福特的。'],
    ['Is it a Chinese car?', '这是中国车吗？'],
  ]),
  L(7, 'Are you a teacher?', 'I am=我是;are=是;name=名字;what=什么;nationality=国籍;job=工作;teacher=老师;Chinese=中国人', [
    ['I am a teacher. Are you a teacher, too?', '我是老师。你也是老师吗？'],
    ['What\'s your name?', '你叫什么名字？'],
    ['I am Chinese.', '我是中国人。'],
  ]),
  L(8, 'What\'s your job?', null, [
    ['What\'s your job? I\'m a nurse.', '你是做什么工作的？我是护士。'],
    ['He is a driver.', '他是司机。'],
    ['She is a doctor.', '她是医生。'],
  ]),
  L(9, 'How are you today?', 'hello=你好;hi=嗨;how=怎么样;today=今天;well=身体好;fine=很好;thanks=谢谢;goodbye=再见', [
    ['Hello! How are you today?', '你好！你今天好吗？'],
    ['I\'m fine, thanks. And you?', '我很好，谢谢。你呢？'],
    ['Goodbye! See you.', '再见！回头见。'],
  ]),
  L(10, 'Look at…', null, [
    ['Look at the baby. He is happy.', '看那个宝宝，他很开心。'],
    ['Look at the cat. It is fat.', '看那只猫，它很胖。'],
    ['The dog is clean.', '这只狗很干净。'],
  ]),
  L(11, 'Is this your shirt?', 'whose=谁的;shirt=衬衫;blue=蓝色;white=白色;catch=接住;his=他的;her=她的', [
    ['Whose shirt is this?', '这是谁的衬衫？'],
    ['It\'s his shirt. It\'s blue.', '是他的衬衫，是蓝色的。'],
    ['Catch!', '接住！'],
  ]),
  L(12, 'Whose is this…? This is my/your/his/her…', null, [
    ['Whose is this ball? This is my ball.', '这个球是谁的？这是我的球。'],
    ['Whose is that bag? That is her bag.', '那个包是谁的？那是她的包。'],
  ]),
  L(13, 'A new dress', 'colour=颜色;green=绿色;come=来;upstairs=楼上;smart=漂亮的;hat=帽子;same=同样的;lovely=可爱的', [
    ['What colour is your new dress?', '你的新裙子是什么颜色的？'],
    ['It\'s green. It\'s lovely!', '是绿色的，真好看！'],
    ['Come upstairs and see.', '上楼来看看。'],
  ]),
  L(14, 'What colour is your…?', null, [
    ['What colour is your hat? It\'s red.', '你的帽子是什么颜色的？是红色的。'],
    ['What colour is the car? It\'s white.', '这辆车是什么颜色的？是白色的。'],
  ]),
  L(15, 'Your passports, please.', 'customs=海关;officer=官员;girl=女孩;friend=朋友;passport=护照;are=是;they=他们;these=这些', [
    ['Your passports, please.', '请出示你们的护照。'],
    ['Are you friends? Yes, we are.', '你们是朋友吗？是的。'],
    ['These are my bags.', '这些是我的包。'],
  ]),
  L(16, 'Are you…?', null, [
    ['Are you Chinese? Yes, we are.', '你们是中国人吗？是的。'],
    ['Are they students? No, they aren\'t.', '他们是学生吗？不，不是。'],
  ]),
  L(17, 'How do you do?', 'come and meet=来见见;employee=雇员;hard-working=勤劳的;office=办公室;assistant=助手;man=男人;woman=女人;busy=忙的', [
    ['How do you do?', '你好（初次见面）。'],
    ['They are very hard-working.', '他们工作很努力。'],
    ['She is my assistant.', '她是我的助手。'],
  ]),
  L(18, 'What are their jobs?', null, [
    ['What are their jobs? They are drivers.', '他们是做什么的？他们是司机。'],
    ['We are teachers.', '我们是老师。'],
  ]),
  L(19, 'Tired and thirsty', 'tired=累的;thirsty=渴的;matter=事情;children=孩子们;ice cream=冰淇淋;sit down=坐下;right=好的', [
    ['What\'s the matter, children?', '孩子们，怎么了？'],
    ['We are tired and thirsty.', '我们又累又渴。'],
    ['Sit down here.', '在这儿坐下。'],
  ]),
  L(20, 'Look at them!', null, [
    ['Look at them! They are hungry.', '看他们！他们饿了。'],
    ['The shoes are clean.', '这双鞋是干净的。'],
  ]),
  L(21, 'Which book?', 'give=给;one=一个;which=哪一个;red=红色;big=大的;small=小的;not=不', [
    ['Give me a book, please.', '请给我一本书。'],
    ['Which book? This one?', '哪一本？这本吗？'],
    ['No, the red one.', '不是，红色那本。'],
  ]),
  L(22, 'Give me/him/her/us/them a… Which one?', null, [
    ['Give her a spoon. Which one?', '给她一把勺子。哪一把？'],
    ['The small one, please.', '请给小的那把。'],
  ]),
  L(23, 'Which glasses?', 'glasses=玻璃杯（复数）;on=在…上面;shelf=架子;box=盒子;cup=杯子;plate=盘子', [
    ['Give me some glasses, please.', '请给我几个杯子。'],
    ['The ones on the shelf?', '架子上的那些吗？'],
    ['Yes, those, please.', '对，就那些。'],
  ]),
  L(24, 'Give me/him/her/us/them some… Which ones?', null, [
    ['Give them some apples. Which ones?', '给他们一些苹果。哪些？'],
    ['The big ones on the table.', '桌上那些大的。'],
  ]),
  L(25, 'Mrs. Smith\'s kitchen', 'kitchen=厨房;refrigerator=冰箱;right=右边;left=左边;middle=中间;table=桌子;bottle=瓶子;cooker=炉子', [
    ['There is a fridge in the kitchen.', '厨房里有一台冰箱。'],
    ['The cups are on the table.', '杯子在桌子上。'],
    ['It\'s on the left.', '它在左边。'],
  ]),
  L(26, 'Where is it?', null, [
    ['Where is the milk? It\'s in the fridge.', '牛奶在哪儿？在冰箱里。'],
    ['Where is the spoon? It\'s on the plate.', '勺子在哪儿？在盘子上。'],
  ]),
  L(27, 'Mrs. Smith\'s living room', 'living room=客厅;near=在…附近;window=窗户;armchair=扶手椅;door=门;picture=图画;wall=墙;flower=花', [
    ['There are some flowers near the window.', '窗户旁边有一些花。'],
    ['The pictures are on the wall.', '画挂在墙上。'],
  ]),
  L(28, 'Where are they?', null, [
    ['Where are the books? They\'re on the shelf.', '书在哪儿？在书架上。'],
    ['Where are the toys? They\'re in the box.', '玩具在哪儿？在盒子里。'],
  ]),
  L(29, 'Come in, Amy.', 'shut=关上;bedroom=卧室;untidy=乱的;must=必须;open=打开;air=使通风;put=放;clothes=衣服', [
    ['Come in and shut the door.', '进来，把门关上。'],
    ['The bedroom is very untidy.', '卧室很乱。'],
    ['Put your clothes in the wardrobe.', '把你的衣服放进衣柜里。'],
  ]),
  L(30, 'What must I do?', null, [
    ['What must I do? You must open the window.', '我该做什么？你得把窗户打开。'],
    ['Empty the basket, please.', '请把篮子倒空。'],
  ]),
  L(31, 'Where\'s Sally?', 'garden=花园;under=在…下面;tree=树;climb=爬;run=跑;grass=草;across=横过;after=在…后面', [
    ['Where is the baby? She\'s in the garden.', '宝宝在哪儿？她在花园里。'],
    ['The cat is climbing the tree.', '猫正在爬树。'],
    ['The dog is running across the grass.', '小狗正跑过草地。'],
  ]),
  L(32, 'What\'s he/she/it doing?', null, [
    ['What\'s she doing? She\'s cooking.', '她在做什么？她在做饭。'],
    ['What\'s it doing? It\'s eating.', '它在做什么？它在吃东西。'],
  ]),
  L(33, 'A fine day', 'day=天;cloud=云;sky=天空;sun=太阳;shine=照耀;with=和…一起;family=家;walk=走路', [
    ['It is a fine day today.', '今天天气很好。'],
    ['The sun is shining.', '太阳正照着。'],
    ['We are walking in the park.', '我们正在公园里散步。'],
  ]),
  L(34, 'What are they doing?', null, [
    ['What are they doing? They\'re swimming.', '他们在做什么？他们在游泳。'],
    ['The children are playing.', '孩子们在玩。'],
  ]),
  L(35, 'Our village', 'photograph=照片;village=村庄;valley=山谷;between=在…之间;hill=小山;another=另一个;river=河;bank=河岸', [
    ['This is a photo of our village.', '这是我们村子的照片。'],
    ['The village is between two hills.', '村子在两座小山之间。'],
    ['We are walking along the river.', '我们正沿着河边走。'],
  ]),
  L(36, 'Where…?', null, [
    ['Where is the boy? He\'s swimming in the river.', '那个男孩在哪儿？他在河里游泳。'],
    ['The bird is flying over the house.', '小鸟正飞过房子上空。'],
  ]),
  L(37, 'Making a bookcase', 'work=工作;hard=努力地;make=做;bookcase=书柜;paint=上漆;going to=打算;favourite=最喜欢的;colour=颜色', [
    ['You are working hard.', '你干得真卖力。'],
    ['I am going to paint it pink.', '我打算把它漆成粉色。'],
    ['Pink is my favourite colour.', '粉色是我最喜欢的颜色。'],
  ]),
  L(38, 'What are you going to do? What are you doing now?', null, [
    ['What are you going to do? I\'m going to cook.', '你打算做什么？我要去做饭。'],
    ['What are you doing now? I\'m washing the dishes.', '你现在在做什么？我在洗碗。'],
  ]),
  L(39, 'Don\'t drop it!', 'front=前面;careful=小心的;vase=花瓶;drop=掉下;then=然后;flower=花;table=桌子;water=水', [
    ['Be careful! Don\'t drop it!', '小心！别摔了！'],
    ['Put it in front of the window.', '把它放在窗户前面。'],
    ['I\'m going to put some water in it.', '我要往里面加点水。'],
  ]),
  L(40, 'What are you going to do? I\'m going to…', null, [
    ['I\'m going to give the baby some milk.', '我要给宝宝喂点牛奶。'],
    ['I\'m going to show him the book.', '我要给他看这本书。'],
  ]),
  L(41, 'Penny\'s bag', 'cheese=奶酪;bread=面包;soap=肥皂;chocolate=巧克力;sugar=糖;coffee=咖啡;tea=茶;heavy=重的', [
    ['Is that bag heavy?', '那个包重吗？'],
    ['There is some bread in it.', '里面有一些面包。'],
    ['Is there any sugar?', '有糖吗？'],
  ]),
  L(42, 'Is there a… in/on that…? Is there any… in/on that…?', null, [
    ['Is there a spoon on the table? Yes, there is.', '桌上有勺子吗？有。'],
    ['Is there any milk in the bottle? No, there isn\'t.', '瓶子里有牛奶吗？没有。'],
  ]),
  L(43, 'Hurry up!', 'can=能;kettle=水壶;behind=在…后面;teapot=茶壶;now=现在;find=找到;boil=沸腾;hurry up=快点', [
    ['Can you make the tea?', '你会泡茶吗？'],
    ['The kettle is behind the teapot.', '水壶在茶壶后面。'],
    ['Hurry up! The water is boiling.', '快点！水开了。'],
  ]),
  L(44, 'Are there any…? Is there any…?', null, [
    ['Are there any toys in the box? Yes, there are.', '盒子里有玩具吗？有。'],
    ['Is there any juice? No, there isn\'t.', '有果汁吗？没有。'],
  ]),
  L(45, 'The boss\'s letter', 'boss=老板;minute=分钟;ask=请求;handwriting=书写;terrible=糟糕的;letter=信;type=打字;read=读', [
    ['Can you come here for a minute?', '你能过来一下吗？'],
    ['Can you read this letter?', '你能看懂这封信吗？'],
    ['His handwriting is terrible.', '他的字写得很糟糕。'],
  ]),
  L(46, 'Can you…?', null, [
    ['Can you swim? Yes, I can.', '你会游泳吗？会。'],
    ['Can the baby walk? No, she can\'t.', '宝宝会走路吗？还不会。'],
  ]),
  L(47, 'A cup of coffee', 'like=喜欢;want=想要;black=黑的;of course=当然;cup=杯;milk=牛奶;sugar=糖;please=请', [
    ['Do you like coffee?', '你喜欢喝咖啡吗？'],
    ['I want a cup of coffee.', '我想要一杯咖啡。'],
    ['With milk, please.', '请加牛奶。'],
  ]),
  L(48, 'Do you like…? Do you want…?', null, [
    ['Do you like apples? Yes, I do.', '你喜欢苹果吗？喜欢。'],
    ['Do you want some bread? No, thank you.', '你要面包吗？不用了，谢谢。'],
  ]),
  L(49, 'At the butcher\'s', 'butcher=卖肉的;meat=肉;beef=牛肉;lamb=羊肉;husband=丈夫;steak=牛排;mince=肉末;tell=告诉', [
    ['Do you want any meat today?', '你今天要买肉吗？'],
    ['My husband likes beef.', '我丈夫喜欢吃牛肉。'],
    ['He doesn\'t like lamb.', '他不喜欢吃羊肉。'],
  ]),
  L(50, 'He likes… But he doesn\'t like…', null, [
    ['She likes milk. But she doesn\'t like water.', '她喜欢喝牛奶，但不喜欢喝水。'],
    ['He likes cats. But he doesn\'t like dogs.', '他喜欢猫，但不喜欢狗。'],
  ]),
  L(51, 'A pleasant climate', 'Greece=希腊;climate=气候;country=国家;pleasant=宜人的;weather=天气;spring=春天;windy=有风的;warm=温暖的', [
    ['Where do you come from?', '你是哪里人？'],
    ['What\'s the weather like in spring?', '春天天气怎么样？'],
    ['It\'s often windy and warm.', '常常有风，而且很暖和。'],
  ]),
  L(52, 'What nationality are they? Where do they come from?', null, [
    ['Where does she come from? She comes from China.', '她是哪里人？她来自中国。'],
    ['They are English.', '他们是英国人。'],
  ]),
  L(53, 'An interesting climate', 'interesting=有趣的;subject=话题;conversation=谈话;rain=下雨;summer=夏天;winter=冬天;cold=冷的;night=夜晚', [
    ['The weather is an interesting subject.', '天气是个有趣的话题。'],
    ['It often rains in summer.', '夏天常常下雨。'],
    ['The nights are cold in winter.', '冬天的夜晚很冷。'],
  ]),
  L(54, 'What nationality are they? Where do they come from?', null, [
    ['Is he American? No, he isn\'t. He\'s Canadian.', '他是美国人吗？不，他是加拿大人。'],
    ['Do you come from Beijing? Yes, I do.', '你是北京人吗？是的。'],
  ]),
  L(55, 'The Sawyer family', 'live=住;stay=待;home=家;housework=家务;lunch=午饭;afternoon=下午;evening=晚上;usually=通常', [
    ['We live in a small house.', '我们住在一座小房子里。'],
    ['She usually does the housework.', '她通常做家务。'],
    ['We usually watch TV in the evening.', '我们晚上通常看电视。'],
  ]),
  L(56, 'What do they usually do?', null, [
    ['What does he usually do in the morning? He goes to work.', '他早上通常做什么？他去上班。'],
    ['The baby usually sleeps in the afternoon.', '宝宝下午通常睡觉。'],
  ]),
  L(57, 'An unusual day', 'o\'clock=…点钟;shop=商店;moment=片刻;because=因为;early=早;late=晚;nine=九', [
    ['It\'s eight o\'clock.', '现在八点。'],
    ['She usually goes to work at nine.', '她通常九点去上班。'],
    ['But today she is at home.', '但今天她在家。'],
  ]),
  L(58, 'What\'s the time?', null, [
    ['What\'s the time? It\'s ten o\'clock.', '几点了？十点了。'],
    ['It\'s half past seven.', '现在七点半。'],
  ]),
  L(59, 'Is that all?', 'envelope=信封;writing paper=信纸;shop assistant=店员;size=尺寸;glue=胶水;chalk=粉笔;change=零钱;pad=本子', [
    ['I want some envelopes, please.', '我想买些信封。'],
    ['Have you got any glue?', '你们有胶水吗？'],
    ['Is that all? Yes, thank you.', '就这些吗？是的，谢谢。'],
  ]),
  L(60, 'What\'s the time?', null, [
    ['I have breakfast at seven o\'clock.', '我七点吃早饭。'],
    ['She has a bath at eight in the evening.', '她晚上八点洗澡。'],
  ]),
  L(61, 'A bad cold', 'feel=感觉;look=看起来;bad cold=重感冒;news=消息;doctor=医生;medicine=药;bed=床;well=健康的', [
    ['How do you feel today?', '你今天感觉怎么样？'],
    ['I have a bad cold.', '我得了重感冒。'],
    ['You must stay in bed.', '你必须卧床休息。'],
  ]),
  L(62, 'What\'s the matter with them? What must they do?', null, [
    ['What\'s the matter with him? He has a headache.', '他怎么了？他头疼。'],
    ['He must take some medicine.', '他得吃点药。'],
  ]),
  L(63, 'Thank you, doctor.', 'better=更好的;certainly=当然;get up=起床;yet=还;rich=油腻的;food=食物;remain=保持;stay=待着', [
    ['Is he better today?', '他今天好点了吗？'],
    ['He mustn\'t get up yet.', '他现在还不能起床。'],
    ['Don\'t eat rich food.', '别吃油腻的东西。'],
  ]),
  L(64, 'Don\'t…! You mustn\'t…!', null, [
    ['Don\'t touch it! You mustn\'t touch it!', '别碰！你不能碰！'],
    ['Don\'t play with fire!', '别玩火！'],
  ]),
  L(65, 'Not a baby', 'key=钥匙;front door=前门;baby=婴儿;party=聚会;late=晚;enjoy=享受;himself=他自己;let=让', [
    ['Here is the key of the front door.', '这是前门的钥匙。'],
    ['Don\'t come home late.', '别回家太晚。'],
    ['Enjoy yourself!', '玩得开心！'],
  ]),
  L(66, 'What\'s the time?', null, [
    ['He is going to a party at seven.', '他七点要去参加聚会。'],
    ['The baby can feed herself.', '宝宝会自己吃饭了。'],
  ]),
  L(67, 'The weekend', 'greengrocer=卖菜的;absent=缺席的;Monday=星期一;Saturday=星期六;Sunday=星期天;weekend=周末;mother-in-law=婆婆/岳母;lucky=幸运的', [
    ['Were you at home on Saturday?', '你星期六在家吗？'],
    ['I was at my mother-in-law\'s.', '我在婆婆家。'],
    ['Have a nice weekend!', '周末愉快！'],
  ]),
  L(68, 'What\'s the time?', null, [
    ['Where were you at nine o\'clock? I was at work.', '九点钟你在哪儿？我在上班。'],
    ['She was at the shop yesterday.', '她昨天在商店。'],
  ]),
  L(69, 'The car race', 'year=年;race=比赛;town=城镇;crowd=人群;stand=站;finish=终点;winner=获胜者;way=路上', [
    ['There was a big race last year.', '去年有一场大比赛。'],
    ['There were many people at the race.', '比赛现场有很多人。'],
    ['Who was the winner?', '谁赢了？'],
  ]),
  L(70, 'When were they there?', null, [
    ['When were you in Beijing? I was there last week.', '你什么时候在北京？我上周在那儿。'],
    ['We were at the park yesterday morning.', '我们昨天上午在公园。'],
  ]),
  L(71, 'He\'s awful!', 'awful=讨厌的;telephone=电话;time=次;answer=接电话;last=上一个;again=又;phone=打电话;say=说', [
    ['He telephoned three times yesterday.', '他昨天打了三次电话。'],
    ['I answered the phone.', '我接了电话。'],
    ['He\'s awful!', '他真讨厌！'],
  ]),
  L(72, 'When did you…? Can you do this test?', null, [
    ['When did you call her? I called her yesterday.', '你什么时候给她打的电话？我昨天打的。'],
    ['We cleaned the room last night.', '我们昨晚打扫了房间。'],
  ]),
  L(73, 'The way to King Street', 'week=星期;London=伦敦;suddenly=突然;bus stop=公交车站;smile=微笑;pleasantly=愉快地;understand=懂;speak=说', [
    ['Excuse me, where is the bus stop?', '打扰一下，公交车站在哪儿？'],
    ['I don\'t understand. I don\'t speak English.', '我听不懂，我不会说英语。'],
    ['She smiled pleasantly.', '她和气地笑了笑。'],
  ]),
  L(74, 'What did they do?', null, [
    ['What did she do yesterday? She went to the park.', '她昨天做了什么？她去了公园。'],
    ['He walked slowly.', '他走得很慢。'],
  ]),
  L(75, 'Uncomfortable shoes', 'ago=以前;buy=买;pair=一双;fashion=流行;uncomfortable=不舒服的;wear=穿;shoes=鞋;size=尺码', [
    ['Do you have any shoes like these?', '你们有像这样的鞋吗？'],
    ['I bought them two years ago.', '我是两年前买的。'],
    ['They are very uncomfortable.', '它们穿着很不舒服。'],
  ]),
  L(76, 'When did you…?', null, [
    ['When did you buy that dress? I bought it last month.', '你什么时候买的那条裙子？上个月买的。'],
    ['When did she come home? She came home at six.', '她什么时候到家的？六点到的。'],
  ]),
  L(77, 'Terrible toothache', 'appointment=约会;urgent=紧急的;tooth=牙;toothache=牙疼;dentist=牙医;afraid=恐怕;till=直到;cake=蛋糕', [
    ['Can I see the dentist, please?', '我可以看牙医吗？'],
    ['I have a terrible toothache.', '我牙疼得厉害。'],
    ['Is it urgent?', '很急吗？'],
  ]),
  L(78, 'When did you…?', null, [
    ['When did you see the doctor? I saw him yesterday.', '你什么时候看的医生？我昨天看的。'],
    ['He ate too many sweets.', '他吃了太多糖。'],
  ]),
  L(79, 'Carol\'s shopping list', 'shopping=买东西;list=清单;need=需要;biscuit=饼干;butter=黄油;potato=土豆;tomato=西红柿;egg=鸡蛋', [
    ['I must make a shopping list.', '我得列个购物清单。'],
    ['We need some eggs and milk.', '我们需要一些鸡蛋和牛奶。'],
    ['How much rice do we need?', '我们需要多少米？'],
  ]),
  L(80, 'I must go to the…', null, [
    ['We need bread. I must go to the baker\'s.', '我们需要面包，我得去面包店。'],
    ['I must go to the supermarket.', '我得去超市。'],
  ]),
  L(81, 'Roast beef and potatoes', 'roast=烤的;beef=牛肉;dinner=正餐;ready=准备好的;soon=很快;bath=洗澡;meal=一顿饭;chicken=鸡肉', [
    ['Dinner is nearly ready.', '晚饭快好了。'],
    ['We are having chicken and rice.', '我们吃鸡肉和米饭。'],
    ['He is having a bath.', '他正在洗澡。'],
  ]),
  L(82, 'I had…', null, [
    ['What did you have for breakfast? I had an egg.', '你早饭吃了什么？我吃了一个鸡蛋。'],
    ['She had a cup of tea.', '她喝了一杯茶。'],
  ]),
  L(83, 'Going on holiday', 'holiday=假期;mess=凌乱;pack=收拾行李;suitcase=手提箱;leave=离开;already=已经;just=刚刚;ticket=票', [
    ['Excuse the mess.', '屋里乱，别介意。'],
    ['We are going on holiday tomorrow.', '我们明天去度假。'],
    ['Have you packed your suitcase?', '你收拾好行李了吗？'],
  ]),
  L(84, 'Have you had…?', null, [
    ['Have you had lunch? Yes, I have.', '你吃过午饭了吗？吃过了。'],
    ['She has already had a bath.', '她已经洗过澡了。'],
  ]),
  L(85, 'Paris in the spring', 'Paris=巴黎;cinema=电影院;film=电影;beautiful=美丽的;city=城市;never=从不;ever=曾经;spring=春天', [
    ['Have you ever been to Paris?', '你去过巴黎吗？'],
    ['It\'s a beautiful city.', '那是一座美丽的城市。'],
    ['I have never been there.', '我从没去过那里。'],
  ]),
  L(86, 'What have you done?', null, [
    ['What have you done? I have washed the clothes.', '你做了什么？我洗了衣服。'],
    ['He has just cleaned the car.', '他刚洗完车。'],
  ]),
  L(87, 'A car crash', 'crash=撞车;bring=带来;garage=车库;repair=修理;accident=事故;lamp-post=路灯杆;try=试;hurry=赶快', [
    ['Have you repaired my car?', '我的车修好了吗？'],
    ['There was an accident.', '出了一起事故。'],
    ['The car hit a lamp-post.', '车撞上了路灯杆。'],
  ]),
  L(88, 'Have you… yet?', null, [
    ['Have you finished yet? No, not yet.', '你做完了吗？还没有。'],
    ['Has the baby woken up yet?', '宝宝醒了吗？'],
  ]),
  L(89, 'For sale', 'for sale=待售;sale=出售;how long=多久;since=自从;price=价格;pound=英镑;sell=卖;whole=整个', [
    ['Is this house for sale?', '这房子要卖吗？'],
    ['How long have you lived here?', '你在这里住了多久了？'],
    ['I have lived here for ten years.', '我在这里住了十年了。'],
  ]),
  L(90, 'Have you… yet?', null, [
    ['Have you sold your car yet? Yes, I sold it last week.', '你的车卖了吗？上周卖了。'],
    ['She has worked here since 2020.', '她从 2020 年起就在这儿工作。'],
  ]),
  L(91, 'Poor Ian!', 'still=仍然;move=搬家;miss=想念;neighbour=邻居;poor=可怜的;will=将要;sure=肯定的;tomorrow=明天', [
    ['Will you move next week?', '你下周要搬家吗？'],
    ['We will miss you.', '我们会想你的。'],
    ['Poor boy!', '可怜的孩子！'],
  ]),
  L(92, 'When will…?', null, [
    ['When will you come back? I\'ll come back tomorrow.', '你什么时候回来？我明天回来。'],
    ['She will be one next month.', '她下个月就满一岁了。'],
  ]),
  L(93, 'Our new neighbour', 'pilot=飞行员;fly=飞;return=回来;New York=纽约;Madrid=马德里;Tokyo=东京;Rome=罗马;next=下一个', [
    ['Our new neighbour is a pilot.', '我们的新邻居是飞行员。'],
    ['He will fly to Tokyo next week.', '他下周要飞去东京。'],
    ['He will return in two weeks.', '他两周后回来。'],
  ]),
  L(94, 'When did you/will you go to…?', null, [
    ['When did you go to Shanghai? I went there last year.', '你什么时候去的上海？去年去的。'],
    ['When will you go to Beijing? I\'ll go next month.', '你什么时候去北京？下个月去。'],
  ]),
  L(95, 'Tickets, please.', 'return=往返的;train=火车;station=车站;platform=站台;plenty of=很多;time=时间;miss=错过;quarter=一刻钟', [
    ['Two return tickets, please.', '请给我两张往返票。'],
    ['What time is the next train?', '下一班火车几点开？'],
    ['We have plenty of time.', '我们时间很充裕。'],
  ]),
  L(96, 'What\'s the exact time?', null, [
    ['What\'s the exact time? It\'s ten past nine.', '现在几点整？九点十分。'],
    ['It\'s a quarter to six.', '现在差一刻六点。'],
  ]),
  L(97, 'A small blue case', 'case=箱子;leave=遗留;describe=描述;handle=把手;zip=拉链;label=标签;name=名字;address=地址', [
    ['I left my bag on the train.', '我把包落在火车上了。'],
    ['Can you describe it?', '你能描述一下它吗？'],
    ['It\'s small and blue.', '它又小又蓝。'],
  ]),
  L(98, 'Whose is it? Whose are they?', null, [
    ['Whose is this toy? It\'s hers.', '这个玩具是谁的？是她的。'],
    ['Whose are these shoes? They\'re mine.', '这双鞋是谁的？是我的。'],
  ]),
  L(99, 'Ow!', 'ow=哎哟;slip=滑倒;fall=摔倒;downstairs=楼下;hurt=受伤;back=后背;stand up=站起来;help=帮助', [
    ['Ow! I slipped and fell.', '哎哟！我滑倒了。'],
    ['Did you hurt yourself?', '你伤着了吗？'],
    ['Let me help you.', '我来扶你。'],
  ]),
  L(100, 'He says that… She says that… They say that…', null, [
    ['She says that she is tired.', '她说她累了。'],
    ['They say that the baby is asleep.', '他们说宝宝睡着了。'],
  ]),
  L(101, 'A card from Jimmy', 'card=明信片;Scotland=苏格兰;youth hostel=青年旅舍;cheap=便宜的;speak up=大声说;deaf=聋的;write=写;soon=很快', [
    ['Read the card to me, please.', '请把明信片念给我听。'],
    ['He says he is having a good time.', '他说他玩得很开心。'],
    ['Speak up, please.', '请大点声。'],
  ]),
  L(102, 'He says he… She says she… They say they…', null, [
    ['He says he will be home late.', '他说他会晚点回家。'],
    ['She says she likes the park.', '她说她喜欢公园。'],
  ]),
  L(103, 'The French test', 'exam=考试;pass=及格;question=问题;easy=容易的;difficult=难的;enough=足够的;answer=回答;mark=分数', [
    ['How was the exam?', '考试怎么样？'],
    ['Some questions were too difficult.', '有些题太难了。'],
    ['I didn\'t have enough time.', '我时间不够。'],
  ]),
  L(104, 'Too, very, enough', null, [
    ['The soup is too hot.', '汤太烫了。'],
    ['The baby is big enough to sit up.', '宝宝大到能自己坐起来了。'],
    ['It\'s very cold today.', '今天很冷。'],
  ]),
  L(105, 'Full of mistakes', 'spell=拼写;intelligent=聪明的;mistake=错误;present=礼物;dictionary=词典;full=满的;correct=改正;careful=仔细的', [
    ['How do you spell it?', '这个怎么拼？'],
    ['Your letter is full of mistakes.', '你的信里全是错。'],
    ['I want you to use a dictionary.', '我希望你用词典。'],
  ]),
  L(106, 'I want you/him/her/them to… Tell him/her/them to…', null, [
    ['I want you to wash your hands.', '我要你去洗手。'],
    ['Tell him to come here.', '叫他过来。'],
  ]),
  L(107, 'It\'s too small.', 'dress=连衣裙;try on=试穿;large=大的;small=小的;smaller=更小的;larger=更大的;colour=颜色;pretty=漂亮的', [
    ['Can I try it on?', '我可以试穿吗？'],
    ['It\'s too small. Do you have a larger one?', '太小了，有大一点的吗？'],
    ['This one is prettier.', '这件更漂亮。'],
  ]),
  L(108, 'How do they compare?', null, [
    ['Tom is taller than Jack.', '汤姆比杰克高。'],
    ['This apple is bigger than that one.', '这个苹果比那个大。'],
  ]),
  L(109, 'A good idea', 'idea=主意;less=更少;more=更多;few=少的;a little=一点;coffee=咖啡;fresh=新鲜的;instead=代替', [
    ['That\'s a good idea!', '好主意！'],
    ['There is less milk than yesterday.', '牛奶比昨天少了。'],
    ['Let\'s have tea instead.', '我们改喝茶吧。'],
  ]),
  L(110, 'How do they compare?', null, [
    ['She has more toys than her brother.', '她的玩具比她哥哥多。'],
    ['I have fewer books than you.', '我的书比你少。'],
  ]),
  L(111, 'The most expensive model', 'model=型号;expensive=贵的;cheap=便宜的;afford=买得起;deposit=押金;instalment=分期付款;as…as=和…一样;month=月', [
    ['This is the most expensive one.', '这是最贵的一款。'],
    ['I can\'t afford it.', '我买不起。'],
    ['It\'s not as cheap as that one.', '它没有那个便宜。'],
  ]),
  L(112, 'How do they compare?', null, [
    ['She is the youngest in the family.', '她是家里最小的。'],
    ['This room is as big as that one.', '这个房间和那个一样大。'],
  ]),
  L(113, 'Small change', 'conductor=售票员;fare=车费;change=零钱;note=纸币;neither=也不;so=也;bus=公交车;get off=下车', [
    ['I haven\'t got any small change.', '我没有零钱。'],
    ['Neither have I.', '我也没有。'],
    ['We must get off the bus.', '我们得下车了。'],
  ]),
  L(114, 'I\'ve got none.', null, [
    ['Have you got any sweets? No, I\'ve got none.', '你有糖吗？没有，一颗都没有。'],
    ['I like apples. So do I.', '我喜欢苹果。我也是。'],
  ]),
  L(115, 'Knock, knock!', 'knock=敲;anyone=任何人;nobody=没有人;everything=一切;something=某物;nothing=没有东西;window=窗户;back door=后门', [
    ['Knock, knock! Is there anyone at home?', '咚咚！有人在家吗？'],
    ['Nobody answered the door.', '没人来开门。'],
    ['Let\'s try the back door.', '我们试试后门吧。'],
  ]),
  L(116, 'Every, no, any and some', null, [
    ['Everyone is here.', '大家都到了。'],
    ['There is something in the box.', '盒子里有个东西。'],
    ['I can\'t find anything.', '我什么也找不到。'],
  ]),
  L(117, 'Tommy\'s breakfast', 'when=当…时;dining room=餐厅;coin=硬币;swallow=吞下;breakfast=早餐;while=当…时;mouth=嘴;worry=担心', [
    ['When I came in, he was eating breakfast.', '我进来的时候，他正在吃早饭。'],
    ['Don\'t put coins in your mouth!', '别把硬币放进嘴里！'],
    ['Don\'t worry.', '别担心。'],
  ]),
  L(118, 'What were you doing?', null, [
    ['What were you doing at eight? I was cooking.', '八点钟你在做什么？我在做饭。'],
    ['The baby was sleeping when I came home.', '我到家时宝宝正在睡觉。'],
  ]),
  L(119, 'A true story', 'story=故事;thief=小偷;true=真实的;dark=黑暗的;light=灯;switch on=打开;door=门;hear=听见', [
    ['I love true stories.', '我喜欢真实的故事。'],
    ['The house was dark.', '屋里一片漆黑。'],
    ['She switched on the light.', '她打开了灯。'],
  ]),
  L(120, 'It had already happened.', null, [
    ['When I got there, the bus had left.', '我到那儿时，公交车已经开走了。'],
    ['She had already eaten dinner.', '她已经吃过晚饭了。'],
  ]),
  L(121, 'The man in a hat', 'customer=顾客;serve=接待;remember=记得;wear=戴;forget=忘记;wait=等;hat=帽子;who=谁', [
    ['Do you remember the man in a hat?', '你还记得那个戴帽子的人吗？'],
    ['He is the man who served me.', '他就是接待我的那个人。'],
    ['Please wait a minute.', '请稍等。'],
  ]),
  L(122, 'Who (whom), which and that', null, [
    ['This is the book which I bought.', '这就是我买的那本书。'],
    ['The woman who lives here is a doctor.', '住在这里的那位女士是医生。'],
  ]),
  L(123, 'A trip to Australia', 'trip=旅行;Australia=澳大利亚;beard=胡子;photo=照片;age=年纪;look like=看起来像;different=不同的;young=年轻的', [
    ['This is a photo I took in Australia.', '这是我在澳大利亚拍的照片。'],
    ['You look very different here.', '你在照片里看起来很不一样。'],
    ['I was very young then.', '那时候我很年轻。'],
  ]),
  L(124, '(Who)/(whom), (which) and (that)', null, [
    ['The toy you gave him is in the box.', '你给他的玩具在盒子里。'],
    ['The man I met is a teacher.', '我遇见的那个人是老师。'],
  ]),
  L(125, 'Tea for two', 'have to=不得不;water=浇水;garden=花园;need=需要;rain=下雨;all night=整夜;unless=除非;tea=茶', [
    ['Do you have to water the garden?', '你得给花园浇水吗？'],
    ['You don\'t need to. It rained all night.', '不用浇，昨晚下了一整夜的雨。'],
    ['Come and have tea with me.', '来和我一起喝茶吧。'],
  ]),
  L(126, 'Have to and do not need to', null, [
    ['I have to get up early tomorrow.', '我明天得早起。'],
    ['You don\'t need to buy milk.', '你不用买牛奶了。'],
  ]),
  L(127, 'A famous actress', 'famous=有名的;actress=女演员;think=认为;must be=一定是;can\'t be=不可能是;at least=至少;remember=记得;old=老的', [
    ['She is a famous actress.', '她是位有名的女演员。'],
    ['She must be about thirty.', '她一定三十岁左右。'],
    ['She can\'t be twenty!', '她不可能才二十岁！'],
  ]),
  L(128, 'He can\'t be… He must be…', null, [
    ['He can\'t be hungry. He must be tired.', '他不可能饿了，他一定是困了。'],
    ['That must be Daddy.', '那一定是爸爸。'],
  ]),
  L(129, 'Seventy miles an hour', 'mile=英里;hour=小时;speed=速度;fast=快的;police=警察;must have=一定已经;sign=标志;see=看见', [
    ['You were driving too fast.', '你开得太快了。'],
    ['You must have seen the sign.', '你肯定看到了那个标志。'],
    ['I didn\'t see it.', '我没看见。'],
  ]),
  L(130, 'He can\'t have been… He must have been…', null, [
    ['She can\'t have been at home. She must have been at work.', '她不可能在家，她一定在上班。'],
    ['The baby must have been very sleepy.', '宝宝那会儿一定很困了。'],
  ]),
  L(131, 'Don\'t be so sure!', 'sure=确定的;may=可能;abroad=在国外;perhaps=也许;decide=决定;holiday=假期;afford=负担得起;travel=旅行', [
    ['Where will you go for the holiday?', '假期你去哪儿？'],
    ['We may go abroad.', '我们可能出国。'],
    ['Don\'t be so sure!', '别太肯定了！'],
  ]),
  L(132, 'He may be… He may have been… I\'m not sure.', null, [
    ['He may be at home. I\'m not sure.', '他可能在家，我不确定。'],
    ['She may have been asleep.', '她可能那时睡着了。'],
  ]),
  L(133, 'Sensational news!', 'news=新闻;reporter=记者;retire=退休;film=电影;tell=告诉;ask=问;said=说;true=真的', [
    ['Is it true?', '是真的吗？'],
    ['She said that she was very happy.', '她说她很开心。'],
    ['He told me that he would retire.', '他告诉我他要退休了。'],
  ]),
  L(134, 'He said (that) he… He told me (that) he…', null, [
    ['He said that he was busy.', '他说他很忙。'],
    ['She told me that she liked the gift.', '她告诉我她喜欢这份礼物。'],
  ]),
  L(135, 'The latest report', 'latest=最新的;report=报道;marry=结婚;wonderful=美好的;plan=计划;director=导演;maybe=也许;whether=是否', [
    ['Have you heard the latest news?', '你听到最新消息了吗？'],
    ['She said she would get married.', '她说她要结婚了。'],
    ['That\'s wonderful!', '太好了！'],
  ]),
  L(136, 'He said (that) he… He told me (that) he…', null, [
    ['She said she would call me.', '她说她会给我打电话。'],
    ['He told me he could come.', '他告诉我他能来。'],
  ]),
  L(137, 'A pleasant dream', 'dream=梦;if=如果;win=赢;money=钱;world=世界;buy=买;travel=旅行;lucky=幸运的', [
    ['If I win the money, I will buy a house.', '如果我赢了这笔钱，我就买房子。'],
    ['If it rains, we will stay at home.', '如果下雨，我们就待在家里。'],
    ['It\'s only a dream.', '这只是个梦。'],
  ]),
  L(138, 'If…', null, [
    ['If you are tired, have a rest.', '如果你累了，就休息一下。'],
    ['If the baby cries, pick her up.', '如果宝宝哭了，就把她抱起来。'],
  ]),
  L(139, 'Is that you, John?', 'wonder=想知道;ask=问;whether=是否;dinner=晚饭;forget=忘记;office=办公室;late=晚的;know=知道', [
    ['Is that you, Dad?', '是你吗，爸爸？'],
    ['She asked if I was coming home for dinner.', '她问我回不回家吃晚饭。'],
    ['I wonder where he is.', '我想知道他在哪儿。'],
  ]),
  L(140, 'He wants to know if/why/what/when', null, [
    ['He wants to know if you are free.', '他想知道你有没有空。'],
    ['She wants to know when we will leave.', '她想知道我们什么时候走。'],
  ]),
  L(141, 'Sally\'s first train ride', 'ride=乘坐;first=第一次;seat=座位;window=窗户;be taken=被带去;smile=微笑;lady=女士;journey=旅程', [
    ['It was her first train ride.', '这是她第一次坐火车。'],
    ['She sat by the window.', '她坐在窗边。'],
    ['She was taken to the station by her mother.', '她是妈妈带去车站的。'],
  ]),
  L(142, 'Someone invited Sally to a party. Sally was invited to a party.', null, [
    ['The cake was made by Mommy.', '蛋糕是妈妈做的。'],
    ['The baby was given a toy.', '宝宝收到了一个玩具。'],
  ]),
  L(143, 'A walk through the woods', 'wood=树林;walk=散步;through=穿过;path=小路;park=公园;clean=干净的;rubbish=垃圾;notice=告示', [
    ['Let\'s take a walk through the woods.', '我们去树林里散散步吧。'],
    ['The park is kept very clean.', '公园保持得很干净。'],
    ['Don\'t leave rubbish here.', '别在这里扔垃圾。'],
  ]),
  L(144, 'He hasn\'t been served yet. He will be served soon.', null, [
    ['The food hasn\'t been served yet.', '菜还没上。'],
    ['The room will be cleaned soon.', '房间很快会打扫好。'],
  ]),
];
