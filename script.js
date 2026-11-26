const questions = [
  {id:'q1',title:'Почему вы подписались на меня и продолжаете читать?',hint:'Можно выбрать до двух вариантов.',type:'multi',max:2,options:['Интересуют изменения женского здоровья после 35–40 лет.','Хочу разобраться в перименопаузе и менопаузе.','Интересует тема гормонов и МГТ.','Уже обращалась к Виктории или приобретала ее продукты.','Пока просто наблюдаю, конкретного запроса нет.','Другое.']},
  {id:'q2',title:'Сколько вам лет?',hint:'Один вариант.',type:'single',options:['До 35','35–39','40–44','45–49','50–54','55–59','60 и старше']},
  {id:'q3',title:'Какие вопросы женского здоровья сейчас беспокоят вас больше всего?',hint:'Можно выбрать до трех вариантов.',type:'multi',max:3,options:['Изменения цикла, непонятные гормональные изменения.','Приливы, ночная потливость, ощущение жара.','Сон, усталость, недостаток энергии.','Вес, изменения фигуры, состояние кожи и волос.','Настроение, тревожность, раздражительность.','Снижение либидо, сухость, дискомфорт в интимной жизни.','Стоит ли принимать гормоны.','Как сохранить здоровье и хорошее самочувствие с возрастом.','Сейчас ничего особенно не беспокоит.','Другое.']},
  {id:'q4',title:'Представьте, что за ближайшие три месяца вы смогли бы решить с моей помощью один важный вопрос. Какой именно?',hint:'Свободный ответ.',type:'text',note:'Не нужно писать подробную медицинскую историю. Расскажите своими словами, что хотелось бы понять или изменить.'},
  {id:'q5',title:'Что вы уже предпринимали, чтобы разобраться с этим вопросом?',hint:'Свободный ответ.',type:'text'},
  {id:'q6',title:'Что больше всего мешает вам разобраться с этой проблемой?',hint:'Можно выбрать до двух вариантов.',type:'multi',max:2,options:['Много противоречивой информации, непонятно, кому верить.','Сложно найти врача, которому доверяю.','Не понимаю, с чего начать и какие вопросы задать специалисту.','Боюсь ошибиться, особенно в вопросах гормональной терапии.','Не хватает времени или сил заниматься здоровьем.','Не устраивает стоимость консультаций или программ.','Пока проблема не настолько серьезная, чтобы заниматься ею.','Другое.']},
  {id:'q7',title:'Почему вы хотели бы разбираться с этими вопросами именно со мной?',hint:'Один наиболее важный вариант.',type:'single',options:['Доверяю ее медицинской квалификации и опыту.','Нравится ее позиция и подход к женскому здоровью.','Она умеет объяснять сложное понятным языком.','Нравится ее отношение к женщинам и пациенткам.','Уже был положительный личный опыт работы с ней.','Пока не уверена, что выбрала бы именно ее.','Другое.']},
  {id:'q8',title:'Как вам комфортнее всего получать помощь и информацию?',hint:'Можно выбрать до двух вариантов.',type:'multi',max:2,options:['Смотреть короткие видео или читать посты в удобное время.','Участвовать в прямых эфирах и задавать вопросы врачу.','Проходить структурированную программу шаг за шагом.','Находиться в закрытом сообществе женщин с похожими вопросами.','Получать индивидуальные консультации специалиста.','Работать в небольшой группе с регулярной обратной связью.','Другое.']},
  {id:'q9',title:'Какой платный формат работы со мной вы рассмотрели бы в первую очередь?',hint:'Выберите один наиболее привлекательный.',type:'single',options:['Разовый вебинар по конкретной теме.','Обучающий курс на 4–8 недель с глубоким погружением в тему.','Закрытый клуб с регулярными встречами.','Программа в небольшой группе с более глубоким разбором вопросов.','Индивидуальная консультация.','Пока не рассматриваю платные форматы.']},
  {id:'q10',title:'Если бы я сейчас предложила вам свой продукт (вебинар, курс, клуб или консультацию) и вы бы без сомнения его купили — на какую тему бы он был?',hint:'Свободный ответ.',type:'text'},
  {id:'q11',title:'На следующей неделе я и моя помощница планируем провести несколько видеозвонков с подписчиками. Готовы ли вы поучаствовать в небольшом личном интервью на 20–30 минут?',hint:'Расскажите о своём вопросе и получите рекомендации.',type:'interview'}
];

const form = document.getElementById('survey-form');
const questionsRoot = document.getElementById('questions');
const status = document.getElementById('form-status');
const submitButton = document.getElementById('submit-button');
const config = window.SURVEY_CONFIG || {endpoint:'',giftUrl:''};

