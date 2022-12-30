// DOM 접근
const userTask = document.querySelector('.artcl_main input');
const addBtn = document.querySelector('.artcl_main button');
const listTodo = document.querySelector('.list_todo');
const main = document.querySelector('.artcl_main');
const btnDownLoad = document.querySelector('.btn');

// 할일이 저장될 배열. JSON문자열을 객체형태로 바꿔서 사용합니다.
const tasks = JSON.parse(localStorage.getItem('tasklist')) || [];


// 저장되어 있는 tasks가 있다면 목록을 생성합니다.
if (tasks.length > 0) {
    tasks.forEach((task) => {
        genItem(task.val, task.checked);
    })
    showDownload();
}


// 할일 추가 버튼
addBtn.addEventListener('click', createListItem);

// 할일 목록 만들기
function createListItem() {
    const val = userTask.value;

    // 인풋에 내용이 있다면
    if (val) {
        // genItem 함수는 할일의 내용과 수행 상태에 대한 값(true, false)을 인자로 받습니다.
        genItem(val, false);

        // myObj 객체를 생성합니다. tasks 배열에 저장합니다.
        const myObj = {
            val: val,
            checked: false
        };

        // myObj 객체를 할일 배열에 저장합니다.
        tasks.push(myObj);

        // 할 일 데이터를 저장하는 함수
        saveTasks();
        // 다운로드 버튼 노출 판단 함수
        showDownload();

        // 인풋에 내용이 없다면 에러 출력
    } else {
        errorMsg('내용을 작성해주세요');
    }
}

// 에러 관련 함수
function errorMsg(msg) {
    message.style.display = 'block';
    message.textContent = msg;
    userTask.focus();
}

// 경고 메세지 생성
const message = document.createElement('strong');
message.style.display = 'none';
message.style.color = 'red';
main.appendChild(message);
userTask.addEventListener('input', (e) => {
    message.style.display = 'none';
})


// 리스트 아이템 생성 함수
function genItem(val, complete) {
    const li = document.createElement('li');
    li.textContent = val;
    listTodo.appendChild(li); // 예전에는 appendChild()
    // 인풋 초기화
    userTask.value = '';

    // 만약 이미 수행한 일이라면
    if (complete) {
        li.classList.add('done');
    }

    // li에 이벤트를 달아서 done 클래스를 토글
    li.addEventListener('click', (e) => {
        li.classList.toggle('done');

        // 할일 데이터 목록 업데이트 함수.
        buildTasks();
    })

    // 삭제버튼 만들기
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    li.appendChild(btn);
    // 삭제버튼을 클릭한다면
    btn.addEventListener('click', (e) => {
        li.remove(); // 예전에는 removeChild()
        showDownload();
        buildTasks();
    })
    return val;
}


// 할 일 정보 목록 업데이트하기. 할 일을 클릭했을 때 혹은 삭제했을때 작동합니다.
function buildTasks() {
    tasks.length = 0;  // 테스크 목록의 정보를 업데이트하기 위해 기존 데이터를 초기화 합니다.
    const curList = listTodo.querySelectorAll('li');

    // 할 일 정보 목록을 재생성합니다.
    curList.forEach((el) => {
        // 할일 객체 만들기
        const tempTask = {
            val: el.textContent,
            checked: false
        };

        // done 클래스가 있는지 확인하고 있다면 checked 정보를 변경합니다.
        if (el.classList.contains('done')) {
            tempTask.checked = true;
        }
        tasks.push(tempTask);
    })
    saveTasks();
}


// 할일 목록을 localStorage 에 저장하기
function saveTasks() {
    localStorage.setItem('tasklist', JSON.stringify(tasks));
}


// 다운로드 버튼 노출을 판단하는 함수
function showDownload() {
    const curList = listTodo.querySelectorAll('li');
    if (curList.length > 0) {
        btnDownLoad.classList.add('on');
    } else {
        btnDownLoad.classList.remove('on');
    }
}



// 다운로드 버튼 이벤트
btnDownLoad.addEventListener('click', downloadFile);



// 할 일 목록을 다운로드하기
function downloadFile() {
    // 다운로드 받을 텍스트입니다.
    let temp = '< 나의 할 일 목록 >\n\n';

    const curList = listTodo.querySelectorAll('li');
    curList.forEach((el) => {
        // 완료된 할일 앞에는 '완료-' 텍스트를 붙여줍니다.
        if (el.classList.contains('done')) {
            temp += '완료-';
        }
        temp += `${el.textContent}\n`;
    })
    // element를 삭제하기 위해 let 으로 선언하겠습니다.
    let element = document.createElement('a');

    // data URI scheme을 이용해 데이터를 a 태그안에 임베드 시킵니다.
    // https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Data_URLs
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + temp);
    // 파일 이름을 설정할 수 있습니다. 확장자를 붙이면 원하는 포멧으로 다운받을 수 있습니다. 
    // 예를 들어 .hwp
    element.setAttribute('download', `todoList`);
    element.click();
    // 메모리상의 요소를 제거합니다.
    element = null;
}