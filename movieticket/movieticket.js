// 选择元素
// movies, 影片的类数组结构
const movies = document.querySelector('#movies');
// seats 所有未被占用的座位组成的类数组结构
const seats = document.querySelectorAll('.seat-container .seat:not(.occupied)');
// 座位数, 随点击选择座位变化
let seatCount = document.querySelector('.text .seat-count');
// 票价总值, 随影片价格和座位数变化
let ticketPrice = document.querySelector('.text .totalPrice');
// 当前影片价格
let price = +movies.value;

populateUI();

function updateSeatsCount(){
    let seatsSelected = document.querySelectorAll('.seat-container .seat.selected');
    let seatsLength = +seatsSelected.length;

    let selectedSeatIndex = [...seatsSelected].map(item => {
        let seatTotal = document.querySelectorAll('.seat-container .seat');
        return [...seatTotal].indexOf(item);
    });
    
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatIndex));

    seatCount.innerText = seatsLength;
    ticketPrice.innerText = price * seatsLength;
}

// 获取本地数据, 并渲染样式
function populateUI(){
    const selectedSeat = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeat !== '' && selectedSeat.length > 0){
        let seatTotal = document.querySelectorAll('.seat-container .seat');
        seatTotal.forEach((seat, index) => {
            if(selectedSeat.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== ''){
        movies.selectedIndex = selectedMovieIndex;
    }

} 

seats.forEach(item => 
    item.addEventListener('click', (e) => {
    e.target.classList.toggle('selected');
    updateSeatsCount();
}));

// 保存电影索引值\票价
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

movies.addEventListener('change', e => {
    price = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    
    updateSeatsCount();
});

// 设置初始座位和总票价(本地存储);
updateSeatsCount();