function makeQuestion(q, index) {
  const section = document.createElement('section');
  section.className = 'question';
  section.dataset.question = q.id;
  section.innerHTML = `<div class="q-head"><span class="q-number">${String(index+1).padStart(2,'0')}</span><h3 class="q-title">${q.title}</h3></div><p class="q-hint">${q.hint}</p>`;
  if (q.type === 'text') {
    const textarea = document.createElement('textarea');
    textarea.className = 'text-area'; textarea.name = q.id; textarea.rows = 4;
    textarea.placeholder = 'Напишите своими словами…'; textarea.setAttribute('aria-label',q.title);
    section.append(textarea);
    if (q.note) { const note = document.createElement('p'); note.className='field-note';note.textContent=q.note;section.append(note); }
  } else if (q.type === 'interview') {
    const choices = document.createElement('div'); choices.className='options';
    ['Да, готова поучаствовать','Нет, пока не готова'].forEach((label, i) => {
      const wrap=document.createElement('label');wrap.className='option';
      const input=document.createElement('input');input.type='radio';input.name=q.id;input.value=i===0?'Да':'Нет';
      wrap.append(input,document.createTextNode(label));choices.append(wrap);
    });section.append(choices);
    const contacts=document.createElement('div');contacts.className='contact-fields';contacts.hidden=true;contacts.id='contact-fields';
    const contactNote=document.createElement('p');contactNote.className='contact-note';contactNote.textContent='Если готовы к интервью, оставьте имя и один удобный контакт на выбор — Tg, WhatsApp или Max. Все три заполнять не нужно.';contacts.append(contactNote);
    [['name','Имя','Как к вам обращаться'],['telegram','Ник в Tg','@username'],['whatsapp','Номер в WhatsApp','+7 …'],['max','Номер в Max','+7 …']].forEach(([name,label,placeholder])=>{const field=document.createElement('label');field.textContent=label;const input=document.createElement('input');input.type='text';input.name=name;input.className='text-field';input.placeholder=placeholder;input.autocomplete='off';field.append(input);contacts.append(field);});
    const followup=document.createElement('p');followup.className='contact-note';followup.textContent='Моя помощница напишет вам и предложит время для звонка. До встречи!';contacts.append(followup);
    section.append(contacts);
    choices.addEventListener('change',()=>{contacts.hidden=form.elements[q.id].value!=='Да';});
  } else {
    const options=document.createElement('div');options.className='options';
    q.options.forEach((label)=>{const wrap=document.createElement('label');wrap.className='option';const input=document.createElement('input');input.type=q.type==='multi'?'checkbox':'radio';input.name=q.id;input.value=label;wrap.append(input,document.createTextNode(label));options.append(wrap);});
    section.append(options);
    if (q.options.includes('Другое.')) {const other=document.createElement('input');other.type='text';other.name=q.id+'_other';other.className='text-field other-field';other.placeholder='Уточните, если выбрали «Другое»';other.setAttribute('aria-label',q.title+' — другое');other.hidden=true;section.append(other);options.addEventListener('change',()=>{other.hidden=!Array.from(options.querySelectorAll('input:checked')).some(x=>x.value==='Другое.');});}
    if(q.max) options.addEventListener('change',event=>{const selected=options.querySelectorAll('input:checked');if(selected.length>q.max){event.target.checked=false;status.textContent=`В этом вопросе можно выбрать не более ${q.max} вариантов.`;section.scrollIntoView({block:'center',behavior:'smooth'});}else status.textContent='';});
  }
  return section;
}
questions.forEach((q,index)=>questionsRoot.append(makeQuestion(q,index)));

function getAnswer(q){
  if(q.type==='text')return form.elements[q.id].value.trim();
  if(q.type==='interview')return form.elements[q.id].value || '';
  const selected=Array.from(form.querySelectorAll(`[name="${q.id}"]:checked`)).map(input=>input.value);
  const other=form.elements[q.id+'_other'];
  if(other&&selected.includes('Другое.')&&other.value.trim())selected[selected.indexOf('Другое.')]='Другое: '+other.value.trim();
  return q.type==='multi'?selected:(selected[0]||'');
}

let pending=false;
let timer;
window.addEventListener('message',event=>{
  if(!pending || !/\.googleusercontent\.com$|^https:\/\/script\.google\.com$/.test(event.origin))return;
  if(event.data?.type!=='viktoria-survey-result')return;
  pending=false;clearTimeout(timer);submitButton.disabled=false;
  if(event.data.ok){form.hidden=true;const done=document.getElementById('thank-you');done.hidden=false;done.focus();done.scrollIntoView({behavior:'smooth',block:'start'});}
  else status.textContent='Не удалось записать ответы. Попробуйте еще раз.';
});

form.addEventListener('submit',event=>{
  event.preventDefault();
  if(pending)return;
  if(!config.endpoint){status.textContent='Анкета готовится к запуску. Отправка ответов пока недоступна.';return;}
  const data=Object.fromEntries(questions.map(q=>[q.id,getAnswer(q)]));
  ['name','telegram','whatsapp','max'].forEach(key=>data[key]=data.q11==='Да'?form.elements[key].value.trim():'');
  const transport=document.createElement('form');transport.method='POST';transport.action=config.endpoint;transport.target='survey-sink';transport.hidden=true;
  const payload=document.createElement('input');payload.name='payload';payload.value=JSON.stringify(data);transport.append(payload);document.body.append(transport);
  pending=true;submitButton.disabled=true;status.textContent='Отправляем ответы…';transport.submit();transport.remove();
  timer=setTimeout(()=>{if(pending){pending=false;submitButton.disabled=false;status.textContent='Не удалось подтвердить отправку. Проверьте соединение и попробуйте еще раз.';}},25000);
});

if(config.giftUrl){const link=document.getElementById('gift-link');link.href=config.giftUrl;link.hidden=false;document.getElementById('gift-pending').hidden=true;}
