// 分析: 1. 监听点击座位的事件: 座位样式切换\ 座位数统计\ 票价统计
// 2. 监听选择影片的事件, 票价变化

// 选择需要的元素
const seat = document.querySelectorAll("#seat-container .seat:not(.occupied)");
let seatCount = document.getElementById('seat_count');
let totalPrice = document.getElementById('price');
const movies = document.getElementById('select');
let ticketPrice = +movies.value;

seat.forEach(item => item.addEventListener('click', ()=>{
    item.classList.toggle('selected');
    seatCountTotal();
}, false));

function seatCountTotal(){
    let seatselected = document.querySelectorAll('#seat-container .seat.selected');
    let seatSelectedIndex = [...seatselected].map(item => [...seat].indexOf(item));
    localStorage.setItem("selectedSeats", JSON.stringify(seatSelectedIndex));

    seatCount.innerText = seatselected.length;
    totalPrice.innerText = seatselected.length * ticketPrice;
}

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

movies.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    
    setMovieData(e.target.selectedIndex, ticketPrice);
    seatCountTotal();
});

